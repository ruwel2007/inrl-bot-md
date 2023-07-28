//created by @inrl

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
if(match && match == "reset" && message.quoted.sender){
        const u = message.quoted.sender;
        const g = message.from;
        const t = match || "reset";
        const d = await ResetWarn(u, g, t, message.client.user.number)
        return await message.reply(`_successfull_`);
        }
        const BotAdmin = await isBotAdmin(message, message.client);
        const admin = await isAdmin(message, message.client);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
    let {
        WARNCOUND
    } = data
    if (message.quoted.sender) {
        const u = message.quoted.sender;
        const g = message.from;
        const t = match || "warning";
        const d = await setWarn(u, g, t,message.client.user.number)
        let count = d.count,
            COUND = WARNCOUND;
        let remains = COUND - count;
        let warnmsg = `❏─────[ ᴡᴀʀɴɪɴɢ ]─────❏
│ Group:-${d.group}
│ User :-${d.user}
❏───────────────────❏
┏─────── INFO ───────❏
│ Reason :- ${d.reason}
│ Count :- ${d.count}
│ Remaining :- ${remains}
┗•──────────────────❏`
        await message.reply(warnmsg)
        if (remains <= "0") {
            const u = message.quoted.sender;
            const g = message.from;
            const t = match || "reset";
            const d = await ResetWarn(u, g, t, message.client.user.number)
            if(BotAdmin){
            await message.client.groupParticipantsUpdate(message.from, [message.quoted.sender], "remove");
            return await message.reply("_user removes from the group due to warn limit existence_")
            };
        };
    };
})
