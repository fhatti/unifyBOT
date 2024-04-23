require("dotenv").config();
const getDate = require("./getDateAsFormattedString.js");

module.exports = async function getData(type,leagueId) {
    try {
        const fixtureUrl = `https://apiv2.allsportsapi.com/football/?met=${type}&leagueId=${leagueId}&timezone=Europe/Bucharest&APIkey=${
    process.env.API_KEY
  }&from=${getDate()}&to=${getDate()}&withPlayerStats=1`;
        const response = await fetch(fixtureUrl);
        const data = await response.json();

        if (!data || data.length === 0) {
            console.log("No data");
            return;
        } else {
            const fixtures = data.result;
            return fixtures;
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
