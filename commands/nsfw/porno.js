const NSFW = require('discord-nsfw');
const nsfw3 = new NSFW();

module.exports =  {
    
    name: 'porno',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        if(!message.channel.nsfw){
          
            return message.reply({embeds: [
  
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936524707677741086/prohibido.gif?width=318&height=149')
                .setColor('RED')
                .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>`)
  
            ]})
        
        } else {
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let desc 
            const image = await nsfw3.pgif();
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `Señoraaaa!!! su hijo **${message.author.username}** está viendo nopor <a:run:880304386826465300>`
          
            } else {
      
                desc = `**${message.author.username}** está viendo nopor con **${img.user.username}** <a:run:880304386826465300>`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor(`🔞 | Midgard's Hot 🔥`,message.guild.iconURL({ dynamic: true }))
            .setDescription(desc)
            .setImage(image)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });
      
        } 
      
    }
  
}