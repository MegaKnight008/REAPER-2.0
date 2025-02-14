const Discord = module.require("discord.js")
const joinModel = require("../../database/guildData/welcome");

module.exports = {
  name: "joinchannel",
  description: "Change the welcome channel per server!",
  aliases: ["jchannel", "welcome"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You dont have enough Permissions!")
    }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("I Don't have the `Manage Channels` Permission, required for setting up the channel!")
    }
    if (!args[0]) {
      return message.channel.send(`\`Usage: ${message.client.prefix}joinchannel <#channel|off>\``)
    }
    if (message.mentions.channels.first()) {
    const data = await joinModel.findOne({
      GuildID: message.guild.id
    });

    if (data) {
      await joinModel.findOneAndRemove({
        GuildID: message.guild.id
      });

      message.channel.send(`Join Channel set to ${message.mentions.channels.first()}`);

      let newData = new joinModel({
        Welcome: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Join Channel set to ${message.mentions.channels.first()}`);

      let newData = new joinModel({
        Welcome: message.mentions.channels.first().id,
        GuildID: message.guild.id
      });
      newData.save();
    }
  } else if (args[0] === "off") {
      const data2 = await joinModel.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await joinModel.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`Join channel has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`Join channel isn't setup!`)
      }
    }
  }
}
