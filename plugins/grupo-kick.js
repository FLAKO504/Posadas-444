let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {

let kickte = `🚩 Menciona al usuario que deseas eliminar.`

if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
m.reply(`🚩 Usuario eliminado.`)
// Se eliminó la notificación al usuario eliminado
}

handler.help = ['kick *@user*']
handler.tags = ['group']
handler.command = ['kick', 'ban'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler