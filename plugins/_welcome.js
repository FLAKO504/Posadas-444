import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import Jimp from 'jimp'; // Importamos Jimp para manipular las imágenes

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtener la imagen de perfil o usar una predeterminada
  const ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ =>
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
  );
  const imgBuffer = await (await fetch(ppUrl)).buffer();

  // Procesar la imagen para ajustar la altura
  const processedImg = await Jimp.read(imgBuffer);
  processedImg.resize(Jimp.AUTO, 800); // Cambia la altura a 800px y ajusta el ancho automáticamente
  const img = await processedImg.getBufferAsync(Jimp.MIME_JPEG);

  let chat = global.db.data.chats[m.chat];

  // Mensaje de bienvenida
  if (chat.bienvenida && m.messageStubType == 27) {
    const user = `@${m.messageStubParameters[0].split`@`[0]}`;
    const welcomeMessage = chat.sWelcome
      ? chat.sWelcome
          .replace('@user', () => user)
          .replace('@group', () => groupMetadata.subject)
          .replace('@desc', () => groupMetadata.desc || 'sin descripción')
      : `┌─★ _Elder Bot_ \n│「 _Bienvenido_ 」\n└┬★ 「 ${user} 」\n   │✑  Bienvenido a\n   │✑  ${groupMetadata.subject}`;

    // Enviar la imagen con la nueva altura
    await conn.sendMessage(m.chat, { image: img, caption: welcomeMessage });
  }
}