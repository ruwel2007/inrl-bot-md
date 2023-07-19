const {inrl, TTS} = require('../lib');
//api simulate same response but its take more time so we just add function on library
inrl({
    pattern: 'tts',
    desc: "to get text as audio ",
    sucReact: "💔",
    category: ['all'],
    type: "converter"
}, (async (message, client, match) => {
    try {
        if (message.quoted) {
            match = match || message.quoted.text;
        }
        if (!match) return await client.sendMessage(message.from, {
            text: '*_Need query!_*'
        }, {
            quoted: message
        });
        let slang = match.match('\\{([a-z]+)\\}');
        let lang = "en";
        if (slang) {
            lang = slang[1];
            match = match.replace(slang[0], '');
        }
        let mm = await TTS(match,lang);
        return await client.sendMessage(message.from, {
            audio: mm,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: false
        });
    } catch (e) {
        message.reply("_Error, try again!_")
    }
}));
