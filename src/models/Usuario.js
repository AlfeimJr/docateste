module.exports = (sequelize,DataTypes)=>{
    const Usuario = sequelize.define('Usuario', {
            id_usuario:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome:DataTypes.STRING,
            email:{
                type:DataTypes.STRING,
                allowNull:true
            },
            senha:DataTypes.STRING,
            cpf:DataTypes.STRING,
            admnistrador:{
                type: DataTypes.INTEGER
            },
        },

        {
            tableName:'usuario',
            timestamps: false
        }
    )

    return Usuario
}
