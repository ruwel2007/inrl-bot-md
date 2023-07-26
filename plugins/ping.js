const {inrl} = require('../lib');

inrl({
    pattern: 'ping ?(.*)',
    desc: 'To check ping',
    react: "💯",
    type: 'info'
}, async (message, match) => {
    const start = new Date().getTime()
    const {key} = await message.reply('Ping!')
    const end = new Date().getTime()
    return await message.editMessage(message.from,'*⚡PONG!* ' + (end - start) + ' ms', key);
});
