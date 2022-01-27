const { Collection } = require('mongoose');
const userSchema = require('../../models/userSchema');

module.exports =  {
    
    name: 'add-money',
    aliases: ['addmoney','adddinero'],
    description: '🏧 Retira tu dinero del banco.\n `_with <cantidad | all>`',
  
    async execute(client, message, args, Discord) { 

    }

}