import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import BarraInferior from '../components/BarraInferior'
import {usuarioAtual} from '../services/auth'

export default function Home({navigation}){
    const usuario = usuarioAtual()
    const primeiroNome = usuario?.displayName ? usuario.displayName.split(' ')[0] : 'Usuário'

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoArea}>
                    <Image style={styles.img} source={require('../assets/BubblePet.png')} resizeMode='contain'/>
                    <Text style={styles.nome}>Bem-vindo!</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.replace('Notificacoes')}>
                    <Text style={styles.sino}>🔔</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.ola}>Olá, {primeiroNome}!</Text>
                <Text style={styles.sub}>Cuidando do seu pet sempre!</Text>

                <View style={styles.grade}>
                    <TouchableOpacity style={styles.opcao} onPress={() => navigation.navigate('Agendar', {tipo: 'banho'})}>
                        <Text style={styles.emoji}>🛁</Text>
                        <Text style={styles.opcaoTexto}>Agende seu banho</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opcao} onPress={() => navigation.navigate('Agendar', {tipo: 'tosa'})}>
                        <Text style={styles.emoji}>✂️</Text>
                        <Text style={styles.opcaoTexto}>Agende sua tosa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opcao} onPress={() => navigation.navigate('Agendar', {tipo: 'consulta'})}>
                        <Text style={styles.emoji}>🩺</Text>
                        <Text style={styles.opcaoTexto}>Agende sua consulta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opcao} onPress={() => navigation.navigate('Produtos')}>
                        <Text style={styles.emoji}>🛍️</Text>
                        <Text style={styles.opcaoTexto}>Compre nossos produtos</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BarraInferior navigation={navigation} atual='Home'/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a475f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 40,
    width: 60,
  },
  nome: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    marginLeft: 8,
  },
  sino: {
    fontSize: 22,
  },
  card: {
    flex: 1,
    backgroundColor: '#f3f8f9',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
  },
  ola: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16302f',
    marginTop: 8,
  },
  sub: {
    color: '#6b8283',
    marginBottom: 20,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  opcao: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6e3e5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    padding: 8,
  },
  emoji: {
    fontSize: 44,
  },
  opcaoTexto: {
    color: '#0a475f',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
})
