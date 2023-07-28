const {
    inrl
} = require('../lib/'), {
        BASE_URL
    } = require('../config'),
    axios = require('axios');
inrl({
    pattern: "$gpt",
    react : "🤝",
    type: "eva"
}, async (message, match) => {
    try {
            match = match || message.quoted.text;
        if (!match) return await message.reply('_need text to get ai result_');
        let {
            data
        } = await axios(`${BASE_URL}api/chatgpt?text=${match}`);
        body = data.result;
        return await message.client.sendMessage(message.from, {
            text: body
        });
    } catch (e) {
        return await message.send('_provided API is not valid_');
    }
});
inrl({
    pattern: "scan",
    react : "🤝",
    type: "user"
}, async (message, match) => {
    let ttinullimage = `${BASE_URL}server/scan`;
    const Message = {
        image: {
            url: ttinullimage
        },
        caption: "scan within 23.5 seconds"
    };
    return await message.client.sendMessage(message.from, Message).catch((e) => message.reply('*_Failed_*'));
});
inrl({
    pattern: 'jid',
    desc: 'To get jid off member',
    react : "💯",
    type: "general"
}, async (message) => {
    if (message.quoted.sender) {
        await message.client.sendMessage(message.from, {
            text: message.quoted.sender
        }, {
            quoted: message
        })
    } else {
        await message.client.sendMessage(message.from, {
            text: message.from
        }, {
            quoted: message
        })
    }
});
inrl({
    pattern: 'block',
    desc: 'To block a person',
    react : "💯",
    type: "owner",
    fromMe :true
}, async (message) => {
    if (message.isGroup) {
        await message.client.updateBlockStatus(message.quoted.sender, "block") // Block user
    } else {
        await message.client.updateBlockStatus(message.from, "block")
    }
}); // Block user
inrl({
    pattern: 'unblock',
    desc: 'To unblock a person',
    react : "💯",
    type: "owner",
    fromMe :true
}, async (message) => {
    if (message.isGroup) {
        await message.client.updateBlockStatus(message.quoted.sender, "unblock") // Unblock user
    } else {
        await message.client.updateBlockStatus(message.from, "unblock") // Unblock user
    }
});
inrl({
    pattern: 'frd',
    desc: 'for sending a message  by thir jid',
    react : "😉",
    type: "utility",
    fromMe :true
}, async (message, match) => {
    if (!match) {
        return message.client.sendMessage(message.from, {
            text: "after the (cmd) enter the jid to share your data \n_example :- forward 910123456789@s.whatsapp.net_"
        });
    }
    try {
    let jid = match;
    if (message.quoted.imageMessage) {
        let msg = await message.quoted.download();
        await message.client.sendMessage(jid, {
            image: msg
        });
    } else if (message.quoted.stickerMessage) {
        let msg = await message.quoted.download();
        await message.client.sendMessage(jid, {
            sticker: msg
        });
    } else if (message.quoted.videoMessage) {
        let msg = await message.quoted.download();
        await message.client.sendMessage(jid, {
            video: msg
        });
    } else if (message.quoted.audioMessage) {
        let msg = await message.quoted.download();
        await message.client.sendMessage(jid, {
            audio: msg
        });
    } else {
        return await message.client.sendMessage(message.from, {
            text: "replay to a message with a jid"
        });
    }
    } catch(e){
    return message.send('_*Failed*_');
    }
});
inrl({
    pattern: 'whois',
    desc: 'it send information of user',
    react : "💯",
    type: "utility",
    fromMe :true
}, async (message, match) => {
    try {
        let pp, from, cap;
        if (message.isGroup) {
            from = message.quoted.sender;
            try {
                pp = await message.client.profilePictureUrl(from, 'image')
            } catch {
                pp = 'https://i.ibb.co/gdp7HrS/8390ad4fefbd.jpg'
            }
            //let { id, name } = message.conn.user;
            let {
                status,
                setAt
            } = await message.client.fetchStatus(from)
            let captiOn = "```" /*user : ${name}\nid : ${id}\n*/ + `status :${status}\nstatus setAt : ${setAt}` + "```";
            await message.client.sendMessage(message.from, {
                image: {
                    url: pp
                },
                caption: captiOn
            }, {
                quoted: message
            });
        } else {
            from = message.from;
            try {
                pp = await message.client.profilePictureUrl(from, 'image')
            } catch {
                pp = 'https://i.ibb.co/gdp7HrS/8390ad4fefbd.jpg'
            }
            //let { id, name } = message.conn.user;
            let {
                status,
                setAt
            } = await message.client.fetchStatus(from)
            let captiOn = "```" /*user : ${name}\nid : ${id}\n*/ + `status :${status}\nstatus setAt : ${setAt}` + "```";
            await message.client.sendMessage(message.from, {
                image: {
                    url: pp
                },
                caption: captiOn
            }, {
                quoted: message
            });
        }
    } catch (e) {
        message.reply('_*Failed*_');
    }
});
