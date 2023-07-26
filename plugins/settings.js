//created by @inrl
const {
    inrl,
    GenListMessage,
    UpdateVariable
} = require('../lib');
inrl({
    pattern: 'setting$',
    fromMe: true,
    DismissPrefix: true,
    type: "system"
}, async (m) => {
    if (m.client.text && m.client.text.length > 3) return;
    return await m.sock.sendMessage(m.from, {
        text: GenListMessage("Settings Updater", ["ANTI_SPAM", "ALLWAYS_ONLINE", "REACT", "AUTO_BIO", "READ_CHAT", "BGMBOT", "WORKTYPE", "PM_BLOCK", "CALL_BLOCK", "STATUS_VIEW", "AUTO_CHAT_PM", "AUTO_CHAT_GRP", "BOT_PRESENCE"])
    })
});
inrl({
    pattern: 'configration',
    type: "system",
    on: "text",
    fromMe: true
}, async (m, text, data) => {
    if(!m.reply_message.fromMe) return;
    match = m.client.body.toLowerCase();
    if (!match.includes('settings updater')) return;
    match = match.replace('settings updater', '').trim();
    if (match == "allways_online") {
        const {
            ALLWAYS_ONLINE
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${ALLWAYS_ONLINE}`, [`ALLWAYS_ONLINE ${ALLWAYS_ONLINE== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "anti_spam") {
        const {
            ANTI_SPAM
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${ANTI_SPAM}`, [`ANTI_SPAM ${ANTI_SPAM== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "react") {
        const {
            REACT
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${REACT}`, [`REACT ${REACT== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "auto_bio") {
        const {
            AUTO_BIO
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${AUTO_BIO}`, [`AUTO_BIO ${AUTO_BIO== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "read_chat") {
        const {
            READ_CHAT
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${READ_CHAT}`, [`READ_CHAT ${READ_CHAT== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "bgmbot") {
        const {
            BGMBOT
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${BGMBOT}`, [`BGMBOT ${BGMBOT== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "worktype") {
        const {
            WORKTYPE
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${WORKTYPE}`, [`WORKTYPE ${WORKTYPE== "public"? 'private':'public'}`])
        })
    } else if (match == "pm_block") {
        const {
            PM_BLOCK
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${PM_BLOCK}`, [`PM_BLOCK ${PM_BLOCK== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "call_block") {
        const {
            CALL_BLOCK
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${CALL_BLOCK}`, [`CALL_BLOCK ${CALL_BLOCK== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "status_view") {
        const {
            STATUS_VIEW
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${STATUS_VIEW}`, [`STATUS_VIEW ${STATUS_VIEW== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "auto_chat_pm") {
        const {
            AUTO_CHAT_PM
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${AUTO_CHAT_PM}`, [`AUTO_CHAT_PM ${AUTO_CHAT_PM== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "auto_chat_grp") {
        const {
            AUTO_CHAT_GRP
        } = data;
        return await m.sock.sendMessage(m.from, {
            text: GenListMessage(`status : ${AUTO_CHAT_GRP}`, [`AUTO_CHAT_GRP ${AUTO_CHAT_GRP== "true"? 'OFF':'ON'}`])
        })
    } else if (match == "bot_presence") {
        const {
            BOT_PRESENCE
        } = data;
        switch (BOT_PRESENCE) {
            case "unavailable":
                return await m.sock.sendMessage(m.from, {
                    text: GenListMessage(`status : ${BOT_PRESENCE}`, ["AVAILABLE", "COMPOSING", "RECORDING", "PAUSED"])
                })
                break;
            case "available":
                return await m.sock.sendMessage(m.from, {
                    text: GenListMessage(`status : ${BOT_PRESENCE}`, ["UNAVAILABLE", "COMPOSING", "RECORDING", "PAUSED"])
                })
                break;
            case "composing":
                return await m.sock.sendMessage(m.from, {
                    text: GenListMessage(`status : ${BOT_PRESENCE}`, ["UNAVAILABLE", "AVAILABLE", "RECORDING", "PAUSED"])
                })
                break;
            case "recording":
                return await m.sock.sendMessage(m.from, {
                    text: GenListMessage(`status : ${BOT_PRESENCE}`, ["UNAVAILABLE", "AVAILABLE", "COMPOSING", "PAUSED"])
                })
                break;
            case "paused":
                return await m.sock.sendMessage(m.from, {
                    text: GenListMessage(`status : ${BOT_PRESENCE}`, ["UNAVAILABLE", "AVAILABLE", "COMPOSING", "RECORDING"])
                })
                break;
            default:
                break;
        }
    }
});
inrl({
    pattern: 'listcontrol',
    type: "system",
    on: "text",
    fromMe: true
}, async (m, text, data) => {
    if(!m.reply_message.fromMe) return;
    if (!m.client.body.includes('status')) return;
    match = m.client.body.toLowerCase();
    if (match.includes('allways_online')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("ALLWAYS_ONLINE", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('anti_spam')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("ANTI_SPAM", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('react')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("REACT", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('auto_bio')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("AUTO_BIO", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_\n```try restart to activate```");
    } else if (match.includes('read_chat')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("READ_CHAT", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('bgmbot')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("BGMBOT", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('worktype')) {
        let updt = match.split(" ").pop();
        updt = updt == "public" ? 'private' : 'public';
        await UpdateVariable("WORKTYPE", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_\n```restart to run with new variable```");
    } else if (match.includes('pm_block')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("PM_BLOCK", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('call_block')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("CALL_BLOCK", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('status_view')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("STATUS_VIEW", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('auto_chat_pm')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("AUTO_CHAT_PM", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('auto_chat_grp')) {
        let updt = match.split(" ").pop();
        updt = updt == "true" ? 'false' : 'true';
        await UpdateVariable("AUTO_CHAT_GRP", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    } else if (match.includes('available') || match.includes('composing') || match.includes('recording') || match.includes('paused')) {
        let updt = match.split(" ")[0]
        await UpdateVariable("BOT_PRESENCE", updt, m.client.user.id.split('@')[0]);
        return await m.reply("_*requested to the db*_");
    }
});
