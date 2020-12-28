import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import fs from 'fs';
import * as yaml from 'js-yaml';
import { getRole } from '../../utils';
import { doc } from '../../globals';

export default class AddCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'add',
      group: 'whitelist',
      memberName: 'add',
      description: 'Adds a role to the colour-roles whitelist',
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
    // if the first argument is the @everyone id or undefined return
    if (role === undefined || roleID === msg.guild.id) {
      return msg.reply('That\' not a role!');
    }

    if (doc.t3roleID.includes(role.id)) {
      return msg.say(`\`${role.name}\` is already on the whitelist!`);
    } if (doc.roles.includes(role.id)) {
      return msg.say(`\`${role.name}\` is on the remove role list, adding this to the whitelist would break the system!`);
    }
    doc.t3roleID.push(role.id);
    fs.writeFileSync('./config.yml', yaml.safeDump(doc), 'utf8');
    msg.say(`I have added the role \`${role.name}\` to the whitelist!`);
    return null;
  }
}
