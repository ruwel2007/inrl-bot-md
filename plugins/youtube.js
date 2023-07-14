//created by @inrl
const yt = require('inrl-bot-md');
const fs = require('fs');

const {
    inrl,
    sleep,
    extractUrlsFromString,
    GenListMessage,
    ytmp3,
    ytmp4
} = require('../lib/');
const {
    BASE_URL
} = require('../config');

inrl({
    pattern: 'song',
    type: "downloader"
}, async (m) => {
try {
    const match = m.client.text;
    if(!match) return await m.send("*_give me url or quarry_*");
    const  url = await extractUrlsFromString(match);
    if(!url[0]){
    const result = await yt.search(match);
    if(!result) return await m.send('_not found_');
    let msg ="YT SONG DOWNLOADER",arr=[];
    await result.map(r=>arr.push(r.title));
    return await m.send(GenListMessage(msg, arr));
   } else {
    return await ytmp3(m,url[0]);
   }
   } catch(e){
   return m.send('_Time Out_ '+e);
   }
});

inrl({
    pattern: 'video',
    type: "downloader"
}, async (m) => {
try {
    const match = m.client.text;
    if(!match) return await m.send("*_give me url or quarry_*");
    const  url = await extractUrlsFromString(match);
    if(!url[0]){
    const result = await yt.search(match);
    if(!result) return await m.send('_not found_');
    let msg ="YT VIDEO DOWNLOADER", arr=[];
    await result.map(r=>arr.push(r.title));
    return await m.send(GenListMessage(msg, arr));
   } else {
   return await ytmp4(m,url[0]);
   }
   } catch(e){
   return m.send('_Time Out_'+e);
   }
});
inrl({
    pattern: 'ytdl',
    type: "downloader",
    on : "text"
}, async (m, conn, match) => {
if(!m.quoted || !m.quoted.fromMe) return;
try {
if(m.client.body.includes("YT VIDEO DOWNLOADER")){
match = m.client.body.replace("YT VIDEO DOWNLOADER","").trim();
await m.send(`*_downloading_*\n*_${match}_*`);
const result = await yt.search(match);
return await ytmp4(m,result[0].url);
} else if(m.client.body.includes("YT SONG DOWNLOADER")){
match = m.client.body.replace("YT SONG DOWNLOADER","").trim();
await m.send(`*_downloading_*\n${match}`);
const result = await yt.search(match);
return await ytmp3(m,result[0].url);
}
} catch(e){
console.log(e);
return await m.send('_Error, try again!_')
}});
