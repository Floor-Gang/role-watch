import { Guild, Message, MessageEmbed } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';
import Config from './config';

export function getRole(rid: string, guild: Guild) {
  let ridParsed = rid;
  // Check if a role was tagged or not. If the role was tagged remove the
  // tag from rid.
  if (rid.startsWith('<@&') && rid.endsWith('>')) {
    const re = new RegExp('[<@&>]', 'g');
    ridParsed = rid.replace(re, '');
  }
  // Try recovering the role and report if it was successful or not.
  try {
    return guild.roles.cache.get(ridParsed);
  } catch (e) {
    console.log(`Role not found because ${e}`);
    return undefined;
  }
}

/**
 * Used to add a role to an array
 * @param {CommandoMessage} msg Message instance
 * @param {string} rid The Role ID of the User
 * @param {string[]} array The array to add to
 * @param {string[]} array2 The second array to make sure no duplicates are made
 */
export function addRole(
  msg: CommandoMessage,
  rid: string,
  array: string[],
  array2: string[],
): Promise<Message | Message[]> {
  const role = getRole(rid, msg.guild);

  // if the first argument is the @everyone id or undefined return
  if (role === undefined || rid === msg.guild.id) {
    return msg.reply('That\' not a role! ❌');
  }

  // Checks if the role they want to add is already added
  if (array.includes(role.id)) {
    return msg.say(`\`${role.name}\` is already on the list! ❌`);
  }

  // Checks if the role they want to add is already on the "removal" list
  if (array2.includes(role.id)) {
    return msg.say(
      `\`${role.name}\` is on the other role list, adding this to the`
    + ' current list would break the system! ❌',
    );
  }

  // Otherwise finally add it to the list
  array.push(role.id);
  Config.saveConfig();
  return msg.say(
    `I have added the role \`${role.name}\` to the list! ✅`,
  );
}

/**
 * Used to remove a role from an array
 * @param {CommandoMessage} msg Message instance
 * @param {string} rid The Role ID of the User
 * @param {string[]} array The array to remove from
 * @param {string[]} array2 The second array to make sure no duplicates are made
 */
export function removeRole(
  msg: CommandoMessage,
  rid: string,
  array: string[],
  array2: string[],
): Promise<Message | Message[]> {
  const role = getRole(rid, msg.guild);

  // if the first argument is the @everyone id or undefined return
  if (role === undefined || rid === msg.guild.id) {
    return msg.reply('That\' not a role! ❌');
  }

  // Checks if the role they want to add is already added
  if (!array.includes(role.id)) {
    return msg.say(`\`${role.name}\` is not on the list! ❌`);
  }

  // Checks if the role they want to add is already on the other list
  if (array2.includes(role.id)) {
    return msg.say(
      `\`${role.name}\` is on the remove role list, adding this to the`
    + ' list would break the system! ❌',
    );
  }
  // Checks the location in the array for the role
  const roleIndex = array.indexOf(role.id);

  // Removes the role from the array with the index number
  array.splice(roleIndex, 1);
  Config.saveConfig();

  return msg.say(
    `I have removed the role \`${role.name} \` from the list ✅`
    + `\n*Anyone currently with \`${role.name}\` you will have to`
    + ' remove roles manually*',
  );
}

/**
 * Used to list the roles from an array
 * @param {CommandoMessage} msg Message instance
 * @param {string[]} array The array to list
 * @param {string} title The list's name
 * @returns {MessageEmbed} Emeded list of roles
 */
export function listRoles(
  msg: CommandoMessage,
  array: string[],
  title: string,
): Promise<MessageEmbed | Message | Message[]> {
  if (!array.length) {
    return msg.say(
      `The list is currently emtpy! use ${array}add <role>`
      + 'to add a role to the whitelist!',
    );
  }

  const roleList = array.map((list) => `○ <@&${list}>\n`);
  const embed = new MessageEmbed()
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ dynamic: true }),
    )
    .setTitle(title)
    .setTimestamp()
    .setDescription(roleList.join(''));

  try {
    return msg.say(embed);
  } catch (_) {
    const roles = roleList.join('');
    return msg.say(`listed roles:\n ${roles}`);
  }
}
