const { ActivityType } = require('discord.js');
const colors = require('../UI/colors/colors');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const activities = [
            { name: 'Netflix', type: ActivityType.Watching },
            { name: 'GTA VI', type: ActivityType.Playing },
            { name: 'on YouTube', type: ActivityType.Streaming },
            { name: 'Spotify', type: ActivityType.Listening },
        ];

        const statuses = ['online', 'idle', 'dnd'];

        let currentActivityIndex = 0;
        let currentStatusIndex = 0;

        async function setActivityAndStatus() {
            const guild = client.guilds.cache.first(); // Get the first guild the bot is in (modify if needed)
            const memberCount = guild ? guild.memberCount : 0;

            const dynamicActivity = { 
                name: `${memberCount} members`, 
                type: ActivityType.Watching 
            };

            const activity = currentActivityIndex === activities.length ? dynamicActivity : activities[currentActivityIndex];
            const status = statuses[currentStatusIndex];

            client.user.setPresence({
                activities: [activity],
                status: status,
            });

            currentActivityIndex = (currentActivityIndex + 1) % (activities.length + 1);
            currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
        }

        setTimeout(async () => {
            await setActivityAndStatus();
            console.log('\n' + '─'.repeat(40));
            console.log(`${colors.magenta}${colors.bright}🔗  ACTIVITY STATUS${colors.reset}`);
            console.log('─'.repeat(40));
            console.log('\x1b[31m[ CORE ]\x1b[0m \x1b[32m%s\x1b[0m', 'Bot Activity Set Successful ✅');
        }, 2000);

        setInterval(async () => {
            await setActivityAndStatus();
        }, 6000);
    },
};
