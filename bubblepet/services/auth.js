// Ajuste o caminho abaixo para o arquivo onde você exporta o "auth" do Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export async function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email.trim(), senha)
}

// Cria a conta e salva o nome do usuário
export async function cadastrar(email, senha, nome) {
  const resultado = await createUserWithEmailAndPassword(auth, email.trim(), senha)
  if (nome) {
    await updateProfile(resultado.user, { displayName: nome.trim() })
  }
  return resultado
}

export function sair() {
  return signOut(auth)
}

// Quem está logado agora (nome, email...)
export function usuarioAtual() {
  return auth.currentUser
}
