let handler = async (m, { conn }) => {
    try {
        let d = new Date();
        let locale = 'es';
        let week = d.toLocaleDateString(locale, { weekday: 'long' });
        let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

        let menu = `
¡Hola! 👋🏻 @${m.sender.split("@")[0]}
\`\`\`${week}, ${date}\`\`\`

╭──𝗠𝗘𝗡𝗨 𝗛𝗢𝗧──────
│ 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 ...
│ Dale cariño a tu ganzo 
│ con el menú hot.
╰────────────────

» 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 𝗛𝗢𝗧 
│🔥➺ .𝘵𝘦𝘵𝘢𝘴
│🔥➺ .𝘹𝘷𝘪𝘥𝘦𝘰𝘴
│🔥➺ .𝘹𝘯𝘹𝘹 𝘭𝘪𝘯𝘬
│🔥➺ .𝘹𝘯𝘹𝘹𝘴𝘦𝘢𝘳𝘤𝘩 𝘵𝘦𝘹𝘵𝘰
│🔥➺ .𝘱𝘰𝘳𝘯𝘩𝘶𝘣𝘴𝘦𝘢𝘳𝘤𝘩 𝘵𝘦𝘹𝘵𝘰
╰━━━━━━⋆★⋆━━━━━━⬣

» 𝗧𝗥𝗜𝗣𝗘 𝗫
│🔞➺ .𝘝𝘪𝘥𝘦𝘰𝘹𝘹𝘹
│🔞➺ .𝘝𝘪𝘥𝘦𝘰𝘭𝘦𝘴𝘣𝘪𝘹𝘹
│🔞➺ .𝘎𝘢𝘮𝘦𝘤𝘨
│🔞➺ .𝘗𝘢𝘤𝘬
│🔞➺ .𝘗𝘢𝘤𝘬2
│🔞➺ .𝘗𝘢𝘤𝘬3
│🔞➺ .𝘙34
│🔞➺ .𝘗𝘰𝘳𝘯𝘰𝘭𝘦𝘴𝘷
│🔞➺ .𝘗𝘦𝘤𝘩𝘰𝘴
│🔞➺ .𝘊𝘢𝘵𝘨𝘪𝘳𝘭
│🔞➺ . 𝘏𝘰𝘭𝘰𝘭𝘪𝘷𝘦
│🔞➺ .𝘍𝘰𝘰𝘥
│🔞➺ .𝘛𝘳𝘦𝘦
│🔞➺ .𝘕𝘪𝘱𝘭𝘦
│🔞➺ .𝘏𝘰𝘯𝘴𝘳
│🔞➺ .𝘚𝘦𝘹1
│🔞➺ .𝘚𝘦𝘹2
│🔞➺ .𝘚𝘦𝘹3
│🔞➺ .𝘛𝘦𝘢𝘳𝘴
╰━━━━━━⋆★⋆━━━━━━⬣
`.trim();

        // Enviar solo el texto del menú
        await conn.sendMessage(m.chat, { text: menu, mentions: [m.sender] });
    } catch (e) {
        await m.reply(`⚠ Error al ejecutar el comando. Intenta nuevamente o reporta este problema.\n\nDetalles del error:\n${e.message}`);
        console.error(e);
    }
};

handler.command = /^(menuhot)$/i;
handler.register = false;
export default handler;