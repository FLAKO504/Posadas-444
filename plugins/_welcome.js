import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtener imagen del perfil o usar una por defecto
  let pp = await conn.profilePictureUrl(m.messageStubParameters?.[0], 'image').catch(_ => 'https://qu.ax/Mvhfa.jpg');
  let img = await (await fetch(pp)).buffer();
  let chat = global.db.data.chats[m.chat];
  
  const user = m.messageStubParameters?.[0]?.split`@`[0] || 'Invitado';
  const group = groupMetadata?.subject || 'Grupo desconocido';
  const desc = groupMetadata?.desc || 'sin descripción';

  // Bienvenida
  if (chat.bienvenida && m.messageStubType === 27) {
    const welcomeMessage = chat.sWelcome
      ? chat.sWelcome.replace('@user', `@${user}`).replace('@group', group).replace('@desc', desc)
      : `┌─★ _Barboza Bot_ \n│「 _Bienvenido_ 」\n└┬★ 「 @${user} 」\n   │✑  _Bienvenido_ a\n   │✑  ${group}\n   └───★`;
    
    await conn.sendMessage(m.chat, { text: welcomeMessage, image: img }, { quoted: m });
  }

  // Despedida
  if (chat.bienvenida && (m.messageStubType === 28 || m.messageStubType === 32)) {
    const byeMessage = chat.sBye
      ? chat.sBye.replace('@user', `@${user}`).replace('@group', group).replace('@desc', desc)
      : `┌─★ _Barboza Bot_  \n│「 _BAYY_ 👋 」\n└┬★ 「 @${user} 」\n   │✑  _Largate_\n   │✑ _Jamás te quisimos aquí_\n   └───★`;

    await conn.sendMessage(m.chat, { text: byeMessage, image: img }, { quoted: m });
  }
}