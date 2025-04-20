import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import Jimp from 'jimp'; // Asegúrate de tener instalada esta biblioteca

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
  let imgBuffer = await (await fetch(pp)).buffer();

  // Procesar la imagen para redimensionarla
  const resizedImg = await Jimp.read(imgBuffer);
  resizedImg.resize(650, 450); // Cambia el tamaño a 500x500 píxeles (ajusta según tus necesidades)
  const img = await resizedImg.getBufferAsync(Jimp.MIME_JPEG);

  let chat = global.db.data.chats[m.chat];

  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`;
      let welcome = chat.sWelcome
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, welcome, img, img);
    } else {
      let bienvenida = `┌─★ _Elder Bot_ \n│「 _Bienvenido_ 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  _Bienvenido_ a\n   │✑  ${groupMetadata.subject}\n   │✑  _Descripción_:\n${groupMetadata.desc || '_sin descripción_'}\n   └───────────────┈ ⳹`
      await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img);
    }
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    } else {
      let bye = `┌─★ _Elder Bot_  \n│「 _BAYY_ 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  _Largate_\n   │✑ _Jamás te quisimos aquí_\n   └───────────────┈ ⳹`
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    }
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    } else {
      let kick = `┌─★ _Elder Bot_  \n│「 _BAYY_ 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  _Largate_\n   │✑ _Jamás te quisimos aquí_\n   └───────────────┈ ⳹`
      await conn.sendAi(m.chat, botname, textbot, kick, img, img)
    }
}}