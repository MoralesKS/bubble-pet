import './silenciar' // precisa ser o primeiro import
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { iniciar } from "./services/notificacoes";

import Login from './screens/Login'
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Agendar from "./screens/Agendar";
import Confirmacao from "./screens/Confirmacao";
import Produtos from "./screens/Produtos";
import Notificacoes from "./screens/Notificacoes";
import Perfil from "./screens/Perfil";
import Logout from "./screens/Logout";

const Stack = createNativeStackNavigator()

// Cabeçalho verde das telas internas
const cabecalho = {
  headerStyle: { backgroundColor: '#0a475f' },
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
}

export default function App(){
  // pede permissão e começa a guardar as notificações recebidas
  useEffect(() => iniciar(), [])

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false, animation: 'none', gestureEnabled: false }}/>
        <Stack.Screen name='Notificacoes' component={Notificacoes} options={{ ...cabecalho, title: 'Notificações', headerBackVisible: false, animation: 'none', gestureEnabled: false }}/>
        <Stack.Screen name='Perfil' component={Perfil} options={{ ...cabecalho, title: 'Perfil', headerBackVisible: false, animation: 'none', gestureEnabled: false }}/>
        <Stack.Screen name='Agendar' component={Agendar} options={{ ...cabecalho, title: 'Agendar' }}/>
        <Stack.Screen name='Confirmacao' component={Confirmacao} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name='Produtos' component={Produtos} options={{ ...cabecalho, title: 'Produtos' }}/>
        <Stack.Screen name='Logout' component={Logout} options={{ headerShown: false, gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
