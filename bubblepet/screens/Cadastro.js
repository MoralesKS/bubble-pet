import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native'
import { useState } from "react"
import { cadastrar } from "../services/auth"

export default function Cadastro({navigation}){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')

    async function realizarCadastro() {
        if(!nome || !email || !senha){
            alert("Preencha todos os campos!")
            return
        }
        if(senha != confirmSenha){
            alert("As senhas devem ser iguais")
            return
        }

        try {
            await cadastrar(email, senha, nome)
            alert("Usuário cadastrado com sucesso!")
            navigation.navigate('Login')
        } catch(error){
            alert("Erro: " + error.code + "\n" + error.message)
            console.log(error)
        }
    }

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Image style={styles.img} source={require('../assets/BubblePet.png')} resizeMode='contain'/>
                <Text style={styles.nome}>~Bubble Pet~</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.titulo}> Cadastro </Text>

                <TextInput style={styles.input}
                    placeholder='Nome'
                    autoCapitalize='words'
                    value={nome}
                    onChangeText={setNome}
                />

                <TextInput style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput style={styles.input}
                    placeholder='Senha'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                <TextInput style={styles.input}
                    placeholder='Confirme sua senha'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                />

                <TouchableOpacity style={styles.button1} onPress={realizarCadastro}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#0a475f', fontWeight: 'bold'}}>Já tenho uma conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a475f',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 120,
    width: '80%',
    margin: 8,
  },
  nome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titulo: {
    alignSelf: 'center',
    fontSize: 16,
    margin: 8,
    color: '#0a475f',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    margin: 8,
    borderRadius: 16,
    height: 50,
    paddingHorizontal: 14,
  },
  button1: {
    backgroundColor: '#0a475f',
    margin: 8,
    borderRadius: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    margin: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
