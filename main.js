let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";



// Scorecard page
let request = require("request");
let cheerio = require("cheerio");
let  scoreCardObj = require("./scoreCardObj");

let fs = require("fs");
console.log("before");

request(link,cb);
function cb(error, response, html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{
        dataExtracter(html);
    }
}

function dataExtracter(html){
    let searchTool = cheerio.load(html);
    let ancrElem = searchTool('a[data-hover="View All Results"]');
    let link = ancrElem.attr("href");
    let fullLink = `https://www.espncricinfo.com/${link}`
    console.log(fullLink)
    // console.log("link",fullLink);
    request(fullLink,scoreCardcb);
}
function scoreCardcb(error , response, html){
    if(error){
        console.log("error");
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{
        // console.log(html);
        // console.log("-------------------------")
        getAllScoreCardLink(html);
    }
}

function getAllScoreCardLink(html){
    console.log("-------------------------")
    let searchTool = cheerio.load(html);
    let scorecardsArr = searchTool('a[data-hover="Scorecard"]');
    
    for(let i = 0; i < scorecardsArr.length; i++){
        let link = searchTool(scorecardsArr[i]).attr("href");
        let fullLink = `https://www.espncricinfo.com/${link}`
        // console.log(fullLink);
        scoreCardObj.sco(fullLink);
    }
    
}

