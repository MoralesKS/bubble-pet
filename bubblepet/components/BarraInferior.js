import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

// "atual" é o nome da tela onde a barra está: 'Home', 'Notificacoes' ou 'Perfil'
export default function BarraInferior({navigation, atual}){
    const abas = [
        {nome: 'Home', rotulo: 'Home', icone: '🏠'},
        {nome: 'Notificacoes', rotulo: 'Notificações', icone: '🔔'},
        {nome: 'Perfil', rotulo: 'Perfil', icone: '👤'},
    ]

    return(
        <View style={styles.barra}>
            {abas.map((aba) => (
                <TouchableOpacity
                    key={aba.nome}
                    style={styles.aba}
                    onPress={() => {
                        if(aba.nome != atual){
                            navigation.replace(aba.nome)
                        }
                    }}
                >
                    <Text style={[styles.icone, aba.nome != atual && {opacity: 0.45}]}>{aba.icone}</Text>
                    <Text style={[styles.rotulo, aba.nome == atual && styles.rotuloAtivo]}>{aba.rotulo}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#d6e3e5',
    paddingTop: 8,
    paddingBottom: 20,
  },
  aba: {
    flex: 1,
    alignItems: 'center',
  },
  icone: {
    fontSize: 22,
  },
  rotulo: {
    fontSize: 11,
    color: '#6b8283',
    marginTop: 2,
  },
  rotuloAtivo: {
    color: '#0a475f',
    fontWeight: 'bold',
  },
})
