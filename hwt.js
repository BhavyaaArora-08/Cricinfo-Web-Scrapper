const req = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/sunrisers-hyderabad-vs-royal-challengers-bangalore-3rd-match-1216534/full-scorecard";

req(url, (err, header, html) => {
  //   console.log(html);
  if (err) return console.log("some error occured");
  fs.writeFileSync("commentary.html", html);
  let fTool = cheerio.load(html); // $
  let innings = fTool(".card.content-block.match-scorecard-table .Collapsible");

  let fullHtml = "";
  let hwtname = "";
  let maxwickets = 0;
  
  for (let i = 0; i < innings.length; i++) {
    // fullHtml += fTool(innings[i]).html(); // yeh rule/dharam hai wrap karna padta hai ise
    // fullHtml += "<br>";
    // fullHtml +=
    //   "*************************************************************************";
    
    let cInning = fTool(innings[i]);
    let cIPlayers = cInning.find(".table.bowler tbody tr");
    for (let player = 0; player < cIPlayers.length; player++) {
      let allCols = fTool(cIPlayers[player]).find("td");
      let name = fTool(allCols[0]).text();
      let wickets = fTool(allCols[4]).text();
      console.log(name, wickets);
      if (Number(wickets) > maxwickets) {
        maxwickets = Number(wickets);
        hwtname = name;
      }
    }
    console.log(
      "`````````````````````````````````````````````````````````````"
    );
  }

  console.log("Highest wicket taker", maxwickets, hwtname);
  fs.writeFileSync("innings.html", fullHtml);
});
