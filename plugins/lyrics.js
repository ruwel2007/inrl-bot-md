//result from musixmatcH 
const {
    inrl,
    fetchJson 
} = require('../lib/');
const {
    BASE_URL
} = require('../config');

inrl({
    pattern: 'lyrics',
    desc: 'its give lyrics for query',
    type: "search"
}, async (m) => {
try {
    if(!m.client.text) return await m.send("*_Need query!_*");
    const res = await fetchJson(BASE_URL+'api/lyrics?text='+m.client.text);
    if(!res.status) return m.send("_Not Found_");
    if(!res.result) return m.send("_Error, try again!_");
    const { thumb,lyrics,title,artist } = res.result, tbl= "```", tcl ="*_", tdl = "_*";
        const msg = `*artist:* ${tcl}${artist}${tdl}\n*title:* ${tcl}${title}${tdl}\n\n${tbl}${lyrics}${tbl}`;
        return await m.sock.sendMessage(m.from, {
            image: {url : thumb},
            caption :msg
        }, {
            quoted: m
        })
    } catch (e) {
   return await m.send("*_Failed_*");
   }
});
