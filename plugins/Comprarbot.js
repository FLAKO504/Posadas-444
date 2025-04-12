const handler = async (m, {conn}) => {
  const message = {
    image: { url: 'https://i.postimg.cc/hv94Q6R8/IMG-20250408-WA0103.jpg' },
    caption: global.ComprarBot // Mantiene el texto como subtítulo de la imagen
  };
  await conn.sendMessage(m.chat, message);
};
handler.command = 'comprar', /^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

global.ComprarBot = `
〔 *Bot Elder- Ai* 〕

*BOT PARA GRUPO* :
> wa.me/50493374445

*BOT PERSONALIZADO* :
> wa.me/50493374445
`;