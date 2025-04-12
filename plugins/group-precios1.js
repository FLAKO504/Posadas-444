// CREADOR DARK - CORE  //

let handler = async (m, { conn }) => {

    await m.react('💫');

    const message = `AQUI ESTAN LOS PRECIOS.\n\n> 1 semana de spaam = 1k de diamantes\n> 5 mes = 800 diamantes\n> 3 días = 500 diamantes `;

    if (m.isGroup) {
        const imageUrl = 'https://i.postimg.cc/hv94Q6R8/IMG-20250408-WA0103.jpg';

        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: message 
        }, { mimetype: 'image/jpeg' });
    }
};

handler.help = ['precios1'];
handler.tags = ['main'];
handler.command = ['precios1', 'p1', 'precio1'];

export default handler;