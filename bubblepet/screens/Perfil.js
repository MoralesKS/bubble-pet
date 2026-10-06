import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import BarraInferior from '../components/BarraInferior'
import {usuarioAtual, sair} from '../services/auth'
import {limpar} from '../services/notificacoes'

export default function Perfil({navigation}){
    const usuario = usuarioAtual()

    function meusDados(){
        alert('Nome: ' + (usuario?.displayName || '-') + '\nE-mail: ' + (usuario?.email || '-'))
    }

    async function sairDaConta(){
        try {
            await sair()
            await limpar() // apaga a lista de notificações desta conta
            navigation.replace('Logout')
        } catch(error){
            alert("Não foi possível sair da conta.")
            console.log(error)
        }
    }

    return(
        <View style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarIcone}>👤</Text>
            </View>
            <Text style={styles.nome}>{usuario?.displayName || 'Usuário'}</Text>
            <Text style={styles.email}>{usuario?.email}</Text>

            <TouchableOpacity style={styles.linha} onPress={meusDados}>
                <Text style={styles.linhaIcone}>👤</Text>
                <Text style={styles.linhaTexto}>Meus dados</Text>
                <Text style={styles.seta}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linha} onPress={() => navigation.replace('Notificacoes')}>
                <Text style={styles.linhaIcone}>🔔</Text>
                <Text style={styles.linhaTexto}>Notificações</Text>
                <Text style={styles.seta}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={sairDaConta}>
                <Text style={{color: '#16302f', fontWeight: 'bold'}}>🚪  Sair da conta</Text>
            </TouchableOpacity>
        </View>

        <BarraInferior navigation={navigation} atual='Perfil'/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8f9',
    alignItems: 'center',
    padding: 20,
    paddingTop: 28,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#c9d3d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcone: {
    fontSize: 42,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16302f',
    marginTop: 10,
  },
  email: {
    color: '#6b8283',
    marginTop: 2,
    marginBottom: 24,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6e3e5',
    borderRadius: 16,
    padding: 14,
    width: '100%',
    marginBottom: 10,
  },
  linhaIcone: {
    fontSize: 18,
  },
  linhaTexto: {
    flex: 1,
    marginLeft: 12,
    color: '#16302f',
    fontWeight: '600',
  },
  seta: {
    fontSize: 22,
    color: '#16302f',
  },
  button2: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6e3e5',
    borderRadius: 16,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
})
