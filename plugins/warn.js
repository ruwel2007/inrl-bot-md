>//created by @inrl

const {
    inrl,
    isAdmin,
    isBotAdmin,
    setWarn,
    ResetWarn,
    ListWarn
} = require('../lib')

inrl({
    pattern: 'warn',
    desc: 'To warn a user in group',
    react: "😑",
    type: "action",
    fromMe :true,
    onlyGroup :true
}, async (message, match, data) => {
await message.send
if(!match && !message.quoted.sender) return await message.send("*_eg:-_*\n*warn* ```reply to a user```\n*warn* ```reset```\n*warn* ```get```");
if(match == "get"){
let lists = await ListWarn(message.from, message.client.user.number), msg ="*List of Users*\n\n";
if(!lists[0]) return await message.send('*_Not Found_*');
lists.map((list)=>{
msg += `*user:* ${list.user}\n*reason:* ${list.reason}\n*group:* ${list.group}@g.us\n\n`;
});
return await message.send(msg);
} else if(match == "reset"){
if(!message.reply_message.sender) return await message.send('_reply to a user_');
        const d = await ResetWarn(message.quoted.sender, message.from, message.client.user.number)
        return await message.send(`_successfull_`);
        } else {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.send('*_request failed with statuscode 403_*');
    let {
        WARNCOUND
    } = data
    if(!message.reply_message.sender) return await message.send('_reply to a user_');
        const t = match || "warning";
        const d = await setWarn(message.quoted.sender, message.from, t,message.client.user.number)
        let remains = WARNCOUND - d.count;
        let warnmsg = `❏─────[ ᴡᴀʀɴɪɴɢ ]─────❏
│ User :-${d.user}
❏───────────────────❏
┏─────── INFO ───────❏
│ Reason :- ${d.reason}
│ Count :- ${d.count}
│ Remaining :- ${remains}
┗•─────────────────❏`
        await message.reply(warnmsg)
        if (remains <= 0) {
            const d = await ResetWarn(message.reply_message.sender, message.from,  message.client.user.number)
            if(BotAdmin){
            await message.client.groupParticipantsUpdate(message.from, [message.quoted.sender], "remove");
            return await message.reply("_Max warns reached, kicked out!_")
            };
        };
    };
})
