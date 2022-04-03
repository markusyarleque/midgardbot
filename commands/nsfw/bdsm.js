const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'bdsm',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var bdsm = [

            'http://ist3-2.filesor.com/pimpandhost.com/1/3/5/5/135549/2/B/D/m/2BDm3/511cb2fba34af.gif',
            'https://xgifer.com/content/2021/04/bdsm_001.gif',
            'http://i0.wp.com/spankgifs.com/wp-content/uploads/2014/05/tumblr_n4zpwtQilA1twkohpo1_500.gif',
            'https://img-9.poringa.net/poringa/img/8/4/F/9/8/8/Marcelomorboso/750.gif',
            'https://myteenwebcam.com/fapp/gifs/c61e6c888c0968b1a7da6a9df7aaff87.gif',
            'https://cdn5-images.motherlessmedia.com/images/63AF2F2.gif',
            'https://pics.eldersfaces.com/gifs/bdsm/bdsm-6408.gif',
            'https://pics.nonameporn.com/gifs/bdsm/bdsm-5889.gif',
            'https://pics.nonameporn.com/gifs/bdsm/bdsm-6372.gif',
            'https://xgifer.com/content/2021/05/bdsm_001-2.gif',
            'https://vayagifporno.com/wp-content/uploads/2016/04/13-1.gif',
            'http://blowjobgif.net/albums/2018/12/16/21/1/eye-contact.gif',
            'https://img-9.poringa.net/poringa/img/2/6/4/9/0/2/Marcelomorboso/8FB.gif',
            'https://pics.nonameporn.com/gifs/bdsm/bdsm-6189.gif',
            'https://thumb-p0.xhcdn.com/a/ue4bi65ppOkcoUouO2B1pw/000/306/861/570_450.gif',
            'https://pics.eldersfaces.com/gifs/bdsm/bdsm-6570.gif',
            'https://www.tudelicias.net/wp-content/uploads/2014/03/511fe270ef32e.gif',
            'https://dl.phncdn.com/gif/18594961.gif',
            'https://dl.phncdn.com/gif/19589081.gif',
            'https://pics.realelders.com/gifs/bdsm/bdsm-6440.gif',
            'https://spankgifs.com/wp-content/uploads/2014/05/BDSM-Gif-Exceed-beliefs.gif',
            'https://i2.wp.com/amateurinaction.com/wp-content/uploads/2013/01/photo-Bondage-Fetish-Hardcore-Rough-Sex-GIF-165718852.gif',
            'https://pics.omgmov.com/gifs/bdsm/bdsm-6717.gif',
            'https://pics.xhomemadeporn.com/gifs/bdsm/bdsm-6769.gif',
            'https://img.xxx/fotos/2021/03/23/mW42za.gif',
            'https://pics.nonameporn.com/gifs/bdsm/bdsm-6075.gif',
            'https://pics.nonameporn.com/gifs/bdsm/bdsm-6371.gif',
            'https://img-9.poringa.net/poringa/img/6/8/C/F/2/4/semental68/571.gif',
            'https://pics.eldersfaces.com/gifs/bdsm/bdsm-5987.gif',
            'https://pics.omgmov.com/gifs/bdsm/bdsm-6260.gif',
            'https://pics.wankerson.com/gifs/bdsm/bdsm-6769.gif',
            'https://pics.maturenudism.com/gifs/bdsm/bdsm-6445.gif',
            'https://pics.amateurelders.com/gifs/bdsm/bdsm-6219.gif',
            'https://pics.nonameporn.com/gifs/bdsm/bdsm-6047.gif',
            'https://pics.oldnudism.com/gifs/bdsm/bdsm-5792.gif',
            'https://pics.realelders.com/gifs/bdsm/bdsm-6816.gif',
            'https://pics.jackoffson.com/gifs/bdsm/bdsm-6183.gif',
            'https://cdn5-images.motherlessmedia.com/images/C7903A0.gif',
            'https://pics.realelders.com/gifs/bdsm/bdsm-6350.gif',
            'https://pics.realelders.com/gifs/bdsm/bdsm-6350.gif',
            'https://pics.amateurelders.com/gifs/bdsm/bdsm-6524.gif',
            'https://pics.gramateurs.com/gifs/bdsm/bdsm-6134.gif',
            'https://thumb-p6.xhcdn.com/a/7TFqO-ESx_15KY34ejKrDw/000/413/960/636_1000.gif',
            'https://www.wetsins.com/media/galleries/5d67bc806d102/thumbs/302_1000.gif',
            'https://pics.maturator.com/gifs/bdsm/bdsm-5944.gif',
            'https://pics.wankerson.com/gifs/bdsm/bdsm-6282.gif',
            'https://pics.amamilf.com/gifs/bdsm/bdsm-6536.gif',
            'https://pics.jackoffson.com/gifs/bdsm/bdsm-6196.gif',
            'https://pics.jerkoffer.com/gifs/lesbian-bdsm/lesbian-bdsm-31757.gif',
            'https://pics.maturator.com/gifs/bdsm/bdsm-6053.gif',

        ]
  
        if(!message.channel.nsfw){
          
            return message.reply({embeds: [
  
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936524707677741086/prohibido.gif?width=318&height=149')
                .setColor('RED')
                .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>`)
  
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        } else {

            try {
                
                let userData = await userSchema.findOne({idusuario: message.author.id})

                if(!userData){

                    let user = await userSchema.create({

                        idusuario: message.author.id,
                        username: message.author.username,

                    })
    
                    user.save();
                    console.log('Usuario Registrado ===> Id: '+ message.author.id + ' Username: ' + message.author.username)

                }

                if (userData.vip === false) return message.reply({ embeds: [
                            
                    new Discord.MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('RED')
                    .setDescription(`<a:Verify2:931463492677017650> | Comando VIP!`)
        
                ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    

            } catch (error) {

                console.log('Error al Buscar Usuario en Comando BDSM: '+ error)
                
            }
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdonbdsm = bdsm[Math.floor(Math.random()*bdsm.length)]
            let desc 
    
            while (!ramdonbdsm || ramdonbdsm === null || ramdonbdsm === '' || ramdonbdsm === undefined) {
                
                ramdonbdsm = bdsm[Math.floor(Math.random()*bdsm.length)]
                
            }

            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le gusta rudo y salvage <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** está dominando a **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot VIP 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonbdsm)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}