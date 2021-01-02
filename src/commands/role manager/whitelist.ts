import * as commando from 'discord.js-commando';
import {
  addRole,
  listRoles,
  removeRole,
} from '../../utils';
import { CONFIG, rolePerms } from '../../globals';

export default class whitelistCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'whitelist',
      group: 'role manager',
      memberName: 'whitelist',
      description: 'Lets you decide to add, remove, or list the whitelist roles',
      clientPermissions: rolePerms,
      userPermissions: rolePerms,
      throttling: {
        usages: 3,
        duration: 5,
      },
      guildOnly: true,
      args: [
        {
          key: 'choice',
          prompt: 'Add, Remove or List',
          type: 'string',
          oneOf: ['add', 'remove', 'list'],
        },
        {
          key: 'roleID',
          prompt: 'I need a role to add/remove to/from',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  public async run(
    msg: commando.CommandoMessage,
    { choice, roleID }: { choice: string, roleID: string },
  ): Promise<any> {
    switch (choice.toLowerCase()) {
      default: {
        msg.reply('Please give a choice');
        break;
      }
      case 'add': {
        addRole(msg, roleID, CONFIG.t3roleID, CONFIG.roles);
        break;
      }
      case 'remove': {
        removeRole(msg, roleID, CONFIG.t3roleID, CONFIG.roles);
        break;
      }
      case 'list': {
        listRoles(msg, CONFIG.t3roleID, 'Whitelist roles');
        break;
      }
    }
  }
}
