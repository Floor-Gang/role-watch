import * as commando from 'discord.js-commando';
import fs from 'fs';
import * as yaml from 'js-yaml';
import Config from '../../config/config';
import { getRole } from '../../utils';

module.exports = class AddCommand extends commando.Command {
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

  run(msg: commando.CommandoMessage, { roleID }: { roleID: string }) {
    const role = getRole(roleID, msg.guild);
    if (role === undefined) {
      return msg.reply('That\' not a role!');
    }
    const doc = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8')) as Config;
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
};
