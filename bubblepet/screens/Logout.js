import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function Logout({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.icone}>🚪</Text>
            <Text style={styles.titulo}>Você saiu da conta!</Text>
            <Text style={styles.texto}>Até logo!</Text>

            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Voltar para o login</Text>
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
  icone: {
    fontSize: 64,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16302f',
    marginTop: 16,
  },
  texto: {
    color: '#6b8283',
    marginTop: 4,
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
