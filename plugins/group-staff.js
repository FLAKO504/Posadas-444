let handler = async (m, { conn }) => {
  // Información del staff con diseño
  const staff = `
╭[🚀 *EQUIPO DE AYUDANTES* 🚀]╮
┃
┃ 🤖 *Bot:* ${global.botname || "Bot Desconocido"}
┃ 🌟 *Versión:* ${global.vs || "2.0"}
┃
┣━━━━━👑 *Propietario* ━━━━━┫
┃ • *Nombre:* ELDER
┃ • *Rol:* 𝙿𝚛𝚘𝚙𝚒𝚎𝚝𝚊𝚛𝚒𝚘
┃ • *Número:* wa.me/50493374435
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim();

  try {
    // Verificar variables globales con valores predeterminados
    const imageUrl = global.imageUrl || "https://i.postimg.cc/hv94Q6R8/IMG-20250408-WA0103.jpg"; // Imagen predeterminada
    const sourceUrl = global.redes || "https://github.com/Deylinel/TECNO-BOT-OFICIAL"; // URL del proyecto
    const thumbnailUrl = global.icono || "https://files.catbox.moe/owl2rl.jpg"; // Miniatura

    // Enviar el mensaje con diseño
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: staff,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `🥷 Developers 👑`,
          body: `✨ Staff Oficial`,
          mediaType: 1,
          sourceUrl: sourceUrl,
          thumbnailUrl: thumbnailUrl,
        },
      },
    });

    // Reacción al comando (opcional)
    if (global.emoji) {
      await m.react(global.emoji);
    }
  } catch (error) {
    // Manejo de errores con mensaje más claro
    console.error("Error al ejecutar el comando staff:", error);
    await m.reply(
      "⚠️ *Error al ejecutar el comando:*\n" +
      "Por favor, verifica la configuración del bot o consulta la consola para más detalles."
    );
  }
};

// Configuración del comando
handler.help = ["staff"];
handler.command = ["colaboradores", "staff"];
handler.register = true;
handler.tags = ["main"];

export default handler;