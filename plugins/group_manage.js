const {
    inrl,
    isAdmin,
    isBotAdmin,
    add_Schedule,
    getPdm,
    setpdm,
    removePdm,
    getAntiLink,
    setAntiLink,
    removeAntiLink,
    GetWords,
    setAntiWord,
    GetFake,
    setFakeNum,
    removeAFake,
    removeWord,
    getAutomutes,
    dlt_Schedule,
    getAutoUnMutes,
    getListofFake,
    getListOfWord
} = require('../lib');

inrl({
    pattern: 'amute',
    desc: 'auto mute groups',
    react : "🙃",
    type: "manage",
    onlyGroup: true
}, async (message, match, {AUTOMUTE_MSG}) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match.match(':')) return message.reply('_need time (example :- 23:59)_')
    let [hr, mn] = match.split(':');
    if (hr.length == 1) hr = '0' + hr;
    if (mn.length == 1) mn = '0' + mn;
    if (isNaN(hr) || isNaN(mn)) return message.reply('_need number_\n _Example:  automute 22:22_');
    await add_Schedule(message.jid, `${hr}:${mn}`, 'mute', message.client.user.number)
    let ast = hr > 12 ? `${hr-12}:${mn}PM` : `${hr}:${mn}AM`;
    ast = AUTOMUTE_MSG.replace('@time', ast).replace('{}', ast);
    return message.reply(ast)
});
inrl({
    pattern: 'aunmute',
    desc: 'unmute a group',
    react : "😣",
    type: "manage",
    onlyGroup: true
}, async (message, match, {AUTOUNMUTE_MSG}) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match.match(':')) return message.reply('need time (example :- 23:59)')
    let [hr, mn] = match.split(':')
    if (hr.length == 1) hr = '0' + hr;
    if (mn.length == 1) mn = '0' + mn;
    if (isNaN(hr) || isNaN(mn)) return message.reply('*need number*\nExample:  autounmute 22:22');
    await add_Schedule(message.jid, `${hr}:${mn}`, 'unmute',message.client.user.number)
    let ast = hr > 12 ? `${hr-12}:${mn}PM` : `${hr}:${mn}AM`;
    ast = AUTOUNMUTE_MSG.replace('@time', ast).replace('{}', ast);
    return message.reply(ast)
})
inrl({
    pattern: 'pdm',
    desc: ' set pdm, antilink, fake number, badwords',
    react : "😁",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('*_need action!_*\n*_Example:  pdm on/off_*');
    if (match != 'on' && match != 'off') return message.reply('*give me a proper action?*\n*_Example:  pdm on_');
    if (match == "on") {
        let isPdmInDb = await getPdm(message.jid, message.client.user.number)
        if (isPdmInDb == "true") return message.reply('*_already activated!_*');
        await setpdm(message.jid, message.client.user.number)
        return await message.reply('*_pdm activated!_*')
    } else if (match == "off") {
        let isPdmInDb = await getPdm(message.jid, message.client.user.number)
        if (isPdmInDb == "false") return message.reply('*_already deactivated!_*');
        await removePdm(message.jid, message.client.user.number)
        return await message.reply('*_pdm deactivated!_*')
    }
});
inrl({
    pattern: 'antilink',
    desc: ' set pdm, antilink, fake number, badwords',
    react : "🖕",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('*_need action!_*\nExample: _antilink on/off_');
    if (match != 'on' && match != 'off') return message.reply('*give me a proper action?*\n_Example:  antilink on_');
    if (match == "on") {
        let isInDb = await getAntiLink(message.jid, message.client.user.number);
        if (isInDb == "true") return message.reply('_already activated!_');
        await setAntiLink(message.jid, message.client.user.number)
        return await message.reply('_successfully set antilink on thi group_')
    } else if (match == "off") {
        let isInDb = await getAntiLink(message.jid, message.client.user.number);
        if (isInDb == "false") return message.reply('_already deactivated!_');
        await removeAntiLink(message.jid, message.client.user.number)
        return await message.reply('_successfully removed antilink from this group_')
    }
});
inrl({
    pattern: 'antiword',
    desc: ' set pdm, antilink, fake number, badwords',
    react : "🖕",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('_need word?!_\nExample: ```antiword idk```')
    let data = await GetWords(message.jid, message.client.user.number);
    if (data = "no data") {
        await setAntiWord(message.jid, match, message.client.user.number);
        return await message.reply('_success_');
    } else if (!data.includes(match)) {
        await setAntiWord(message.jid, match, message.client.user.number);
        return await message.reply('_success!_');
    } else {
        return await message.reply('_given word already set as antiword_');
    }
});
inrl({
    pattern: 'antifake',
    desc: ' set pdm, antilink, fake number, badwords',
    react : "🖕",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    let BotAdmin = await isBotAdmin(message);
    if (!BotAdmin) return await message.reply('*_Bot must Be Admin_*');
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return await message.reply('_give me the starting of fake Number_\nExample:91\nantifake 94');
    match = match.replace(/[^0-9]/g, "");
    if (!match) return message.reply('*need Number!*');
    let data = await GetFake(message.jid, message.client.user.number);
    if (data == "no data" || !data) {
        await setFakeNum(message.jid, match, message.client.user.number);
        return await message.reply('_*successfully set fake number!*_');
    } else if (!data.includes(match)) {
        await setFakeNum(message.jid, match, message.client.user.number);
        return await message.reply('*successfully set fake number!*');
    } else {
        return await message.reply('_given number already set as antifake_');
    }
});
inrl({
    pattern: 'delfake',
    desc: 'remove fake number',
    react : "🤥",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('need starting value  of fake number?!')
    if (isNaN(match)) return message.reply('*_enter a valid data!_*\n_need Number!_');
    let data = await GetFake(message.jid, message.client.user.number);
    if (data == "no data" || !data) return await message.reply('*_you not set any fake number_*\n*getfake* _to get fake number_\n*getfake all* _to get list of fake number_');
    if (!data.includes(match)) return await message.reply('*_you not set this number as fake _*\n*getfake* _to get fake number_\n*getfake all* _to get list of fake number_');
    await removeAFake(message.jid, match, message.client.user.number)
    return await message.reply('*success*');
});
inrl({
    pattern: 'delword',
    desc: 'remove word',
    react : "🤦🏿‍♂️",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('give me a word?!')
    let data = await GetWords(message.jid, message.client.user.number);
    if (data == "no data") return await message.reply('*_Failed_*');
    if (!data.includes(match)) return await message.reply('*_Not Found_*\n_Example : getword_\n_getword all_');
    await removeWord(message.jid, match, message.client.user.number)
    return message.reply('*_successfull_*');
});
inrl({
    pattern: 'delmute',
    desc: 'remove word',
    react : "🤥",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('give me a time?!\nExample: delmute 22:15 for 10:15 PM')
    if (!match.includes(':')) return await message.reply('give me a time?!\nExample: delmute 10:15 for 10:15 AM')
    let [hr, mn] = match.replaceAll(' ', '').split(':');
    if (!hr || !mn) return await message.reply('```give me a time as hr and minute?!```\n_Example: delmute 14:15 for 02:15 PM_');
    if (hr.length < 2) hr = '0' + hr;
    if (mn.length < 2) hr = '0' + mn;
    if (isNaN(hr) || isNaN(mn)) return await message.reply('need time in number format');
    let data = await getAutomutes(message.client.user.number);
    if (data == "no data") return await message.reply('*_Not Found_*\n*amute* 22:22  for 10:22PM');
    let avb = false
    await data.map(async ({
        jid,
        time
    }) => {
        if (!jid.match(message.jid)) return;
        if (!time) return await message.reply('*Not Found*\n*amute* 22:22  for 10:22PM');
        if (time == `${hr}:${mn}`) {
            avb = true;
            await dlt_Schedule(message.jid, `${hr}:${mn}`, 'mute', message.client.user.number);
            return await message.reply('*successfull*')
        }
    });
    if (!avb) return await message.reply('_you not set any action for given time_')
});
inrl({
    pattern: 'delunmute',
    desc: 'remove word',
    react : "🥱",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match) return message.reply('*_give me a time?!_*\n_Example: delunmute 22:15 for 10:15 PM_')
    if (!match.includes(':')) return await message.reply('give me a time?!\nExample: delunmute 10:15 for 10:15 AM')
    let [hr, mn] = match.replaceAll(' ', '').split(':');
    if (!hr || !mn) return await message.reply('*_give me a time as hr and minute?!_*\n_Example: delunmute 14:15 for 02:15 PM_');
    if (hr.length < 2) hr = '0' + hr;
    if (mn.length < 2) hr = '0' + mn;
    if (isNaN(hr) || isNaN(mn)) return await message.reply('*_need time in number format_*');
    let data = await getAutoUnMutes(message.client.user.number);
    if (data == "no data") return await message.reply('*_you not set any time as aunmute try *aunmute* 22:22  for 10:22PM*_');
    let avb = false
    await data.map(async ({
        jid,
        time
    }) => {
        if (!jid.match(message.jid)) return;
        if (!time) return await message.reply('*_not set any auto unmute time in this group try_*\n*aunmute* 22:22  for 10:22PM');
        if (time == `${hr}:${mn}`) {
            avb = false
            await dlt_Schedule(message.jid, `${hr}:${mn}`, 'unmute',message.client.user.number);
            return await message.reply('*_successfull_*')
        }
    });
    if (!avb) return await message.reply('*_you not set any action for given time_*')
});
inrl({
    pattern: "getfake",
    desc: 'get datas of, fake number',
    react : "🥲",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (!match.includes('all') && match) return await message.reply("*_Not Found_*\n*getfake all*\n*getfake*");
    if (match == "all") {
        let T_X_T = "*result for all group*\n\n";
        let data = await getListofFake(message.client.user.number);
        if (!data || data == "no data") return await message.reply("*_no data_*");
        await data.map(async ({
            id,
            data,
            jid
        }) => {
            if (id == message.client.user.number) {
                T_X_T += `number: ${data} \njid : ${jid}\n\n`
            } else T_X_T = "no data"
        });
        return await message.reply(T_X_T);
    } else {
        let data = await GetFake(message.jid, message.client.user.number)
        if(!data) return await message.reply("*_no data_*");
        return await message.reply("```"+data+"```");
    } 
});
inrl({
    pattern: "getword",
    desc: 'get datas of, fake number',
    react : "🤪",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (match.includes('all') && match) return await message.reply("*_Not Found_*\n*Example:* _*getword all*_");
    if (match == "all") {
        let T_X_T = "*_result for all group_*\n\n";
        let data = await getListOfWord(message.client.user.number);
        if (!data || data == "no data") return await message.reply("no data");
        await data.map(async ({
            id,
            data,
            jid
        }) => {
            if (id == message.client.user.number) {
                T_X_T += `word: ${data} \njid : ${jid}\n\n`
            } else T_X_T = "no data"
        });
        return await message.reply(T_X_T);
    } else {
        let data = await GetWords(message.jid, message.client.user.number);
        if(!data) return await message.reply("*_no data_*");
        return await message.reply("_"+data+"_");
    }
});
inrl({
    pattern: "getmute",
    desc: 'get datas of, fake number',
    react : "🤯",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (match.includes('all') && match) return await message.reply("*_Not Found_*\n*Example:* _*getmute all*_");
    if (match == "all") {
        let T_X_T = "*_result for all group_*\n\n";
        let data = await getAutomutes(message.client.user.number);
        if (!data || data == "no data") return await message.reply("*_no data_*");
        await data.map(({
            id,
            jid,
            time,
            action
        }) => {
            if (id == message.client.user.number) {
                T_X_T += `time : ${time}\naction: ${action} \njid : ${jid}\n\n`
            } else T_X_T = "no data"
        });
        return await message.reply(T_X_T);
    } else {
        let T_X_T = "*_result for all group_*\n\n";
        let data = await getAutomutes(message.client.user.number);
        if (!data || data == "no data") return await message.reply("*_no data_*");
        await data.map(({
            id,
            jid,
            time,
            action
        }) => {
            if (id == message.client.user.number && jid == message.jid) {
                T_X_T += `time : ${time}\naction : ${action} \n\n`
            } else T_X_T = "no data"
        })
        return await message.reply(T_X_T.replace("no data", ""));
    }
});
inrl({
    pattern: "getunmute",
    desc: 'get datas of',
    react : "🥵",
    type: "manage",
    onlyGroup: true
}, async (message, match) => {
    let admin = await isAdmin(message);
    if (!admin && !message.client.isCreator) return await message.reply('*_request failed with statuscode 403_*');
    if (match.includes('all') && match) return await message.reply("*_Not Found_*\n*Example:* _*getunmute all*_");
    if (match == "all") {
        let T_X_T = "*_result for all group_*\n\n";
        let data = await getAutoUnMutes(message.client.user.number);
        if (!data || data == "no data") return await message.reply("*_no data_*");
        await data.map(async ({
            id,
            jid,
            time,
            action
        }) => {
            if (id == message.client.user.number) {
                T_X_T += `time : ${time}\naction: ${action} \njid : ${jid}\n\n`
            } else T_X_T = "no data"
        });
        return await message.reply(T_X_T);
    } else  {
        let T_X_T = "*_result for all group_*\n\n";
        let data = await getAutoUnMutes(message.client.user.number);
        if (!data || data == "no data") return await message.reply("no data");
        await data.map(({
            id,
            jid,
            time,
            action
        }) => {
            if (id == message.client.user.number && jid == message.jid) {
                T_X_T += `time : ${time}\naction : ${action} \n\n`
            } else T_X_T = "no data"
        })
        return await message.reply(T_X_T);
    } 
});
