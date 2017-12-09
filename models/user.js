import Sequelize from 'sequelize'
import bcrypt from 'bcrypt-nodejs'
import connection from '../config/db'



let User = connection.define('user', {
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [0, 50],
                msg: 'El nombre tiene demasiados carácteres'
            }
        }
    },
    lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [0, 100],
                msg: 'Los apellidos tienen demasiados carácteres'
            }
        }
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'No es una dirección de correo electrónico.'
            },
            isUnique: connection.validateIsUnique(
                'email',
                'Esta dirección de correo electrónico ya existe.'
            )
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        generateHash: function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        },
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password)
        }
    }
})



module.exports = User;
