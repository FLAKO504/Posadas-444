import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('🎩');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);
    let tag = `@${m.sender.split('@')[0]}`;

    // VCARD
    let list = [{
        displayName: "Elder-Ofc 🎩",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: ᴇʟᴅᴇʀ-ᴏғɪᴄɪᴀʟ\nitem1.TEL;waid=50493374445:50493374445\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: posadaselder2806@gmail.com\nitem2.X-ABLabel:Email\nitem3.X-ABLabel:Internet\nitem4.ADR:;; 🇭🇳 Honduras;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'һ᥆ᥣᥲ s᥆ᥡ ᥱᥣძᥱr-᥆𝖿ᥴ ᥱᥣ mᥱȷ᥆r',
                body: dev,
                thumbnailUrl: 'https://i.postimg.cc/RVHgxSn2/IMG-20250404-WA0021.jpg',
                sourceUrl: 'https://wa.me/50493374445?text=Vengo+Del+Comando+.owner',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    let txt = `👋 *Hola ${tag} este es*\n*el contacto de mi creador*`;

    conn.sendMessage(m.chat, { 
        text: txt, 
        mentions: [m.sender]
    }, { quoted: m });
    }

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;