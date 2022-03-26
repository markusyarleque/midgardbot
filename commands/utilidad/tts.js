const discordTTS = require("discord-tts")
const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel} = require("@discordjs/voice")

module.exports =  {
    
    name: 'tts',
    aliases: [],
    description: '🔊 Convierte tus mensajes en audio.',
  
    async execute(client, message, args, Discord) { 

        if(message.guild.id !== '777620055344545842') return

        let id = ['753435606410985573']

        if(!id.some(id => message.author.id == id)) return

        let texto = args.join(' ')
        let voiceConnection
        let audioPlayer = new AudioPlayer()

        const stream = discordTTS.getVoiceStream(texto)

        const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume:true });

        if(!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected){
            
            voiceConnection = joinVoiceChannel({
                
                channelId: message.member.voice.channelId,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,

            })

            voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000)

        }

        //

        if(voiceConnection.status === VoiceConnectionStatus.Connected){
            
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
        
        }

    }

}