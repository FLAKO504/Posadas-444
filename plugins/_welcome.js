import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import Jimp from 'jimp'; // Importamos Jimp para manipular la imagen

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtener la imagen de perfil o usar una predeterminada
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
  let imgBuffer = await (await fetch(pp)).buffer();

  // Procesar la imagen para hacerla más angosta
  const processedImg = await Jimp.read(imgBuffer);
  processedImg.resize(300, Jimp.AUTO); // Cambia el ancho a 300px y ajusta la altura automáticamente
  const img = await processedImg.getBufferAsync(Jimp.MIME_JPEG);

  let chat = global.db.data.chats[m.chat];

  // Mensaje de bienvenida
  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`;
      let welcome = chat.sWelcome
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendMessage(m.chat, { image: img, caption: welcome });
    } else {
      let bienvenida = `┌─★ _Elder Bot_ \n│「 _Bienvenido_ 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Bienvenido a\n   │✑  ${groupMetadata.subject}`;
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida });
    }
  }

  // Mensaje de despedida
  if (chat.despedida && (m.messageStubType == 28 || m.messageStubType == 32)) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`;
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendMessage(m.chat, { image: img, caption: bye });
    } else {
      let despedida = `┌─★ _Elder Bot_ \n│「 _Adiós_ 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Gracias por haber estado en\n   │✑  ${groupMetadata.subject}`;
      await conn.sendMessage(m.chat, { image: img, caption: despedida });
    }
  }
}