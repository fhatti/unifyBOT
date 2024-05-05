// id stands for role

const leagues = {
  superliga: {
    leagueId: 272,
    name: "Superliga",
    id: "1229424747347972196",
    channelId: "1232051386221461657",
    channels: [
      {
        name: "standings",
        channelId: "1233461307374698587",
      },
      {
        name: "fixtures",
        channelId: "1233461999443120209",
      },
      {
        name: "top-scorers",
        channelId: "1233461945756291155",
      },
    ],
    logo: "https://lpf.ro/images/logo/SuperLiga-Logo%20White.png",
  },
  serieA: {
    leagueId: 207,
    name: "Serie A",
    id: "1229424748199546920",
  },
  premierLeague: {
    leagueId: "152",
    name: "Premier League",
    id: "1229424748606263397",
    categoryId: "1232775365752262806",
    channels: [
      {
        name: "standings",
        channelId: "1233145650737315903",
      },
      {
        name: "fixtures",
        channelId: "1233145947668742204",
      },
      {
        name: "top-scorers",
        channelId: "1233145697633828945",
      },
    ],
  },
  laLiga: {
    leagueId: 302,
    name: "La Liga",
    id: "1229424749499908209",
    categoryId: "1234169314093957223",
    channels: [
      {
        name: "standings",
        channelId: "1234169347098808320",
      },
      {
        name: "top-scorers",
        channelId: "1234169372533194792",
      },
      {
        name: "fixtures",
        channelId: "1234169388819677324",
      },
    ],
  },
  liegueOne: {
    leagueId: 168,
    name: "Ligue 1 Uber Eats",
    id: "1229424749428473906",
    categoryId: "1236767781676912640",
    channels: [
      {
        name: "standings",
        channelId: "1236769069877821501",
      },
      {
        name: "fixtures",
        channelId: "1236769170461294764",
      },
      {
        name: "top-scorers",
        channelId: "1236769256499056764",
      },
    ],
  },
  bundesliga: {
    leagueId: 175,
    name: "Bundesliga",
    id: "1236775972121083994",
    categoryId: "1236775304102678742",
    channels: [
      {
        name: "standings",
        channelId: "1236776205789958284",
      },
      {
        name: "fixtures",
        channelId: "1236776318276862156",
      },
      {
        name: "top-scorers",
        channelId: "1236776433309847558",
      },
    ],
  },
};

module.exports = leagues;
