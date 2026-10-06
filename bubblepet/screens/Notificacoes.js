import {useEffect, useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import BarraInferior from '../components/BarraInferior'
import {obter, assinar} from '../services/notificacoes'

const icones = {agendamento: '📅', novidade: '🏷️', compra: '🛍️'}

// 08:00 se foi hoje, "ontem" ou a data
function mostrarHora(iso){
    const d = new Date(iso)
    const hoje = new Date()
    const ontem = new Date()
    ontem.setDate(hoje.getDate() - 1)

    if(d.toDateString() == hoje.toDateString()){
        return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
    }
    if(d.toDateString() == ontem.toDateString()){
        return 'ontem'
    }
    return d.toLocaleDateString('pt-BR')
}

export default function Notificacoes({navigation}){
    const [lista, setLista] = useState(obter())

    // atualiza a tela sempre que chegar uma notificação nova
    useEffect(() => {
        setLista(obter())
        return assinar(setLista)
    }, [])

    return(
        <View style={styles.container}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 16}}>
            {lista.length == 0 && (
                <Text style={styles.vazio}>Nenhuma notificação ainda.</Text>
            )}

            {lista.map((n) => (
                <View key={n.id} style={styles.card}>
                    <View style={styles.iconeBox}>
                        <Text style={styles.icone}>{icones[n.tipo] || '🔔'}</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.linha}>
                            <Text style={styles.titulo}>{n.titulo}</Text>
                            <Text style={styles.hora}>{mostrarHora(n.data)}</Text>
                        </View>
                        <Text style={styles.texto}>{n.corpo}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>

        <BarraInferior navigation={navigation} atual='Notificacoes'/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8f9',
  },
  vazio: {
    color: '#6b8283',
    textAlign: 'center',
    marginTop: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6e3e5',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  iconeBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f8f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icone: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulo: {
    fontWeight: 'bold',
    color: '#16302f',
    fontSize: 14,
    flexShrink: 1,
  },
  hora: {
    color: '#6b8283',
    fontSize: 11,
    marginLeft: 8,
  },
  texto: {
    color: '#6b8283',
    fontSize: 12,
    marginTop: 3,
  },
})
