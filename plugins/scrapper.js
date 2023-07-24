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
    sucReact: "🙃",
    category: ["system", "all"],
    type: "search"
}, async (message, client) => {
    try {
        if (!message.client.text) return message.send("need a text to serch");
        let teks = await googleIt(message.client.text);
        return await client.sendMessage(message.from, {
            text: "\n" + teks
        }, {
            quoted: message
        })
    } catch (e) {
        message.send("error" + e)
    }
});
inrl({
    pattern: 'ringtone',
    desc: 'do get random ringtons ',
    sucReact: "🙃",
    category: ["system", "all"],
    type: "search"
}, async (message, client) => {
    try {
        if (!message.client.text) return message.send("need a text to serch");
        let result = await ringtone(message.client.text), res=[];
        await result.map(r=>res.push(r.title));
        return await client.sendMessage(message.jid, {
            text: GenListMessage("AVAILABLE RINGTONES", res)
            });
     } catch (e) {
        message.send(e)
    }
});   

inrl({
    pattern: 'weather',
    desc: 'To get detiles of you place',
    sucReact: "🔥",
    category: ["system", "all"],
    type: "search"
}, async (message, client, match) => {
    try {
        return await weather(message, client);
    } catch (e) {
        return message.send(e);
    }
});

inrl({
    pattern: 'dl-ringtone',
    type: "downloader",
    on: "text"
}, async (m, conn, match) => {
    if (!m.quoted || !m.quoted.fromMe) return;
    if(!m.client.body.includes("AVAILABLE RINGTONES")) return;
    match = m.client.body.replace("AVAILABLE RINGTONES", "").trim();
    await m.send("*_downloading_*:-\n\n"+match);
    let result = await ringtone(match);
    return await conn.sendMessage(m.jid, {
    audio:{
                url: result[0].audio
            },
            fileName: result[0].title + '.mp3',
            mimetype: 'audio/mpeg'
        }, {
            quoted: m
     })
});
