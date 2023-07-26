const {
    inrl,
    remove,
    unscreen,
    getVar
} = require('../lib/');
const { BASE_URL } = require('../config');
const axios = require('axios');
const fs = require('fs');

inrl({
    pattern: "rmbg",
    desc: 'To remove bg of any image',
    react: "😉",
    type: "converter",
    usage: "give png image without background for your img request"
}, async (message, match) => {
    if (!message.reply_message.image) return message.reply('*_reply to a img msg!_*')
    let img = await message.client.downloadAndSaveMediaMessage(message.quoted.imageMessage)
    let rmbgimg = await remove(fs.readFileSync(img))
    // let rmbg = await fs.writeFile('./media/rmbg/isexit.jpg', rmbgimg)
    await message.client.sendMessage(message.chat, {
        image: rmbgimg,
    }, {
        quoted: message
    })
    await fs.unlinkSync(img); //return await fs.unlinkSync(rmbg);
});
inrl({
    pattern: "img",
    usage: 'send google image result for give text',
    react: "🖼",
    type: "search"
}, async (message, match) => {
    if (!match) {
        return await message.client.sendMessage(message.from, {
            text: '*_Give Me A Text To Search_*'
        }, {
            quoted: message
        });
    }
    let count = 1
    if(match.includes(";")) {
    match = match.split(';')[0];
    count=match.split(';')[1];
    }
    if(!count.toString().replace(/[^0-9]/g,'')) {
    count=1
    } else{
    count = count.toString().replace(/[^0-9]/g,'')
    };
    if(Number(count)>3 && !message.client.isCreator) return await message.reply("*_Only Owner can use more then 3 image Search At at a Tiem_*");
    const {data} = await axios(BASE_URL+'api/gis?text='+match+`&count=${count}`);
    const {result} = data;
    if(!result[0]) return await message.send('_Not Found_');
    result.map(async(url)=>{
    return await message.sendReply(url,{caption:'*result for*: ```'+match+"```"},'image');
    });
});
