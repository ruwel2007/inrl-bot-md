const {
    inrl,
    getBuffer
} = require('../lib');
const {
    BASE_URL
} = require('../config');
inrl({
    pattern: "ttp",
    type: "misc"
}, async (message, match) => {
    if (!match) return await message.send("*_need text_*");
    const res = `${BASE_URL}api/ttp?text=${match}`
    return await message.client.sendMessage(message.jid, {
        image: {
            url: res
        }
    });
});
inrl({
    pattern: "attp",
    type: "misc"
}, async (message, match) => {
    if (!match) return await message.send("*_need text_*");
    const res = await getBuffer(`${BASE_URL}api/attp?text=${match}`);
    return await message.client.sendFile(message.chat, res, "", message, {
        asSticker: true,
        categories: ["😑"],
    });
});
