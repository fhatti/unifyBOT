async function getTeamsAsRoles() {
    try {
      const teamUrl = `https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=272&APIkey=${process.env.API_KEY}`;
      const response = await fetch(teamUrl);
      const data = await response.json();
  
      if (data && data.result) {
        const teams = data.result;
        const roles = teams.map((team) => ({
          id: team.team_key.toString(),
          label: team.team_name,
        }));
        return roles;
      } else {
        throw new Error("Failed to fetch team data from the API");
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      return []; // Return an empty array if there's an error
    }
  }