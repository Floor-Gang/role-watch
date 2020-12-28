import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { doc } from '../../globals';

export default class AddCommand extends commando.Command {
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

  public async run(
    msg: commando.CommandoMessage,
  ): Promise<Message | Message[] | null> {
    if (!doc.t3roleID.length) {
      return msg.say('The list is currently emtpy! use `c.add <role>` to add a role to the whitelist!');
    }
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
}
