let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return
  const fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net"
  }
  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split`@`[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  // Diseños con estilo Astro-Bot
  let nombre = `
╔═【 🚀 BARBOZA-BOT ALERTA 】═╗
║ *${usuario}* ha reconfigurado el cosmos del grupo.
║ ✨ Nuevo nombre detectado:
║   » *<${m.messageStubParameters[0]}>*
╚════════════════════════╝`
  
  let foto = `
╔═【 🪐 BARBOZA-BOT OBSERVA 】═╗
║ *${usuario}* ha reprogramado la imagen del universo.
║ 📸 Nueva imagen aplicada al grupo.
╚════════════════════════╝`
  
  let edit = `
╔═【 💫 BARBOZA-BOT CONFIG 】═╗
║ *${usuario}* ha modificado los protocolos.
║ Configuración actual: ${m.messageStubParameters[0] == 'on' ? 'Solo administradores' : 'Todos'}
╚═══════════════════════╝`
  
  let newlink = `
╔══【🔗 BARBOZA-BOT LINK 】══╗
║ El portal ha sido reiniciado por:
║   » *${usuario}*
╚═══════════════════════╝`
  
  let status = `
✦ El grupo ha sido *abierto* *${usuario*

✦ Ahora *todos* pueden enviar mensaje`
  
  let admingp = `
*El usuario ${usuario} ha es el nuevo administrador del grupo*

*Acción realizada por: ${usuario}*`
  
  let noadmingp = `
*El usuario ${usuario} ha sido descendido como admin del grupo*

*Acción realizada por : ${usuario}*`

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
    return;
  } if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
  } else {
    // Opcional: consola para depuración
    // console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: WAMessageStubType[m.messageStubType] })
  }
}