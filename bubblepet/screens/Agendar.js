import {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView} from 'react-native'
import {notificar, agendarPara} from '../services/notificacoes'

const horarios = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const semana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']

// 29/09/2026
function formatar(d){
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = String(d.getMonth() + 1).padStart(2, '0')
    return dia + '/' + mes + '/' + d.getFullYear()
}

// os próximos 14 dias, a partir de amanhã
function proximosDias(){
    const dias = []
    for(let i = 1; i <= 14; i++){
        const d = new Date()
        d.setDate(d.getDate() + i)
        dias.push(d)
    }
    return dias
}

export default function Agendar({navigation, route}){
    // "banho", "tosa" ou "consulta" (vem da Home)
    const tipo = route.params?.tipo || 'banho'

    const dias = proximosDias()
    const [data, setData] = useState(dias[0])
    const [hora, setHora] = useState('14:00')
    const [escolhendo, setEscolhendo] = useState(null) // 'data', 'hora' ou null

    function confirmar(){
        // Notificação 1: aparece logo após confirmar
        notificar('Agendamento confirmado', 'Seu ' + tipo + ' foi agendado para ' + formatar(data) + ' às ' + hora + '.', 'agendamento')

        // Notificação 2: lembrete às 08:00 do dia anterior (só se ainda não passou)
        const lembrete = new Date(data)
        lembrete.setDate(lembrete.getDate() - 1)
        lembrete.setHours(8, 0, 0, 0)
        if(lembrete > new Date()){
            agendarPara('Lembrete de agendamento', 'O ' + tipo + ' do seu pet está marcado para amanhã às ' + hora + '.', 'agendamento', lembrete)
        }

        navigation.navigate('Confirmacao', {tipo: tipo})
    }

    return(
        <View style={styles.container}>
            <Text style={styles.icone}>🐶</Text>
            <Text style={styles.titulo}>Agende o {tipo} do seu pet</Text>

            <TouchableOpacity style={styles.campo} onPress={() => setEscolhendo('data')}>
                <Text style={styles.campoIcone}>📅</Text>
                <View>
                    <Text style={styles.rotulo}>Escolha a data</Text>
                    <Text style={styles.valor}>{formatar(data)}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.campo} onPress={() => setEscolhendo('hora')}>
                <Text style={styles.campoIcone}>🕑</Text>
                <View style={{flex: 1}}>
                    <Text style={styles.rotulo}>Escolha o horário</Text>
                    <Text style={styles.valor}>{hora}</Text>
                </View>
                <Text style={styles.seta}>⌄</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button1} onPress={confirmar}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Confirmar agendamento</Text>
            </TouchableOpacity>

            {/* Lista que abre ao tocar na data ou no horário */}
            <Modal transparent animationType='fade' visible={escolhendo != null} onRequestClose={() => setEscolhendo(null)}>
                <TouchableOpacity style={styles.fundoModal} activeOpacity={1} onPress={() => setEscolhendo(null)}>
                    <View style={styles.caixaModal}>
                        <Text style={styles.tituloModal}>{escolhendo == 'data' ? 'Escolha a data' : 'Escolha o horário'}</Text>
                        <ScrollView>
                            {escolhendo == 'data' && dias.map((d) => (
                                <TouchableOpacity key={formatar(d)} style={styles.opcao} onPress={() => {setData(d); setEscolhendo(null)}}>
                                    <Text style={styles.opcaoTexto}>{formatar(d)} - {semana[d.getDay()]}</Text>
                                </TouchableOpacity>
                            ))}
                            {escolhendo == 'hora' && horarios.map((h) => (
                                <TouchableOpacity key={h} style={styles.opcao} onPress={() => {setHora(h); setEscolhendo(null)}}>
                                    <Text style={styles.opcaoTexto}>{h}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8f9',
    alignItems: 'center',
    padding: 24,
    paddingTop: 32,
  },
  icone: {
    fontSize: 64,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16302f',
    marginTop: 8,
    marginBottom: 24,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6e3e5',
    borderRadius: 16,
    padding: 14,
    width: '100%',
    marginBottom: 14,
  },
  campoIcone: {
    fontSize: 22,
    marginRight: 12,
  },
  rotulo: {
    color: '#6b8283',
    fontSize: 12,
  },
  valor: {
    color: '#16302f',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  seta: {
    fontSize: 22,
    color: '#16302f',
  },
  button1: {
    backgroundColor: '#0a475f',
    borderRadius: 16,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 28,
  },
  caixaModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: '70%',
  },
  tituloModal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a475f',
    marginBottom: 8,
  },
  opcao: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#d6e3e5',
  },
  opcaoTexto: {
    fontSize: 16,
    color: '#16302f',
  },
})
