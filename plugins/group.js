const {
    inrl,
    isAdmin,
    isBotAdmin,
    errorMessage,
    getString,
    infoMessage,
} = require('../lib');
const axios = require("axios");
const fs = require('fs');
async function isBotAdminV1(m, conn, jid) {
    const groupMetadata = await conn.groupMetadata(jid).catch(e => {}),
        participants = await groupMetadata.participants,
        admins = await participants.filter(v => v.admin !== null).map(v => v.id);
    return admins.includes(conn.user.jid)
};

inrl({
    pattern: "promote",
    usage: '<mentions|reply>',
    react : "😎",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        let admin = await isAdmin(message);
        let BotAdmin = await isBotAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if (!message.quoted.sender) return message.reply('*_reply to a user_*');
        await message.client.groupParticipantsUpdate(message.jid,
            [message.quoted.sender], "promote");
        message.client.sendMessage(message.jid, {
            text: `@${message.quoted.sender.split('@')[0]} Promoted As admin.`,
            mentions: [message.quoted.sender]
        }, {
            quoted: message,
        });
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "demote",
    usage: '<mentions|reply>',
    react : "🤐",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    try {
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if (!message.quoted.sender) return message.reply('*_reply to a user_*');
        await message.client.groupParticipantsUpdate(message.jid,
            [message.quoted.sender], "demote");
        return await message.client.sendMessage(message.jid, {
            text: `@${message.quoted.sender.split('@')[0]} Demoted From admin.`,
            mentions: [message.quoted.sender]
        }, {
            quoted: message,
        });
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "kick",
    usage: '<mentions|reply>',
    react : "😤",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    try {
        if (!match) {
            if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
            if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
            if (!message.quoted.sender) return message.reply('*_reply to a user_*');
            await message.client.groupParticipantsUpdate(message.jid,
                [message.quoted.sender], "remove");
            return await message.client.sendMessage(message.jid, {
                text: `@${message.quoted.sender.split('@')[0]} kicked From The Group.`,
                mentions: [message.quoted.sender]
            }, {
                quoted: message,
            });
        } else if (match.toLowerCase() == 'all') {
            if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
            if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
            const groupMetadata = await message.client.groupMetadata(message.jid).catch(e => {})
            const participants = await groupMetadata.participants;
            let admins = await participants.filter(v => v.admin !== null).map(v => v.id);
            participants.filter((U) => !U.admin == true).map(({
                id
            }) => id).forEach(async (k) => {
               await sleep(250);
                await message.client.groupParticipantsUpdate(message.jid,
                    [k], "remove");
            });
            return await message.reply('_all group Participants will been kicked!_')
        }
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "add",
    usage: '<num1/numb2&etc>',
    react : "😋",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    const BotAdmin = await isBotAdmin(message);
    const admin = await isAdmin(message);
    match = message.reply_message.text || match;
    if(!match) return await message.reply('_*give me a number to add*_');
    match = match.replaceAll(' ', '');
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
    if (match) {
        let users = match.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        let info = await message.client.onWhatsApp(users);
        ex = info.map((jid) => jid.jid);
        if (!ex.includes(users)) return await message.reply("This number doesn't exists on whatsapp");
        const su = await message.client.groupParticipantsUpdate(message.jid,
            [users], "add");
        if (su[0].status == 403) {
            message.reply(`Couldn't Add Invite Send`);
            return await message.sendGroupInviteMessageRequst(users.replace('@s.whatsapp.net', ''));
        } else if (su[0].status == 408) {
            await message.client.sendMessage(message.jid, {
                text: `Couldn't add @${users.split('@')[0]} because they left the group recently. Try again later.`,
                mentions: [users]
            }, {
                quoted: message,
            });
            const code = await message.client.groupInviteCode(message.jid);
            return await message.client.sendMessage(users, {
                text: `https://chat.whatsapp.com/${code}`
            }, {
                quoted: message
            })
        } else if (su[0].status == 401) {
            await message.client.sendMessage(message.jid, {
                text: `Couldn't add @${users.split('@')[0]} because they blocked the bot number.`,
                mentions: [users]
            }, {
                quoted: message,
            });
        } else if (su[0].status == 200) {
            return await message.client.sendMessage(message.jid, {
                text: `@${users.split('@')[0]} Added To the group.`,
                mentions: [users]
            }, {
                quoted: message,
            });
        } else if (su[0].status == 409) {
            return await message.client.sendMessage(message.jid, {
                text: `@${users.split('@')[0]} Already in Group.`,
                mentions: [users]
            }, {
                quoted: message,
            });
        } else {
            return await message.reply(JSON.stringify(su));
        }
    } else if (message.quoted.sender) {
        let users = message.quoted.sender;
        const su = await message.client.groupParticipantsUpdate(message.jid,
            [users], "add");
        if (su[0].status == 403) {
            message.reply(`Couldn't Add Invite Send`);
            return await message.sendGroupInviteMessageRequst(users.replace('@s.whatsapp.net', ''));
        } else if (su[0].status == 408) {
            await message.client.sendMessage(message.jid, {
                text: `Couldn't add @${users.split('@')[0]} because they left the group recently. Try again later.`,
                mentions: [users]
            }, {
                quoted: message,
            });
            const code = await message.client.groupInviteCode(message.jid);
            return await message.client.sendMessage(users, {
                text: `https://chat.whatsapp.com/${code}`
            }, {
                quoted: message
            })
        } else if (su[0].status == 401) {
            await message.client.sendMessage(message.jid, {
                text: `Couldn't add @${users.split('@')[0]} because they blocked the bot number.`,
                mentions: [users]
            }, {
                quoted: message,
            });
        } else if (su[0].status == 200) {
            return await message.client.sendMessage(message.jid, {
                text: `@${users.split('@')[0]} Added To the group.`,
                mentions: [users]
            }, {
                quoted: message,
            });
        } else if (su[0].status == 409) {
            return await message.client.sendMessage(message.jid, {
                text: `@${users.split('@')[0]} Already in Group.`,
                mentions: [users]
            }, {
                quoted: message,
            });
        } else {
            return await message.reply(JSON.stringify(su));
        }
    }
});
inrl({
    pattern: "gpp",
    desc: 'set full size profile picture',
    react : "😁",
    category: ["all", "create"],
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if (!message.quoted.image) return await message.reply('*_reply to an image!_*');
        let _message = message.quoted.imageMessage;
        let download = await message.client.downloadMediaMessage(_message);
        await message.client.updateProfilePicture(message.jid, download);
        return message.reply('*_group icon updated!_*');
    } catch (e) {
        message.reply("*_Failed_*");
    }
})
inrl({
    pattern: "fullgpp",
    desc: 'set  profile picture of group with any resolution',
    react : "🔥",
    category: ["all", "create"],
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if (!message.quoted.image) return await message.reply('*_reply to an image!_*');
        let download = await message.quoted.download();
        await message.updateProfilePicture(message.jid, download);
        return message.reply('*_group icon updated!_*');
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "gname",
    usage: '<name>',
    react : "🙃",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if (message.client.text > 75) return await message.client.sendMessage(message.jid, {
            text: errorMessage('Text is too long')
        }, {
            quoted: message
        })
        let txt = message.client.text || " ";
        await message.client.groupUpdateSubject(message.jid, txt);
        return await message.client.sendMessage(message.jid, {
            text: '_group name changed successfully!_'
        }, {
            quoted: message
        })
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "gdesc",
    usage: '<desc>',
    react : "🙂",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        if (message.client.text > 400) return await message.client.sendMessage(message.jid, {
            text: 'Text is too long'
        }, {
            quoted: message
        })
        let txt = match || " ";
        await message.client.groupUpdateDescription(message.jid, txt);
        return await message.client.sendMessage(message.jid, {
            text: '_group name changed successfully!_'
        }, {
            quoted: message
        })
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "mute",
    react : "🤙",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    const BotAdmin = await isBotAdmin(message);
    const admin = await isAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
    try {
        await message.client.groupSettingUpdate(message.jid, "announcement");
        return await message.client.sendMessage(message.jid, {
            text: '_Group Closed_'
        }, {
            quoted: message
        });
    } catch (e) {
        return message.reply("*_Failed_*");;
    }
});
inrl({
    pattern: "unmute",
    react : "🤙",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    const BotAdmin = await isBotAdmin(message);
    const admin = await isAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
    try {
        await message.client.groupSettingUpdate(message.jid, "not_announcement");
        return await message.client.sendMessage(message.jid, {
            text: '_Group Opened!_'
        }, {
            quoted: message
        });
    } catch (e) {
        return message.reply("*_Failed_*");;
    }
});
inrl({
    pattern: "lock",
    react : "🤙",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    const BotAdmin = await isBotAdmin(message);
    const admin = await isAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
    try {
        await message.client.groupSettingUpdate(message.jid, "locked");
        return await message.client.sendMessage(message.jid, {
            text: '_Group Locked!_'
        }, {
            quoted: message
        });
    } catch (e) {
        return message.reply("*_Failed_*");;
    }
});
inrl({
    pattern: "unlock",
    react : "🤙",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    const BotAdmin = await isBotAdmin(message);
    const admin = await isAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
    try {
        await message.client.groupSettingUpdate(message.jid, "unlocked");
        return await message.client.sendMessage(message.jid, {
            text: '_Group Unlocked!_'
        }, {
            quoted: message
        });
    } catch (e) {
        return message.reply("*_Failed_*");;
    }
});
inrl({
    pattern: "left",
    react : "👋",
    type: 'group',
    onlyGroup: true,
    fromMe: true
}, async (message, match) => {
    try {
        await message.client.groupLeave(message.jid)
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "invite",
    react : "💖",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        const code = await message.client.groupInviteCode(message.jid);
        return await message.client.sendMessage(message.jid, {
            text: `🔗 Group Link: https://chat.whatsapp.com/${code}`
        }, {
            quoted: message
        });
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "revoke",
    react : "👌",
    type: 'group',
    onlyGroup: true
}, async (message, match) => {
    try {
        const BotAdmin = await isBotAdmin(message);
        const admin = await isAdmin(message);
        if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
        if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403*_');
        await message.client.groupRevokeInvite(message.jid);
        return await message.client.sendMessage(message.jid, {
            text: `*_Group link revoked._*`
        }, {
            quoted: message
        });
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "acpt",
    react : "🆗",
    type: 'owner',
    fromMe: true
}, async (message, match) => {
    try {
        if (!match || !match.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) return await message.reply('_*need a group url*_');
        let urlArray = (match).trim().split("/");
        if (!urlArray[2] == 'chat.whatsapp.com') return await message.client.sendMessage(message.jid, {
            text: '_Enter valid link_'
        }, {
            quoted: message
        });
        const response = await message.client.groupAcceptInvite(urlArray[3]);
        return await message.client.sendMessage(message.jid, {
            text: `Joined: ${response}`
        }, {
            quoted: message
        });
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "getinfo",
    react : "🆗",
    type: 'group'
}, async (message, match) => {
    try {
        if (!match || !match.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) return await message.reply('_need Url Of Group._');
        let urlArray = (match).trim().split("/")[3];
        const response = await message.client.groupGetInviteInfo(urlArray)
        return await message.client.sendMessage(message.jid, {
            text: "id: " + response.id + "\nsubject: " + response.subject + "\nowner: " + `${response.owner ? response.owner.split('@')[0] : 'unknown'}` + "\nsize: " + response.size + "\nrestrict: " + response.restrict + "\nannounce: " + response.announce + "\ncreation: " + require('moment-timezone')(response.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss') + "\ndesc" + response.desc
        }, {
            quoted: message
        });
    } catch (e) {
        message.reply("*_Failed_*");
    }
}); // this actul not a grp function but 😹
inrl({
    pattern: "pp",
    desc: 'set  profile picture of bot',
    react : "😁",
    category: ["all", "create"],
    type: 'owner',
    fromMe: true
}, async (message, match) => {
    try {
        if (!message.reply_message.image) return await message.reply('_*reply to an image!*_');
        let _message = message.quoted.imageMessage;
        let download = await message.client.downloadMediaMessage(_message);
        await message.client.updateProfilePicture(message.client.botNumber, download).catch((err) => fs.unlinkSync(download))
        return message.reply('profile picture updated!');
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
inrl({
    pattern: "fullpp",
    desc: 'set  profile picture of bot with any resolution',
    react : "🔥",
    category: ["all", "create"],
    type: 'owner',
    fromMe: true
}, async (message, match) => {
    try {
        if (!message.reply_message.image) return await message.reply('_*reply to an image!*_');
        let download = await message.quoted.download();
        await message.updateProfilePicture(message.client.user.id, download);
        return message.reply('profile picture updated!');
    } catch (e) {
        message.reply("*_Failed_*");
    }
});
