// O Expo Go (Android) avisa que push REMOTO não existe. O app usa só notificações locais,
// que funcionam normalmente, então escondemos esse aviso.
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['expo-notifications'])
