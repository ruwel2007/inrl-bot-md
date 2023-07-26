// created by @inrl

const { inrl }= require('../lib/');
const fs = require('fs');


inrl({ pattern: 'send', DismissPrefix: true, desc: "it send wa status",sucReact: "⚒️",  category: ["owner"],type :"whatsapp"}, (async (message, match) => {
if(!message.quoted.msg) return message.reply("*_reply to image/video!_*")
if (message.quoted.videoMessage) {
caption = message.quoted?.videoMessage?.caption;
let location = await message.quoted.download();
return await message.client.sendMessage(message.jid, { video: location, captiontion: caption });
}else if (message.quoted.imageMessage) {
caption = message.quoted?.imageMessage?.caption;
let location = await message.quoted.download()
return await message.client.sendMessage(message.jid, { image: location, captiontion: caption });
   } else if(message.quoted.audioMessage){
let location = await message.quoted.download()
return await message.client.sendMessage(message.jid, { audio: location, mimetype: "audio/mp4",ptt: false});
}
}));
