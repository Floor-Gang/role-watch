/* eslint-disable no-await-in-loop */
import { Client } from 'discord.js';
import Config from './config/config';

const CONFIG = Config.getConfig();

const bot = new Client();
bot.on('ready', async () => {
  if (bot.user === null) {
    return;
  }
  console.log(`${bot.user.tag} is online!`);
  await bot.user.setActivity('your subs', { type: 'WATCHING' });
});

bot.on('guildMemberUpdate', async (oldMember, newMember) => {
  const oldRole = oldMember.roles.cache.get(CONFIG.t3roleID.toLocaleString());
  const newRole = newMember.roles.cache.get(CONFIG.t3roleID.toLocaleString());
  // check if member update was removing the tier 3 role
  if (oldRole && !newRole) {
    CONFIG.roles.forEach(async (role) => {
      const memberRoles = newMember.roles.cache;
      const invalidRole = memberRoles.get(role);

      if (invalidRole) {
        await newMember.roles.remove(CONFIG.roles, 'No Longer Tier 3');
      }
    });
  }
});

bot.login(CONFIG.token);
