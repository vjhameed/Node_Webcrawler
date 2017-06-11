/**
 * Created by Administrator on 5/31/2017.
 */
var express = require("express");
var Crawler = require("node-webcrawler");
var google = require('google')

var app = express();

function scrapeWeb(Query,TagName) {
    google.resultsPerPage = 1
    var nextCounter = 2

    google(Query, function (err, res) {
        if (err) console.error(err)
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            console.log(link.title + ' - ' + link.href)
            createCrawler(TagName).queue(link.href);
         }
        // if (nextCounter < 2) {
        //     nextCounter += 1
        //     if (res.next) res.next()
        // }
    })
}

function  createCrawler(str) {
    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, result, $) {
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            if (error) {
                console.log(error);
            } else {
                console.log($("."+str).text());
            }
        }
    });
return c;
}

app.get("/",(req,resp)=>{

    resp.send("welcome to pricefetcher");
    scrapeWeb("symbios samsung s6","price-neww");
    scrapeWeb("ishopping samsung s6","price");
})

app.listen(3000,()=>{
    console.log("server started on port 3000")
})