# BubblePet 🐾

App de Pet Shop em React Native (Expo) com Firebase Authentication, navegação e notificações.

## Como rodar
1. `npm install`
2. `npx expo install --fix`   (ajusta as bibliotecas para a versão certa do Expo)
3. Abra o `firebaseConfig.js` e cole os dados do seu projeto Firebase
   (Authentication > E-mail/senha precisa estar ativado).
4. `npx expo start` e abra no celular com o Expo Go.

## Estrutura
- `App.js` – rotas e início das notificações
- `silenciar.js` – esconde o aviso de push remoto do Expo Go (Android)
- `firebaseConfig.js` – suas chaves do Firebase
- `components/BarraInferior.js` – menu Home / Notificações / Perfil
- `screens/` – Login, Cadastro, Home, Agendar, Confirmacao, Produtos, Notificacoes, Perfil, Logout
- `services/auth.js` – entrar, cadastrar, sair, usuarioAtual
- `services/notificacoes.js` – permissão, envio e lista das notificações
- `assets/BubblePet.png` – logo (gerado do protótipo; troque pelo seu se tiver)

## Notificações (3 tipos)
- **Agendamento**: confirmação ao agendar + lembrete às 08:00 do dia anterior
- **Compra**: ao tocar em "Comprar"
- **Novidade PetShop**: 15 segundos depois do login

Integrantes: (preencher)
