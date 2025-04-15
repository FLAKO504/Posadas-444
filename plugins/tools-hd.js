import FormData from "form-data";
import Jimp from "jimp";

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    // Validar si se proporcionó una imagen
    if (!mime) {
      return m.reply(`🚩 Envíe una imagen o responda a una imagen utilizando el comando: ${usedPrefix + command}`);
    }

    // Validar el tipo de archivo
    if (!/image\/(jpe?g|png)/.test(mime)) {
      return m.reply(`🍂 El formato del archivo (${mime}) no es compatible. Envíe o responda a una imagen.`);
    }

    let img = await q.download?.();
    if (!img) {
      return m.reply("🚩 No se pudo descargar la imagen. Inténtelo nuevamente.");
    }

    // Procesar la imagen con la función `remini`
    let enhancedImage;
    try {
      enhancedImage = await remini(img, "enhance");
    } catch (error) {
      console.error("Error en la función remini:", error);
      return m.reply("🚩 Ocurrió un error al procesar la imagen. Verifique la conexión o intente más tarde.");
    }

    // Enviar la imagen mejorada al usuario
    const txt = `*✧ ⊰* 𝙄𝙢𝙖𝙜𝙚𝙣 𝙢𝙚𝙟𝙤𝙧𝙖𝙙𝙖 𝙘𝙤𝙣 𝙚́𝙭𝙞𝙩𝙤 *⊱*\n> ${dev}`;
    await conn.sendMessage(m.chat, { image: enhancedImage, caption: txt }, { quoted: m });
  } catch (error) {
    console.error("Error general en el comando tools-hd:", error);
    return m.reply("🚩 Ocurrió un error al ejecutar el comando.");
  }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["tools"];
handler.command = ["remini", "hd", "enhance"];
export default handler;

async function remini(imageData, operation) {
  return new Promise((resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    operation = availableOperations.includes(operation) ? operation : "enhance";

    const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    formData.append("model_version", 1);

    // Configuración de la solicitud
    formData.submit(
      {
        url: baseUrl,
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) return reject(err);

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", (err) => reject(err));
      }
    );
  });
}