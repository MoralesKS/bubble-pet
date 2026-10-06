import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, AppState, Platform } from 'react-native'

// ---------- Carregar o expo-notifications com segurança ----------
// No Expo Go (Android) o módulo não carrega. Nesse caso o app continua funcionando:
// as notificações viram um aviso dentro do app + item na lista.
// Para aparecer na barra de notificações do celular, use um "development build".
let modulo = null
let tentou = false

function N() {
  if (!tentou) {
    tentou = true
    try {
      modulo = require('expo-notifications')
    } catch (erro) {
      console.log('expo-notifications indisponível (Expo Go?):', erro.message)
      modulo = null
    }
  }
  return modulo
}

const CHAVE = '@bubblepet:notificacoes'

// ---------- Lista das notificações recebidas ----------
let lista = []
let ouvintes = []

export function obter() {
  return lista
}

// A tela Notificações "assina" a lista para atualizar sozinha quando chegar algo novo
export function assinar(funcao) {
  ouvintes.push(funcao)
  return () => {
    ouvintes = ouvintes.filter((o) => o !== funcao)
  }
}

async function atualizar(nova) {
  lista = nova
  ouvintes.forEach((f) => f(nova))
  try {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(nova))
  } catch (erro) {
    console.log(erro)
  }
}

function porData(a, b) {
  return new Date(b.data) - new Date(a.data)
}

export async function adicionar(item) {
  if (lista.some((n) => n.id === item.id)) return // já está na lista

  // mesma notificação com identificador diferente (chegou duas vezes): ignora
  const repetida = lista.some(
    (n) =>
      n.titulo === item.titulo &&
      n.corpo === item.corpo &&
      Math.abs(new Date(n.data) - new Date(item.data)) < 2 * 60 * 1000
  )
  if (repetida) return

  await atualizar([item, ...lista].sort(porData))
}

// Usado no logout: apaga a lista e cancela o que ainda estava agendado
export async function limpar() {
  const n = N()
  if (n) {
    try {
      await n.cancelAllScheduledNotificationsAsync()
    } catch (erro) {
      console.log(erro)
    }
  }
  await atualizar([])
}

async function carregar() {
  try {
    const salvo = await AsyncStorage.getItem(CHAVE)
    const antigas = salvo ? JSON.parse(salvo) : []
    const novas = antigas.filter((s) => !lista.some((n) => n.id === s.id))
    lista = [...lista, ...novas].sort(porData)
    ouvintes.forEach((f) => f(lista))
  } catch (erro) {
    console.log(erro)
  }
}

// Transforma a notificação do Expo em um item simples da nossa lista
function converter(n) {
  let quando = n.date ? Number(n.date) : Date.now()
  if (quando < 1e12) quando = quando * 1000 // alguns aparelhos mandam em segundos
  return {
    id: n.request.identifier,
    titulo: n.request.content.title,
    corpo: n.request.content.body,
    tipo: n.request.content.data?.tipo || 'novidade',
    data: new Date(quando).toISOString(),
  }
}

// Pega as que chegaram com o app fechado e ainda estão na barra de notificações
async function sincronizar() {
  const n = N()
  if (!n) return
  try {
    const naBarra = await n.getPresentedNotificationsAsync()
    for (const item of naBarra) {
      await adicionar(converter(item))
    }
  } catch (erro) {
    console.log(erro)
  }
}

// Chame uma vez no App.js: pede permissão e começa a escutar as notificações
export function iniciar() {
  carregar() // lista salva de antes (funciona com ou sem o módulo)

  const n = N()
  if (!n) return () => {}

  // Mostra a notificação na barra mesmo com o app aberto
  n.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  ;(async () => {
    try {
      if (Platform.OS === 'android') {
        await n.setNotificationChannelAsync('default', {
          name: 'BubblePet',
          importance: n.AndroidImportance.HIGH,
        })
      }
      await n.requestPermissionsAsync()
      await sincronizar()
    } catch (erro) {
      console.log(erro)
    }
  })()

  const ouvinte = n.addNotificationReceivedListener((x) => adicionar(converter(x)))
  const estado = AppState.addEventListener('change', (e) => {
    if (e === 'active') sincronizar()
  })

  return () => {
    ouvinte.remove()
    estado.remove()
  }
}

// ---------- Enviar notificações ----------

// Aparece daqui a alguns segundos. tipo: 'agendamento', 'compra' ou 'novidade'
export async function notificar(titulo, corpo, tipo, segundos = 2) {
  const n = N()

  // Sem o módulo (Expo Go): simula dentro do app
  if (!n) {
    setTimeout(() => {
      adicionar({
        id: 'local-' + Date.now() + '-' + Math.random(),
        titulo: titulo,
        corpo: corpo,
        tipo: tipo,
        data: new Date().toISOString(),
      })
      Alert.alert(titulo, corpo)
    }, segundos * 1000)
    return
  }

  try {
    await n.scheduleNotificationAsync({
      content: { title: titulo, body: corpo, data: { tipo: tipo } },
      trigger: {
        type: n.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: segundos,
        channelId: 'default',
      },
    })
  } catch (erro) {
    console.log(erro)
  }
}

// Aparece em uma data e hora específicas
export async function agendarPara(titulo, corpo, tipo, data) {
  const n = N()
  if (!n) return // sem o módulo não dá para agendar para depois

  try {
    await n.scheduleNotificationAsync({
      content: { title: titulo, body: corpo, data: { tipo: tipo } },
      trigger: {
        type: n.SchedulableTriggerInputTypes.DATE,
        date: data,
        channelId: 'default',
      },
    })
  } catch (erro) {
    console.log(erro)
  }
}