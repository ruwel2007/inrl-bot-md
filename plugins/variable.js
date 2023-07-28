const {
    inrl,
    UpdateVariable
} = require('../lib');
inrl({
    pattern: 'setvar$',
    desc: 'to change variables of bot',
    sucReact: "🥺",
    category: ["all,system"],
    type: "database",
    fromMe: true
}, async (message, match, data) => {
    if (!match) return message.reply('```need id & value,example: setvar pmbc_msg = ``` _*pmmsg not allowed*_');
    if (!match.match("=")) return message.reply('_*need id & value,example: setvar automute_msg =*_  _group closed for{}_');
    let keyID = match.split('=')[0].toUpperCase().trim();
    let Update = match.split('=')[1].trim();
    if (keyID == "PMB_MSG") {
        await UpdateVariable("PMB_MSG", Update, message.client.user.number);
        return await message.reply('successfull!\ntry .restart to restart the bot');
    } else if (keyID == "PMBC_MSG") {
        await UpdateVariable("PMBC_MSG", Update, message.client.user.number);
        return await message.reply('successfull!\ntry .restart to restart the bot');
    } else if (keyID == "AUTOMUTE_MSG") {
        await UpdateVariable("AUTOMUTE_MSG", Update, message.client.user.number);
        return await message.reply('successfull');
    } else if (keyID == "AUTOUNMUTE_MSG") {
        await UpdateVariable("AUTOUNMUTE_MSG", Update, message.client.user.number);
        return await message.reply('successfull');
    } else return message.reply('no such variable in yourDB,!if you need all variable;try : getvar');
})
inrl({
    pattern: 'getvar$',
    desc: 'to change variables of bot',
    sucReact: "😑",
    category: ["all,system"],
    type: "database",
    fromMe: true
}, async (message, match, data) => {
    let {
        ALLWAYS_ONLINE,
        REACT,
        WARNCOUND,
        ALIVE_DATA,
        AUTO_BIO,
        READ_CHAT,
        BOT_INFO,
        BGMBOT,
        WORKTYPE,
        PM_BLOCK,
        PREFIX,
        WELCOME_MSG,
        EXIT_MSG,
        CALL_BLOCK,
        STATUS_VIEW,
        LANG,
        PROFILE_STATUS,
        BLOCK_CHAT,
        AUTO_CHAT_PM,
        AUTO_CHAT_GRP,
        BOT_PRESENCE,
        AUDIO_DATA,
        STICKER_DATA,
        WA_GRP,
        SUDO,
        PMB_MSG,
        PMBC_MSG,
        AUTOMUTE_MSG,
        AUTOUNMUTE_MSG
    } = data;
    value = match.toUpperCase().trim();
    if (!match) {
        let content = `
ALLWAYS_ONLINE: ${ALLWAYS_ONLINE}
REACT: ${REACT}
WARNCOUND: ${WARNCOUND}
AUTO_BIO: ${AUTO_BIO}
READ_CHAT: ${READ_CHAT}
BGMBOT: ${BGMBOT}
WORKTYPE: ${WORKTYPE}
PMB_MSG: ${PMB_MSG}
PMBC_MSG: ${PMBC_MSG}
AUTOMUTE_MSG: ${AUTOMUTE_MSG}
AUTOUNMUTE_MSG: ${AUTOUNMUTE_MSG}
PM_BLOCK: ${PM_BLOCK} 
PREFIX: ${PREFIX}
CALL_BLOCK: ${CALL_BLOCK}
STATUS_VIEW: ${STATUS_VIEW}
LANG: ${LANG}
WA_GRP : ${WA_GRP}
BOT_INFO: ${BOT_INFO}
PROFILE_STATUS: ${PROFILE_STATUS}
BLOCK_CHAT: ${BLOCK_CHAT}
AUTO_CHAT_PM: ${AUTO_CHAT_PM}
AUTO_CHAT_GRP: ${AUTO_CHAT_GRP}
BOT_PRESENCE: ${BOT_PRESENCE}
AUDIO_DATA: ${AUDIO_DATA}
SUDO: ${SUDO}`
        return await message.reply(content);
    } else if (value == "REACT") {
        return await message.reply(`REACT : ${REACT}`);
    } else if (value == "WARNCOUND") {
        return await message.reply(`WARNCOUND : ${WARNCOUND}`);
    } else if (value == "ALIVE_DATA") {
        return await message.reply(`ALIVE_DATA : ${ALIVE_DATA}`);
    } else if (value == "ALLWAYS_ONLINE") {
        return await message.reply(`ALLWAYS_ONLINE : ${ALLWAYS_ONLINE}`);
    } else if (value == "AUTO_BIO") {
        return await message.reply(`AUTO_BIO : ${AUTO_BIO}`);
    } else if (value == "READ_CHAT") {
        return await message.reply(`READ_CHAT : ${READ_CHAT}`);
    } else if (value == "BGMBOT") {
        return await message.reply(`BGMBOT : ${BGMBOT}`);
    } else if (value == "WORKTYPE") {
        return await message.reply(`WORKTYPE : ${WORKTYPE}`);
    } else if (value == "PM_BLOCK") {
        return await message.reply(`PM_BLOCK : ${PM_BLOCK}`);
    } else if (value == "PREFIX") {
        return await message.reply(`PREFIX : ${PREFIX}`);
    } else if (value == "WA_GRP") {
        return await message.reply(`WA_GRP : ${WA_GRP}`);
    } else if (value == "WELCOME_MSG") {
        return await message.reply(`WELCOME_MSG : ${WELCOME_MSG}`);
    } else if (value == "EXIT_MSG") {
        return await message.reply(`EXIT_MSG : ${EXIT_MSG}`);
    } else if (value == "CALL_BLOCK") {
        return await message.reply(`CALL_BLOCK : ${CALL_BLOCK}`);
    } else if (value == "STATUS_VIEW") {
        return await message.reply(`STATUS_VIEW : ${STATUS_VIEW}`);
    } else if (value == "LANG") {
        return await message.reply(`LANG : ${LANG}`);
    } else if (value == "PROFILE_STATUS") {
        return await message.reply(`PROFILE_STATUS : ${PROFILE_STATUS}`);
    } else if (value == "BLOCK_CHAT") {
        return message.reply(`BLOCK_CHAT : ${BLOCK_CHAT}`);
    } else if (value == "AUTO_CHAT_PM") {
        return await message.reply(`AUTO_CHAT_PM : ${AUTO_CHAT_PM}`);
    } else if (value == "AUTO_CHAT_GRP") {
        return await message.reply(`AUTO_CHAT_GRP : ${AUTO_CHAT_GRP}`);
    } else if (value == "BOT_PRESENCE") {
        return await message.reply(`BOT_PRESENCE : ${BOT_PRESENCE}`);
    } else if (value == "AUDIO_DATA") {
        return await message.reply(`AUDIO_DATA : ${AUDIO_DATA}`);
    } else if (value == "STICKER_DATA") {
        return await message.reply(`STICKER_DATA : ${STICKER_DATA}`);
    } else if (value == "PMB_MSG") {
        return await message.reply(`PMB_MSG : ${PMB_MSG}`);
    } else if (value == "PMBC_MSG") {
        return await message.reply(`PMBC_MSG : ${PMBC_MSG}`);
    } else if (value == "AUTOMUTE_MSG") {
        return message.reply(`AUTOMUTE_MSG : ${AUTOMUTE_MSG}`);
    } else if (value == "AUTOUNMUTE_MSG") {
        return await message.reply(`AUTOUNMUTE_MSG : ${AUTOUNMUTE_MSG}`);
    } else if (value == "SUDO") {
        return await message.reply(`SUDO : ${SUDO}`);
    } else if (value == "BOT_INFO") {
        return await message.reply(`BOT_INFO : ${BOT_INFO}`);
    } else return await message.reply('*_no such variable in yourDB. !if you need all variable;try : getvar_*');
})
inrl({
    pattern: 'prefix$',
    desc: 'to change prefix of bot',
    react: "🧤",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) return await message.send('_eg:- prefix get_\n_prefix ★_');
    if (match && match == "get") {
        return await message.send(data.PREFIX);
    } else if (match) {
        await UpdateVariable("PREFIX", match, message.client.user.number);
        return await message.send('*_success_*');
    }
});
inrl({
    pattern: 'adata$',
    desc: 'to change audio data',
    react: "⛑️",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) return await message.send('_eg:- audio_data get_\n_audio_data inrl;md;https://example.jpeg_');
    if (match && match == "get") {
        return await message.send(data.AUDIO_DATA);
    } else if (match) {
        if (!match.match(';')) return await message.send('_audio_data inrl;md;https://example.jpeg_');
        if (!match.split(';').length == 3) return await message.send('_audio_data inrl;md;https://example.jpeg_');
        await UpdateVariable("AUDIO_DATA", match, message.client.user.number);
        return await message.send('*_success_*');
    }
});
inrl({
    pattern: 'bio$',
    desc: 'to change variables of bot',
    react: "🤪",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) return await message.send('_eg:- bio get_\n_bio hay their😶_');
    if (match && match == "get") {
        return await message.send(data.PROFILE_STATUS);
    } else if (match) {
        await UpdateVariable("PROFILE_STATUS", match, message.client.user.number);
        return await message.send('*_success_*\n*use setting cmd and check auto_bio in or not*');
    }
});
inrl({
    pattern: 'wagrp$',
    desc: 'to change variables of bot',
    react: "🤪",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) return await message.send('_eg:- wagrp get_\n_wagrp https://chat.whatsapp.com/D3qKPbtFzidBX8jjPZYUcy_');
    if (match && match == "get") {
        return await message.send(data.WA_GRP);
    } else if (match) {
        await UpdateVariable("WA_GRP", match, message.client.user.number);
        return await message.send('*_success_*');
    }
});
inrl({
    pattern: 'antibot$',
    desc: 'to block bot use from specific jid',
    react: "🥸",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) {
        match = m.from;
        await message.send('_you not gived any jid so bot off from this jid_\n\n```block_chat get```\n```block_chat remove jid```');
    }
    if (match && match == "get") {
        return await message.send(`${data.BLOCK_CHAT?data.BLOCK_CHAT:'no data'}`);
    } else if (match.includes("remove")) {
        const jid = match.replace("remove", "").trim();
        if (!data.BLOCK_CHAT.includes(jid)) return message.send("*_this jid not existing in blocked chat list_*");
        let value = data.BLOCK_CHAT.includes(',' + jid) ? data.BLOCK_CHAT.replaceAll(',' + jid, "") : data.BLOCK_CHAT.includes(jid + ',') ? data.BLOCK_CHAT.replaceAll(jid + ',', "") : data.BLOCK_CHAT.replaceAll(jid, "");
        await UpdateVariable("BLOCK_CHAT", value, message.client.user.number);
        return await message.send('*_success_*');
    } else if (match) {
        match = data.BLOCK_CHAT + ',' + match;
        await UpdateVariable("BLOCK_CHAT", match, message.client.user.number);
        return await message.send('*_success_*\n_restart to remove bot from this jid_');
    }
});
inrl({
    pattern: 'sdata$',
    desc: 'to change sticker data of bot',
    react: "⛑️",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) return await message.send('_eg:- sticker_data get_\n*_sticker_data inrl;md_*');
    if (match && match == "get") {
        return await message.send(data.STICKER_DATA);
    } else if (match) {
        if (!match.match(';')) return await message.send('_sticker_data inrl;md_');
        if (!match.split(';').length == 2) return await message.send('_sticker_data inrl;md_');
        await UpdateVariable("STICKER_DATA", match, message.client.user.number);
        return await message.send('*_success_*');
    }
});
inrl({
    pattern: 'binfo$',
    desc: 'to change bot info',
    react: "✳️",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    if (!match) return await message.send('_eg:- binfo get_\n*_binfo inrl;md;img_url_*');
    if (match && match == "get") {
        return await message.send(data.BOT_INFO);
    } else if (match) {
        if (!match.match(';')) return await message.send('_binfo inrl;md;https://g.v.img.jpeg_');
        if (!match.split(';').length == 3) return await message.send('_binfo inrl;md;https://g.v.img.jpeg__');
        await UpdateVariable("BOT_INFO", match, message.client.user.number);
        return await message.send('*_success_*');
    }
});
inrl({
    pattern: 'sudo$',
    desc: 'to change variables of bot',
    react: "🤯",
    type: "settings",
    fromMe: true,
    DismissPrefix: true,
}, async (message, match, data) => {
    let sudo;
    if (message.quoted.sender) {
        sudo = message.quoted.number
    } else if (match && match.replace(/[^0-9]/g, '')) {
        sudo = match.replace(/[^0-9]/g, '')
    }
    if (match && match == "get") {
        return await message.send(`${data.SUDO?data.SUDO:'no data'}`);
    } else if (match.includes("remove")) {
        const jid = message.quoted.number || match.replace("remove", "").trim().replace(/[^0-9]/g, '');
        if (!data.SUDO.includes(jid)) return message.send("_*this jid not existing in sudo list_*");
        let value = data.SUDO.includes(',' + jid) ? data.SUDO.replaceAll(',' + jid, "") : data.SUDO.includes(jid + ',') ? data.SUDO.replaceAll(jid + ',', "") : data.SUDO.replaceAll(jid, "");
        await UpdateVariable("SUDO", value, message.client.user.number);
        return await message.send('*_success_*');
    } else if (sudo) {
        sudo = data.SUDO + ',' + sudo;
        await UpdateVariable("SUDO", sudo, message.client.user.number);
        return await message.send('*_success_*');
    } else {
        return await message.send('*_eg:- sudo get_*\n*_sudo remove 9170250000_*\n*_sudo 9087654321_*');
    }
});
