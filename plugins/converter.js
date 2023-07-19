//created by @inrl
const {
    inrl,
    sendPhoto,
    sendVideo,
    sendVoice,
    sendGif,
    sendBassAudio,
    sendSlowAudio,
    sendBlownAudio,
    sendDeepAudio,
    sendErrapeAudio,
    sendFastAudio,
    sendFatAudio,
    sendNightcoreAudio,
    sendReverseAudio,
    sendSquirrelAudio,
    sendMp4AsMp3,
    getVar
} = require('../lib');

const {
    BASE_URL
} = require('../config');
inrl({
    pattern: 'photo',
    desc: "to convert webp to img",
    sucReact: "⚒️",
    category: ["all"],
    type: "converter"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.stickerMessage) return message.reply('reply to  a sticker');
    return await sendPhoto(message, client);
});
inrl({
    pattern: 'video',
    desc: "to convert webp to mp4",
    sucReact: "⚒️",
    category: ["all"],
    type: "converter"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.stickerMessage) return message.reply('reply to  a sticker');
    return await sendVideo(message, client)
});
inrl({
    pattern: 'voice',
    desc: "to convert audio/video to ptt",
    sucReact: "⚒️",
    category: ["all"],
    type: "converter"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendVoice(message, client)
});
inrl({
    pattern: 'gif',
    desc: "to convert webp to gif",
    sucReact: "⚒️",
    category: ["all"],
    type: "converter"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.stickerMessage || message.quoted.videoMessage) return message.reply('reply to sticker/video');
    return await sendGif(message, client)
});
inrl({
    pattern: 'bass',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendBassAudio(message, client)
});
inrl({
    pattern: 'slow',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendSlowAudio(message, client)
});
inrl({
    pattern: 'blown',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendBlownAudio(message, client)
});
inrl({
    pattern: 'deep',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendDeepAudio(message, client);
});
inrl({
    pattern: 'earrape',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendErrapeAudio(message, client)
});
inrl({
    pattern: 'fast',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendFastAudio(message, client)
});
inrl({
    pattern: 'fat',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendFatAudio(message, client);
});
inrl({
    pattern: 'nightcore',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendNightcoreAudio(message, client);
});
inrl({
    pattern: 'reverse',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendReverseAudio(message, client);
});
inrl({
    pattern: 'squirrel',
    desc: "to convert audio to given cmd",
    sucReact: "⚒️",
    category: ["all"],
    type: "audio-edit"
}, async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage) return message.reply('reply to an audio/voice');
    return await sendSquirrelAudio(message, client);
});

inrl({
    pattern: 'mp3',
    desc: "to get video as audio ",
    sucReact: "💥",
    category: ['all'],
    type: "converter"
}, (async (message, client) => {
    if (!message.quoted) return;
    if (!message.quoted.audioMessage && !message.quoted.videoMessage) return message.reply('reply to an video/mp4');
    return await sendMp4AsMp3(message, client)
}));
