const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
var request = require('request');
var cheerio = require('cheerio');

//FUNCAO PARA O REGISTRO FUNCIONAR
const authController = {
  async registro(req, res) {
    try {
      const { nome, email, senha, cpf, admnistrador } = req.body;
      const hash = bcrypt.hashSync(senha, 10);
      const usuario = await Usuario.create({
        nome,
        email,
        senha: hash,
        cpf,
        admnistrador : 0,
      });

      return res.redirect("/home");
    } catch (error) {
      console.log(error);
      return res.render("auth/login-cadastro", {
        erro: "nao foi possivel concluir o cadastro",
      });
    }
  },

  //FUNCAO PARA O LOGIN FUNCIONAR
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({
        where: {
          email,
        },
      });
      if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
        return res.render("auth/login-cadastro", {
          error: "Ops, usuario ou senha invalidos!",
        });
      }
      console.log(`Usuario ----- > ${JSON.stringify(usuario.admnistrador)}`);
      req.session.usuario = {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      };
      if (usuario.admnistrador) {
        req.session.usuario.admin = true;
        return res.redirect("/admin");
      } else {
        req.session.usuario.admin = false;
        return res.redirect("/home");
      }

     

    } catch (error) {
      console.log(error);
      return res.render("/login-cadastro", {
        error: "Sistema indisponivel tente novamente",
      });
    }
  },
  async CreateAdmin(req, res) {
    try {
      const usuario = await Usuario.create({
        nome: "Administrador",
        email: "admin@admin.com",
        senha: bcrypt.hashSync("123", 10),
        cpf: null,
        admnistrador: true,
      });
      return res.status(201).send(usuario);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authController;