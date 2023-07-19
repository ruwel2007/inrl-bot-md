const {inrl} = require('../lib');

inrl({
    pattern: 'ping ?(.*)',
    desc: 'To check ping',
    sucReact: "💯",
    category: ["system", "all"],
    type: 'info'
}, async (message, client) => {
    const start = new Date().getTime()
    const {key} = await message.reply('Ping!')
    const end = new Date().getTime()
    return await message.editMessage(message.from,'*⚡PONG!* ' + (end - start) + ' ms', key);
});
