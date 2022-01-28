const { User } = require("../models");
var request = require('request');
var cheerio = require('cheerio');
const { crawler } = require("./Auth");
const { next } = require("cheerio/lib/api/traversing");
const { urlencoded } = require("express");

const mainController = {
  showLogin(req,res){
    return res.render('auth/login-cadastro')
  },
  crawler(req, res){
      request('https://docato.com.br/', function(error, response, body){
      if(error)throw new Error(error);
  
      var $ = cheerio.load(body);
  
      var nome = $('h2[class=h1]').text()
      console.log(nome)
      

      return res.render('home',{nome})

    });
    }
}


module.exports = mainController
