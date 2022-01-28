const { Router } = require("express");
const express = require("express");
const path = require("path");
const routes = express.Router();
const mainController = require("./controllers/Main");
const authController = require("./controllers/Auth");
const isLogin = require("./middlewares/isLogin");
const requireLogin = require("./middlewares/requireLogin");
const IndexController = require('./controllers/Index');
const isAdmin = require('./middlewares/isAdmin')


routes.get('/home',isLogin, mainController.crawler)

routes.get("/login-cadastro", mainController.showLogin);
routes.post("/login", authController.login);
routes.post("/cadastro", authController.registro);


routes.get('/admin',isAdmin, IndexController.index);
routes.get('/ver/:id',isAdmin, IndexController.findById);
//cadastro
routes.get('/cadastro',isAdmin, IndexController.create);
routes.post('/cadastro-admin',isAdmin, IndexController.store);
// editando usuario
routes.get('/editar/:id',isAdmin, IndexController.edit);
routes.put('/editar/:id',isAdmin, IndexController.update);
//deletando
routes.delete('/deletar/:id',isAdmin, IndexController.destroy)




module.exports = routes;