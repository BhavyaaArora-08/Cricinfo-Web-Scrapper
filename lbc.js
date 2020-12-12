const req = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/sunrisers-hyderabad-vs-royal-challengers-bangalore-3rd-match-1216534/ball-by-ball-commentary";

req(url, (err, header, html) => {
  //   console.log(html);
  if (err) return console.log("some error occured");
  fs.writeFileSync("commentary.html", html);
  let fTool = cheerio.load(html); // $
  let allComments = fTool(".d-flex.match-comment-padder.align-items-center");
  // console.log(allComments.html()); // Will print html of first element that matches the selector
  // allComments is an array\
  let fullHtml = "";

  for (let i = 0; i < allComments.length; i++) {
    fullHtml += fTool(allComments[i]).html(); // yeh rule/dharam hai wrap karna padta hai ise
    fullHtml += "<br>";
  }

  fs.writeFileSync("commentaryfull.html", fullHtml);
  //   console.log(fullHtml);
});
