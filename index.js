const Discord = require('discord.js')

var client = new Discord.Client()
var config_token = process.env.TOKEN
var config_prefix = process.env.PREFIX
var config_status = process.env.STATUS
var config_statustype = process.env.STATUSTYPE
var config_channel = process.env.CHANNEL

client.on('ready', () => {
    activity()
    setInterval(activity, 60000)
    console.log(`Online`)
})

function activity() {
    client.user.setActivity(config_status, {type: config_statustype})
}



var cmdmap = {
    ping : cmd_ping
}

function cmd_ping(msg, args) {
    var ping = Date.now() - msg.createdTimestamp + " ms`";
            msg.channel.send("Your ping is `" + ping);
            console.log('Worked')
}

client.on('message', (msg) => {


    var cont   = msg.content,
        member = msg.member,
        chan   = msg.channel,
        guild  = msg.guild,
        author = msg.author

        if (msg.channel.id == !config_channel) {return}

        if (author.id != client.user.id && cont.startsWith(config_prefix)) {

            
            // 
            var invoke = cont.split(' ')[0].substr(config_prefix.length),
                args   = cont.split(' ').slice(1)
            
            
            if (invoke in cmdmap) {
                cmdmap[invoke](msg, args)
            }
        }

})


client.login(config_token)