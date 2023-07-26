const {
    inrl,
    runtime,
    add_plugin,
    dlt_plugin,
    getListOfPlugin,
    getVar,
    withValue
} = require("../lib")
const {
    exec
} = require("child_process");
const Config = require('../config')
const axios = require("axios");
const fs = require("fs");

inrl({
    pattern: '^restart',
    desc: 'to restart bot',
    sucReact: "😛",
    category: ["system", "all"],
    type: "system",
    fromMe: true
}, async (message, match) => {
    await message.reply('Restarting please await few second°s')
    exec('pm2 restart all')
})
inrl({
    pattern: 'install',
    desc: 'to install externel Plugin ',
    sucReact: "😛",
    category: ["system", "all"],
    type: "system",
    fromMe: true
}, async (message, match) => {
    match = message.reply_message.text|| match;
    if (!match) return await message.send("_*need gist Url!*_");
    const urll = extractUrlsFromString(match);
    if(!urll[0]) return message.send('_Error, try again!_')
    let NewUrl = !match?.toString().includes('/raw') ? match.toString() + '/raw' : match.toString()
    await message.reply("wait a minut!")
    let plugin_name;
    let {
        data,
        status
    } = await axios(NewUrl).catch((e) => {
        return message.reply('not a valid url!')
    })
    if (status == 200) {
        plugin_name = data.match(/(?<=pattern:) ["'](.*?)["']/);
        plugin_name = plugin_name[0].replace(/["']/g, "").trim().split(" ")[0] + "test";
        fs.writeFileSync(__dirname + "/" + plugin_name + ".js", data);
        try {
            require("./" + plugin_name);
        } catch (e) {
            fs.unlinkSync(__dirname + "/" + plugin_name + ".js");
            return await message.reply(e);
        }
        await message.reply("newly installed plugin are " + plugin_name.split('test')[0])
        await add_plugin(plugin_name.split('test')[0], url)
        fs.unlinkSync(__dirname + "/" + plugin_name + ".js");
    }
});
inrl({
    pattern: 'plugins',
    desc: 'to get all externel Plugin ',
    sucReact: "😛",
    category: ["system", "all"],
    type: "system",
    fromMe: true
}, async (message, match) => {
    let text = "",
        name, urls;
    if (!match) {
        let list = await getListOfPlugin(message.client.user.id.split('@')[0]);
        if (list == 'no data') return await message.reply('*_externel plugins db is empty!_*')
        for (let i = 0; i < list.length; i++) {
            name = list[i].name;
            urls = list[i].url;
            text += name + "\n" + urls + "\n";
        }
        if (text) {
            return await message.reply(text)
        } else {
            return await message.send('*_no externel plugins!_*')
        }
    }
})

inrl({
    pattern: 'remove',
    desc: 'to remove externel Plugin ',
    sucReact: "🐽",
    category: ["system", "all"],
    type: "system",
    fromMe: true
}, async (message, match) => {
    if (!match) return;
    match = match.trim();
    let list = await getListOfPlugin(message.client.user.id.split('@')[0]),
        name = "",
        avb = false;
    if (list == 'no data') return message.reply('_externel plugins db is empty!_')
    for (let i = 0; i < list.length; i++) {
        name = list[i].name;
        if (name == match) {
            await dlt_plugin(match)
            return await message.send("_plugin removed successfully!, type restart to remove plugin_");
        } else {
            avb = true;
        }
    }
    if (avb) return await message.reply("*_no such plugin in your PLUGINDB_*");
})
