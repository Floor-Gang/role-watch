import { Client } from 'discord.js';
import * as yaml from 'js-yaml';
import * as fs from 'fs';


    let fileContents = fs.readFileSync('config.yml', 'utf8');
    let data = yaml.safeLoad(fileContents);
    

    console.log(data);

// const bot = new Client()


// bot.on("ready", async () => {
//     if (bot.user === null) return
//     console.log(`${bot.user.tag} is online!`);
//     await bot.user.setActivity('your subs', { type: "WATCHING" })

// })

// bot.on("guildMemberUpdate", async (oldMember, newMember) => {

//     if (oldMember.roles.cache.get(t3roleID) && !newMember.roles.cache.get(t3roleID)) {
//         //check if member update was removing the tier 3 role
//         const memberRoles = newMember.roles.cache
//         //for loop checking and removing all colour roles listed in roles from config.json
//         for (const role of roles) {
//             const invalidRole = memberRoles.get(role)

//             if (invalidRole) {
//                 await newMember.roles.remove(role, "No Longer Tier 3")

//             }

//         }

//     }


// })

// bot.login()
