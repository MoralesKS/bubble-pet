import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import {notificar} from '../services/notificacoes'

export default function Produtos(){
    function comprar(produto){
        notificar('Pedido confirmado', 'Recebemos seu pedido de ' + produto + '. Obrigado!', 'compra')
        alert('Compra realizada: ' + produto)
    }

    return(
        <ScrollView style={styles.container} contentContainerStyle={{padding: 16}}>
            <View style={styles.card}>
                <View style={[styles.foto, {backgroundColor: '#0b3b3f'}]}>
                    <Text style={styles.emoji}>🥣</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.nome}>Ração Premium</Text>
                    <Text style={styles.preco}>R$ 59,90</Text>
                    <TouchableOpacity style={styles.comprar} onPress={() => comprar('Ração Premium')}>
                        <Text style={styles.comprarTexto}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <View style={[styles.foto, {backgroundColor: '#1f6fb5'}]}>
                    <Text style={styles.emoji}>🧴</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.nome}>Shampoo Pet</Text>
                    <Text style={styles.preco}>R$ 29,90</Text>
                    <TouchableOpacity style={styles.comprar} onPress={() => comprar('Shampoo Pet')}>
                        <Text style={styles.comprarTexto}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <View style={[styles.foto, {backgroundColor: '#b5651d'}]}>
                    <Text style={styles.emoji}>🦴</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.nome}>Petisco</Text>
                    <Text style={styles.preco}>R$ 19,90</Text>
                    <TouchableOpacity style={styles.comprar} onPress={() => comprar('Petisco')}>
                        <Text style={styles.comprarTexto}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8f9',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6e3e5',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 36,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  nome: {
    fontWeight: 'bold',
    color: '#16302f',
    fontSize: 15,
  },
  preco: {
    color: '#6b8283',
    marginTop: 2,
  },
  comprar: {
    backgroundColor: '#0a475f',
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 22,
    marginTop: 8,
  },
  comprarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
})
