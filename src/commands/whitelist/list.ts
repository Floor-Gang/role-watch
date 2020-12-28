import { MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import fs from 'fs';
import * as yaml from 'js-yaml';
import Config from '../../config/config';

module.exports = class AddCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'list',
      group: 'whitelist',
      memberName: 'list',
      description: 'Lists all role(s) on the colour-roles whitelist',
      clientPermissions: ['MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      throttling: {
        usages: 3,
        duration: 5,
      },
      guildOnly: true,
    });
  }

  run(msg: commando.CommandoMessage) {
    const doc = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8')) as Config;
    const roleList = doc.t3roleID.map((list) => `○ <@&${list}>\n`);
    const embed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
      .setTitle('Whitelist List')
      .setTimestamp()
      .setDescription(roleList.join(''));
    msg.say(embed)
      .catch(() => {
        msg.say(`Whitelisted roles:\n ${roleList.join('')}`);
      });
    return null;
  }
};
