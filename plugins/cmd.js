const {
    inrl,
    setCmd,
    DeleteCmd,
    getCmd
} = require("../lib")

inrl({
    pattern: 'setcmd',
    desc: 'To set media as a cmd',
    react: "😛",
    type: "action",
    fromMe :true
}, async (message, match) => {
    if (!message.reply_message.sticker) return await message.reply("*_reply to a sticker msg and give me cmd name_*\ne_x: setcmd ping_");
    if (!message.reply_message.msg.fileSha256) return message.send("_*Failed To Save Your Media Message!*_")
    if (!match) return await message.send("*_For Which Cmd!_*")
    await setCmd(message.quoted.msg.fileSha256.join(""), match,message.client.user.number)
    return await message.reply("_successfull_")
});
inrl({
    pattern: 'dltcmd',
    desc: 'To dlt media d as alrdy set',
    react: "💥",
    type: "action",
    fromMe :true
}, async (message, match) => {
    if (!match) return await message.send("_*which cmd!*_")
    await DeleteCmd(match,message.client.user.number)
    return await message.reply("_successfull_")
});
inrl({
    pattern: 'getcmd',
    desc: 'To dlt media d as alrdy set',
    react: "💥",
    type: "action",
    fromMe :true
}, async (message, match) => {
    let data = await getCmd(message.client.user.number),
        cmds = "*Totel Cmds*";
    if (data == "no data") return message.send('_*no sticker cmd in your db!*_')
    let n = 1;
    data.map((b) => {
        cmds += '```'+`${n++}  ${b.cmd}`+'```'+`\n`;
    })
    return await message.reply(cmds)
});
