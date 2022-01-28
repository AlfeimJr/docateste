const {Usuario} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bcrypt = require("bcryptjs");

const IndexController = {
    async index(req,res){
        let {page = 1} = req.query
        let {count:total, rows:users} = await Usuario.findAndCountAll({
            limit:5,
            offset:(page - 1)* 5
        });

        let totalPagina = Math.round(total/5)
        return res.render('usuarios',{users,totalPagina})

    },
    async findById(req,res){
        let {id} = req.params;

        let user = await Usuario.findOne({
            where:{

                id_usuario:id
            }
        });

        return res.render('viewUsuario',{user})

    },

    create(req,res){
        return res.render('cadastrarUsuario')
    },
    async store (req,res){
        const {nome, email, senha, cpf, admnistrador} = req.body;
        const hash = bcrypt.hashSync(senha, 10);
        console.log(nome,email,senha, cpf, admnistrador )

       
        const resultado = await Usuario.create({
            nome,
            email,
            senha: hash,
            cpf,
            admnistrador,
        });

        // log usado apenas pra testes
        console.log(resultado)


        return res.redirect('/admin')
    },

    //atualizando usuario = update--------------------------------------

    // mostrando a tela de edição
    async edit(req,res){
        const {id} = req.params
        const usuario = await Usuario.findByPk(id);
        return res.render('editarUsuario',{usuario})
    },

    async update(req,res){
        const {id} = req.params
        const {nome, email, senha, cpf, admnistrador} = req.body

        const resultado = await Usuario.update({
            nome,
            email,
            senha,
            cpf,
            admnistrador,
        },
        {
            where:{
                id_usuario:id
            }
        })

        console.log(resultado)
        return res.redirect('/admin')
    },

    //deletando

    async destroy(req,res){
        const {id} = req.params

        const resultado = await Usuario.destroy({
            where:{
                id_usuario: id
            }

        })

        console.log(resultado)
        return res.redirect('/admin')
    }

}

module.exports = IndexController;