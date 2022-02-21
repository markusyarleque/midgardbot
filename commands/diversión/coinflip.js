const { CoinFlip } = require('leaf-utils');

module.exports =  {
    
    name: 'coinflip',
    aliases: ['moneda','lanzarmoneda','monedaalaire','lanzar-moneda'],
    description: '🪙 Lanza una moneda al aire.',
  
    async execute(client, message, args, Discord) {

        await CoinFlip({
            message: message,
            slash_command: false,
            time: 300000, // time before the game ends in ms
            embed: {
                title: 'Coinflip',
                color: 'RANDOM',
            },
            buttons: {
                heads: 'Cara',
                tails: 'Cruz',
            },
            colors: {
                heads: 'DANGER',
                tails: 'PRIMARY',
            },
            startMessage: 'La moneda está en el aire, elige entre **Cara** o **Cruz**.',
            winMessage: 'GG, <@{{winner}}> La moneda cayó en **{{result}}**',
            loseMessage: '<@{{player}}> Perdiste, la moneda cayó en **{{result}}**',
            authorOnly: 'Solo <@{{author}}> puede usar estos botones.'
        })

    }

}