//https://github.com/fasweeh-fazzz/faz/blob/master/plugins/updater.js
const simpleGit = require('simple-git');
const git = simpleGit();
const Config = require('../config');
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const axios = require("axios");
const {
    PassThrough
} = require('stream');
const heroku = new Heroku({
    token: process.env.HEROKU_API_KEY
})
//function used
function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
const {
    inrl,
    GenListMessage
} = require('../lib');
inrl({
    pattern: 'update$',
    fromMe: true
}, (async (m) => {
    try {
        if (!m.client.text) {
            return await m.sock.sendMessage(m.from, {
                text: GenListMessage("check update", ["update now", "update check"])
            })
        } else if (m.client.text.includes('now')) {
            await git.fetch();
            let commits = await git.log(['master' + '..origin/' + 'master']);
            if (commits.total === 0) {
                return await m.sock.sendMessage(m.from, {
                    text: "*_already up-to-date_*"
                });
            } else {
                await m.send("_*updating...*_");
                let al
                try {
                    await heroku.get('/apps/' + process.env.HEROKU_APP_NAME)
                } catch {
                    return await m.send('*_status_* : ```false```\n*_reason_* : ```invalid information from heroku```');
                }
                git.fetch('upstream', 'master');
                git.reset('hard', ['FETCH_HEAD']);
                const app = await heroku.get('/apps/' + process.env.HEROKU_APP_NAME)
                const git_url = app.git_url.replace("https://", "https://api:" + process.env.HEROKU_API_KEY + "@")
                try {
                    await git.addRemote('heroku', git_url);
                } catch (e) {
                    console.log(e)
                }
                await git.push('heroku', 'master');
                return await m.send("successfully updated");
            }
        } else if (m.client.text.includes('check')) {
            await git.fetch();
            let commits = await git.log(['master' + '..origin/' + 'master']);
            if (commits.total === 0) {
                return await m.sock.sendMessage(m.from, {
                    text: "*_already up-to-date_*"
                });
            } else {
                let inrlupdate = "*available updates*\n\n";
                commits['all'].map(
                    (commit) => {
                        inrlupdate += "```" + `time: ${commit.date.substring(0, 10)}\nupdate: ${commit.message}\nupdated by :${commit.author_name}` + "```\n\n";
                    });
                return await m.send(inrlupdate);
            }
        }
    } catch (e) {
        return await m.send(e)
    }
}));
inrl({
    pattern: 'dyno$',
    fromMe: true,
    dontAddCommandList: true,
    use: 'owner'
}, (async (message) => {
    if (!process.env.HEROKU_API_KEY) return await message.send("_This is a heroku command, but this bot is not running on heroku!_");
    heroku.get('/account').then(async (account) => {
        url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
        headers = {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
            "Authorization": "Bearer " + process.env.HEROKU_API_KEY,
            "Accept": "application/vnd.heroku+json; version=3.account-quotas",
        }
        await axios(url, {
            headers: headers
        }).then(async (res) => {
            const resp = res.data;
            total_quota = Math.floor(resp.account_quota);
            quota_used = Math.floor(resp.quota_used);
            percentage = Math.round((quota_used / total_quota) * 100);
            remaining = total_quota - quota_used;
            await message.send("_Total:_ ```" + secondsToDhms(total_quota).trim() + "```\n" + "_Used:_ ```" + (secondsToDhms(quota_used) || "Not Found") + "```\n" + "_Percent:_ ```" + (percentage || "Not Found") + "```\n" + "_Remaining:_ ```" + (secondsToDhms(remaining).trim() || "NotFound") + "```")
        }).catch(async (err) => {
            await message.send(err.message)
        });
    });
}));
inrl({
    pattern: 'shutdown$',
    fromMe: true,
    dontAddCommandList: true,
    use: 'owner'
}, (async (message) => {
    if (!process.env.HEROKU_API_KEY) {
        return await pm2.stop("inrl");
    } else if (process.env.HEROKU_API_KEY) {
        await heroku.get('/apps/' + process.env.HEROKU_APP_NAME + '/formation').then(async (formation) => {
            forID = formation[0].id;
            await message.send("_Shutting down_")
            await heroku.patch('/apps/' + process.env.HEROKU_APP_NAME + '/formation/' + forID, {
                body: {
                    quantity: 0
                }
            });
        }).catch(async (err) => {
            await message.send(err.message)
        });
    } else return await message.send("_This is a heroku command, but this bot is not running on heroku!_");
}));
