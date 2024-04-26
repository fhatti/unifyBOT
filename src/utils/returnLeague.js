const leagues = {
  superliga: {
    leagueId: 272,
    name: "Superliga",
    id: "1229424747347972196",
    channelId: "1232051386221461657",
    logo:"https://lpf.ro/images/logo/SuperLiga-Logo%20White.png",
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
    categoryId:"1232775365752262806",
    channels:[
      {
        name:"standings",
        channelId:"1233145650737315903",
      },
      {
        name:"fixtures",
        channelId:"1233145947668742204",
      },
      {
        name:"top-scorers",
        channelId:"1233145697633828945",
      },
    ],
  },
  laLiga: {
    leagueId: 168,
    name: "La Liga",
    id: "1229424749499908209",
  },
  liegueOne: {
    leagueId: "175",
    name: "Ligue 1 Uber Eats",
    id: "1229424749428473906",
  },
};

module.exports = leagues;
