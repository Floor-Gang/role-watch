import { Client } from 'discord.js-commando';
import path from 'path';
import { doc } from './globals';

const bot = new Client({
  commandPrefix: 'c.',

});
bot.on('ready', async () => {
  if (bot.user === null) {
    return;
  }
  console.log(`${bot.user.tag} is online!`);
  await bot.user.setActivity('your colour(s)', { type: 'WATCHING' });
});

bot.on('guildMemberUpdate', (_, newMember) => {
  const check: string[] = [];
  newMember.roles.cache.forEach((role) => {
    check.push(role.id);
  });
  // Loop over member roles to check if they have whitelisted roles
  const foundWhitelist = check.some((whitelistRole) => doc.t3roleID.includes(whitelistRole));
  if (foundWhitelist) {
    return;
  }
  // Loop over member roles to check if they have colour roles
  const foundColourRole = check.some((colourRole) => doc.roles.includes(colourRole));
  if (foundColourRole) {
    doc.roles.forEach(async (role) => {
      const memberRoles = newMember.roles.cache;
      const invalidRole = memberRoles.get(role);
      if (invalidRole) {
        await newMember.roles.remove(role, 'Doesn\'t have required role');
      }
    });
  }
});
bot.registry
  .registerGroups([
    ['whitelist', 'Interact with the role remover'],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));
bot.login(doc.token);
