import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function Confirmacao({navigation, route}){
    const tipo = route.params?.tipo || 'banho'
    const nome = tipo.charAt(0).toUpperCase() + tipo.slice(1) // Banho, Tosa, Consulta

    return(
        <View style={styles.container}>
            <View style={styles.bolinha}>
                <Text style={styles.check}>✓</Text>
            </View>

            <Text style={styles.titulo}>{nome} agendado!</Text>
            <Text style={styles.texto}>Seu pet está esperando por{'\n'}um dia de cuidados.</Text>

            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Home')}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Voltar para a home</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  bolinha: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#0a475f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a475f',
    marginTop: 20,
  },
  texto: {
    color: '#6b8283',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
  },
  button1: {
    backgroundColor: '#0a475f',
    borderRadius: 16,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})
