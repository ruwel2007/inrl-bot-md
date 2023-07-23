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
}, async (message, client) => {
    if (!message.client.text) return await message.send("need text");
    const uri = encodeURI(message.client.text);
    const res = `${BASE_URL}api/ttp?text=${uri}`
    return await client.sendMessage(message.jid, {
        image: {
            url: res
        }
    });
});
inrl({
    pattern: "attp",
    type: "misc"
}, async (message, client) => {
    if (!message.client.text) return await message.send("need text");
    const uri = encodeURI(message.client.text);
    const res = await getBuffer(`${BASE_URL}api/attp?text=${uri}`);
    return await client.sendFile(message.chat, res, "", message, {
        asSticker: true,
        categories: ["😑"],
    });
});
