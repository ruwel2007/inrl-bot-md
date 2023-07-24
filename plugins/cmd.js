const {
    inrl,
    setCmd,
    DeleteCmd,
    getCmd
} = require("../lib")

inrl({
    pattern: 'setcmd',
    desc: 'To set media as a cmd',
    sucReact: "😛",
    category: ["system", "all"],
    type: "action",
    fromMe :true
}, async (message, client, match, cmd) => {
    if (!message.reply_message.sticker) return await message.reply('*_reply to a sticker msg and give me cmd name\nex: setcmd ping_*");
    if (!message.reply_message.msg.fileSha256) return message.send("_*Failed To Save Your Media Message!*_")
    if (!match) return await message.send("*_For Which Cmd!_*")
    await setCmd(message.quoted.msg.fileSha256.join(""), match)
    return await message.reply("_successfull_")
});
inrl({
    pattern: 'dltcmd',
    desc: 'To dlt media d as alrdy set',
    sucReact: "💥",
    category: ["system", "all"],
    type: "action",
    fromMe :true
}, async (message, client, match, cmd) => {
    if (!match) return await message.send("_*which cmd!*_")
    await DeleteCmd(match)
    return await message.reply("_successfull_")
});
inrl({
    pattern: 'getcmd',
    desc: 'To dlt media d as alrdy set',
    sucReact: "💥",
    category: ["system", "all"],
    type: "action",
    fromMe :true
}, async (message, client, match, cmd) => {
    let data = await getCmd(),
        cmds = "*Totel Cmds*";
    if (data == "no data") return message.send('no sticker cmd in your db!')
    let n = 1;
    data.map((b) => {
        cmds += '```'+`${n++}  ${b.cmd}`+'```'+`\n`;
    })
    return await message.reply(cmds)
});
