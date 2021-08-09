let scoreCardLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
// Scorecard page

let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
function processSinglematch(scoreCardLink){
    request(scoreCardLink,SCcb);
}

function SCcb(error, response, html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{
        SCdataExtracter(html);
    }
}

function SCdataExtracter(html){
    // team name
    // player name
    let searchTool = cheerio.load(html);
    let scoreCard = "";
    let bothinningArr = searchTool(".Collapsible");
    for(let i = 0; i < bothinningArr.length;  i++){
        // let scoreCard = searchTool(bothinningArr[i]).html();
        let teamNameElem = searchTool(bothinningArr[i]).find("h5");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        console.log(teamName);

        let batsManAllRow = searchTool(bothinningArr[i]).find(".table.batsman tbody tr");
        // console.log("All row in batsMan table", batsManAllRow.length);

        for(let j = 0; j < batsManAllRow.length; j++){
            let numberOfTds = searchTool(batsManAllRow[j]).find("td");
            if(numberOfTds.length == 8){
                let playerName = searchTool(numberOfTds[0]).text();
                console.log("Player Name",playerName);
            }
        }
        console.log("`````````````````````````````````````````````````````````````");
        // fs.writeFileSync(`innning${i+1}.html`,scoreCard);
    }
    
    
}

module.exports = {
    sco: processSinglematch
}