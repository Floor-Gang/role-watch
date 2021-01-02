import * as commando from 'discord.js-commando';
import {
  addRole,
  listRoles,
  removeRole,
} from '../../utils';
import { CONFIG, rolePerms } from '../../globals';

export default class colorCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'color',
      aliases: ['colour'],
      group: 'role manager',
      memberName: 'color',
      description: 'Lets you decide to add, remove, or list the colored roles',
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
    if (choice.toLowerCase() === 'add') {
      addRole(msg, roleID, CONFIG.roles, CONFIG.t3roleID);
    }

    if (choice.toLowerCase() === 'remove') {
      removeRole(msg, roleID, CONFIG.roles, CONFIG.t3roleID);
    }

    if (choice.toLowerCase() === 'list') {
      listRoles(msg, CONFIG.roles, 'Colour roles');
    }

    return null;
  }
}
