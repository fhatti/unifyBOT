const sendEmbed = require("./sendEmbed");

module.exports = async function sendMsg(channelId, embed, client) {
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.error(`Channel with ID ${channelId} not found.`);
    return;
  }

  try {
    const lastMessage = await channel.messages.fetch({ limit: 1 });

    if (lastMessage.size > 0) {
      const lastMsg = lastMessage.first();
      await lastMsg.delete();
    }

    await sendEmbed(channel, embed);
  } catch (error) {
    console.error("Error occurred while sending message:", error);
  }
};
