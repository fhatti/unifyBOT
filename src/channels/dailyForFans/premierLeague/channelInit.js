const leagues = require("../../../utils/returnLeague");

async function initPremierLeagueChannel(client)
{
    const channel = client.channels.cache.get(leagues["premierLeague"].channelId);
    if(!channel)
    {
        console.log("Channel not found");
        return;
    }

    channel.send("Te salut domnule!");
}

module.exports = initPremierLeagueChannel;