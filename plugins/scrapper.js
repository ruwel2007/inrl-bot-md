const {
    inrl,
    googleIt,
    weather,
    ringtone,
    GenListMessage
} = require('../lib');

inrl({
    pattern: 'google',
    desc: 'do get goole serch result',
    react : "🙃",
    type: "search"
}, async (message, match) => {
    try {
        if (!match) return message.send("need a text to serch");
        let teks = await googleIt(match);
        return await message.client.sendMessage (message.from, {
            text: "\n" + teks
        }, {
            quoted: message
        })
    } catch (e) {
        message.send("*Failed*");
    }
});
inrl({
    pattern: 'ringtone',
    desc: 'do get random ringtons ',
    react : "🙃",
    type: "search"
}, async (message, match) => {
    try {
        if (!match) return message.send("need a text to serch");
        let result = await ringtone(match), res=[];
        await result.map(r=>res.push(r.title));
        return await message.client.sendMessage (message.jid, {
            text: GenListMessage("AVAILABLE RINGTONES", res)
            });
     } catch (e) {
        message.send("*Failed*");
    }
});   

inrl({
    pattern: 'weather',
    desc: 'To get detiles of you place',
    react : "🔥",
    type: "search"
}, async (message, match) => {
    try {
        return await weather(message);
    } catch (e) {
        return message.send("*Failed*");
    }
});

inrl({
    pattern: 'dl-ringtone',
    type: "downloader",
    on: "text"
}, async (m, match) => {
    if (!m.quoted || !m.quoted.fromMe) return;
    if(!m.client.body.includes("AVAILABLE RINGTONES")) return;
    match = m.client.body.replace("AVAILABLE RINGTONES", "").trim();
    await m.send("*_downloading_*:-\n\n"+match);
    let result = await ringtone(match);
    return await m.conn.sendMessage(m.jid, {
    audio:{
                url: result[0].audio
            },
            fileName: result[0].title + '.mp3',
            mimetype: 'audio/mpeg'
        }, {
            quoted: m
     })
});
