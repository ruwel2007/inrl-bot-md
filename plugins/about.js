const {
    inrl,
    commands,
    tiny,
    insult,
    getBuffer,
    randomStyle,
    styletext,
    send_alive,
    send_menu,
    UpdateVariable
} = require('../lib')
const Config = require("../config");
inrl({
    pattern: 'list',
    desc: 'To viwe list of categories',
    react: "💯",
    type: 'info'
}, async (message) => {
    let b=1,c="";commands.map((e=>{e.pattern&&e.desc?c+=`${b++} *${e.pattern.replace(/[^a-zA-Z0-9,-]/g,"")}*\n_${e.desc}_\n\n`:c+=`${b++} *${e.pattern.replace(/[^a-zA-Z0-9,-]/g,"")}*\n`}));
    return await message.send(c);
});

inrl({
    pattern: 'del',
    desc: "to delete unwanted grp msg sended by bot",
    react: "⚒️",
    type: 'whatsapp',
    fromMe :true,
    onlyGroup :true
}, async (message, match) => {
    try {
        if (!message.quoted.text) return;
        return message.client.sendMessage(message.from, {
            delete: {
                remoteJid: message.chat,
                fromMe: message.quoted.fromMe,
                id: message.quoted.id,
                participant: message.quoted.sender
            }
        })
    } catch (e) {
        message.reply("*Failed*");
    }
});
inrl({
    pattern: 'dlt',
    desc: 'To dlt unwanted msg by admin from group content',
    react: "🤌",
    type: 'whatsapp',
    onlyGroup :true
}, async (message, match) => {
    if (match) return;
    try {
        let admin = await isAdmin(message);
        let BotAdmin = await isBotAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if(!message.quoted.msg) return message.send('*_reply to msg_*');
        return await message.client.sendMessage(message.from, {
            delete: {
                remoteJid: message.key.remoteJid,
                fromMe: message.quoted.fromMe,
                id: message.quoted.id,
                participant: message.quoted.sender
            }
        })
    } catch (e) {
        message.reply("*Failed*");
    }
})
inrl({
    pattern: "alive",
    desc: "to check the bot status",
    react: "🥰",
    type: 'info',
    usage:"*for normal text message*\n```.alive $text>hey_bro_&sender;\ntime:&time;```\n\n*for image*\n```.alive $iamge>img_url;$text>hey _sis_\ndate&date\speed : &speed;```\n\n*for video*\n```.alive $video>url;```\n\n*message with LinkPrvew*\n```.alive $sticker>url;\n$thumbnail>url;\n$title>text;\n$body>hy;\n$mediatype>1;\n$souceurl>url;\n$mediaurl>url;```"
}, async (message, match, data) => {
    if(match == "get" && message.client.isCreator){
    return await message.send(data.ALIVE_DATA);
    } else if(match && message.client.isCreator){
    await  UpdateVariable("ALIVE_DATA", match.trim(),message.conn.user.id.split(':')[0]);
    return await message.send('*success*');
    }
    return await send_alive(message, data);
});
inrl({
    pattern: "menu",
    desc: "it send available cmds list",
    react: "📰",
    type: 'whatsapp'
}, async (message, match, data) => {
    return await send_menu(message, data);
});
inrl({
    pattern: `cmds`,
    react: "🆗",
    type: 'info'
}, async (message, match) => {
    return await message.client.sendMessage(message.from, {
        text: commands.length.toString()
    }, {
        quoted: message
    });
});
inrl({
    pattern: 'fancy',
    desc: 'To convert text to random style as you want',
    react: "🙀",
    type: 'converter',
    media: 'text',
    usage: 'to convert texts to stylish example : fancy 10 inrl'
}, async (message, match) => {
    try {
        if (!match || !message.quoted.text) {
            let NewText = `
1 Fᴀɴᴄʏ
2 ʎɔuɐℲ
4 fancy
8 F̶a̶n̶c̶y̶
9 F̴a̴n̴c̴y̴
10 F̷a̷n̷c̷y̷
11 F̲a̲n̲c̲y̲
12 F̳a̳n̳c̳y̳
13 defult
14 F͎a͎n͎c͎y͎
15 F͓̽a͓̽n͓̽c͓̽y͓̽
16 fancy
17 Fａncｙ
18 ҒΔΠCΨ
19 千卂几匚ㄚ
20 ꎇꍏꈤꏳꌩ
21 ቻልክርሃ
22 𝐅𝐚𝐧𝐜𝐲
23 𝑭𝒂𝒏𝒄𝒚
24 𝐹𝑎𝑛𝑐𝑦
25 ᠻꪖꪀᥴꪗ
26 𝙵𝚊𝚗𝚌𝚢
27 fคຖ¢ฯ
28 ʄąŋƈყ
29 ｷﾑ刀ᄃﾘ
30 千卂几匚ㄚ
31 🄵🄰🄽🄲🅈
32 ᎦᏗᏁፈᎩ
33 ᖴᗩᑎᑕY
34 ʄǟռƈʏ
35 𝙵𝚊𝚗𝚌𝚢
36 𝙁𝙖𝙣𝙘𝙮
37 𝗙𝗮𝗻𝗰𝘆
38 𝐅𝐚𝐧𝐜𝐲
39 𝘍𝘢𝘯𝘤𝘺
40 Fαɳƈყ
41 ₣₳₦₵Ɏ
42 £åñ¢¥
43 ƒαη¢у
44 FΛПᄃY
45 Ƒąղçվ
46 Fₐₙcy
47 ᶠᵃⁿᶜʸ
48 Ŧคภςץ
49 𝔽𝕒𝕟𝕔𝕪
50 𝕱𝖆𝖓𝖈𝖞
51 🅵🅰🅽🅲🆈
52 𝓕𝓪𝓷𝓬𝔂
53 𝔉𝔞𝔫𝔠𝔶
54 Ｆａｎｃｙ
55 𝑭𝒂𝒏𝒄𝒚
56 𝐹𝛥𝛮𝐶𝑌
57 𝙁𝞓𝞜𝘾𝙔
58 𝐅𝚫𝚴𝐂𝐘
59 ᖴᗩᑎᑕᎩ`
            return await message.client.sendMessage(message.from, {
                text: NewText
            });
        }
        if(!message.quoted.text) return await message.reply('*_reply to a text message_*');
        if (isNaN(match)) return await message.reply('*_need number by given chart_*\n' + NewText);
        if (match < 1 || match > 59) return await message.reply('*_give a number between 1 & 59_*');
        let ThenText = await styletext(message.quoted.text, match)
        return await message.client.sendMessage(message.from, {
            text: ThenText
        });
    } catch (e) {
        return message.reply('*Failed*')
    }
});
