import fs from 'fs';
import os from 'os';
import moment from 'moment-timezone';


const handler = async (m, { conn }) => {
    const prefix = global.prefix;
    const actividad = moment.duration(process.uptime(), 'seconds').humanize();
    const groups = Object.keys(conn.chats).filter(v => v.endsWith('@g.us')).length;
    const chatsP = Object.keys(conn.chats).filter(v => v.endsWith('@s.whatsapp.net')).length;
    const tiempo = moment(global.startTime).format('DD/MM/YYYY HH:mm:ss');
    const hrs = moment.tz('America/Tegucigalpa').format('HH:mm:ss');

    let bann = 'https://cdnmega.vercel.app/media/9wB1HLrT@Jcn5yrz18NjokOpmyK-SS9u-OZc4SyK_2rsVxxQ6wXI';
    let tag = `@${m.sender.split('@')[0]}`;
    let mensaje = `*Hola ${tag}, Este es el estado del bot*

`;
    mensaje += `*Prefijo:* ${prefix}\n\n`;
    mensaje += `*Tiempo de Actividad:* ${actividad}\n\n`;
    mensaje += `*Grupos Unidos:* ${groups}\n\n`;
    mensaje += `*Chats Privados:* ${chatsP}\n\n`;
    mensaje += `*Último Reinicio:* ${tiempo}\n\n`;
    mensaje += `*Zona Horaria:* ${hrs}\n\n`;

    conn.sendMessage(m.chat, { 
        image: { url: bann }, 
        caption: mensaje, 
        mentions: [m.sender]
    }, { quoted: m });
    }    

    handler.customPrefix = /^(Estado|sta)$/i;
    handler.command = new RegExp;

export default handler;