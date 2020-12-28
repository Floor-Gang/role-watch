import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import fs from 'fs';
import * as yaml from 'js-yaml';
import { getRole } from '../../utils';
import { doc } from '../../globals';

export default class AddCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'remove',
      group: 'whitelist',
      memberName: 'remove',
      description: 'Removes a role to the colour-roles whitelist',
      clientPermissions: ['MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      throttling: {
        usages: 3,
        duration: 5,
      },
      guildOnly: true,
      args: [
        {
          key: 'roleID',
          prompt: 'make sure you\'re giving me a role',
          type: 'string',
        },
      ],
    });
  }

  public async run(
    msg: commando.CommandoMessage,
    { roleID }: { roleID: string },
  ): Promise<Message | Message[] | null> {
    const role = getRole(roleID, msg.guild);
    if (role === undefined || roleID === msg.guild.id) {
      return msg.reply('That\' not a role!');
    }
    if (!doc.t3roleID.includes(role.id)) {
      return msg.say(`\`${role.name}\` is not on the whitelist!`);
    }
    const roleIndex = doc.t3roleID.indexOf(role.id);
    doc.t3roleID.splice(roleIndex, 1);
    fs.writeFileSync('./config.yml', yaml.safeDump(doc), 'utf8');
    msg.say(`I have removed the role \`${role.name}\` from the whitelist\n*Anyone currently with \`${role.name}\` you will have to remove roles manually*`);
    return null;
  }
}
