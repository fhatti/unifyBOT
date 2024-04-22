const client = require("../../utils/discordClient");

client.on("ready", async () => {
    const channel = client.channels.cache.get('1231694400841715822');
    channel.send('content');

})