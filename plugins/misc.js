//created by @inrl
const {
    inrl,
    add,
    subtract,
    multiply,
    division,
    qrcode,
    base64e,
    base64d,
    age,
} = require('../lib/');

inrl({
    pattern: 'calc',
    desc: "to calculate by using bots",
    sucReact: "🤥",
    category: ["ibot"],
    type: 'info'
}, (async (message, match) => {
    if (match.includes('+')) {
        let split = match.split('+');
        let number2 = split[1];
        let number1 = split[0]
        let result = add(number1, number2)
        try {
            return await message.send(result);
        } catch (err) {
            return await message.send("*Failed*");
        }
    } else if (match.includes('-')) {
        let split = match.split('-'),
            inrlsub1 = split[1],
            inrlsub2 = split[0]
        let result = subtract(inrlsub2, inrlsub1)
        try {
            return await message.send(result);
        } catch (err) {
            return await message.send("*Failed*");
        }
    } else if (match.includes('×')) {
        let split = match.split('×'),
            inrlbotswa = split[1],
            inrl1 = split[0]
        let result = multiply(inrl1, inrlbotswa)
        try {
            return await message.send(result);
        } catch (err) {
            return await message.send("*Failed*");
        }
    } else if (match.includes('/')) {
        let split = match.split('/'),
            inrldiv1 = split[1],
            inrldiv2 = split[0]
        let result = division(inrldiv2, inrldiv1)
        try {
            return await message.send(result);
        } catch (err) {
            return await message.send("*Failed*");
        }
    }
}));
inrl({
    pattern: 'base64e',
    desc: "to convert ascii to base64",
    sucReact: "🤌",
    category: ['all'],
    type: 'converter'
}, (async (message, match) => {
    const text = match || message.quoted.text;
    if (!text) return await message.send("*_Enter A text to convert base64_*");
    let encodedString = base64e(text);
    return await message.send(encodedString);
}));
inrl({
    pattern: 'base64d',
    desc: "to convert base64 to ascii",
    sucReact: "🤥",
    category: ['all'],
    type: 'converter'
}, (async (message, match) => {
    const text = match || message.quoted.text;
    if (!text) return await message.send("_Enter A text to convert base64_");
    let decodedString = base64d(text);
    return await message.send(decodedString);
}));
inrl({
    pattern: 'qr',
    desc: "to convert text as qrcode",
    sucReact: "💗",
    category: ["all"],
    type: 'create'
}, async (message, match) => {
    if (!match) return await message.send("_*need Text*_");
    let text = match;
    let ttinullimage = qrcode(text);
    return await message.sendReply(ttinullimage,{},"image");
});
inrl({
    pattern: 'age',
    desc: "to convert text as qrcode",
    sucReact: "💗",
    category: ["all"],
    type: 'info'
}, async (message, match) => {
    if (!match) return await message.send("*_enter your date of birth \n_ex_:year/month/day_*");
    let text = match;
    let year, month, day;
    if (text.includes('/')) {
        let split = text.split('/');
        year = split[0];
        month = split[1];
        day = split[2];
    }
    let ageOfYou = age(new Date(year, month, day));
    return await message.send(ageOfYou);
});
