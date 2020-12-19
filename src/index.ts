import { Client } from 'discord.js'
import { token } from "./config.json"
import { t3roleID } from "./config.json"
import { roles } from "./roles.json"
const bot = new Client()
//Clasic imports


bot.on("ready", async () => {
    if (bot.user === null) return
    console.log(`${bot.user.tag} is online!`);
    await bot.user.setActivity('your subs', { type: "WATCHING" })


})
//checking when online

bot.on("guildMemberUpdate", async (oldMember, newMember) => {
    //Checking for role updates

    if (oldMember.roles.cache.get(t3roleID) && !newMember.roles.cache.get(t3roleID)) {
        //check if member update was removing the tier 3 role
        const memberRoles = newMember.roles.cache
        for (const role of roles) {
            const invalidRole = memberRoles.get(role)

            if (invalidRole) {
                await newMember.roles.remove(role, "No Longer Tier 3")

            }

        }//for loop checking and removing all colour roles listed in roles.json

    }


})

bot.login(token)