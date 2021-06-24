const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },//создан
    id: {
        type: String,
        required: true
    }//id для запроса user/:id
})

//Пресейвер, который хэширует заведенный пользователем прирегистрации пароль
//Используется библиотека bcryptjs
userSchema.pre('save', async function (next) {
    try {
        if(!this.isModified('password')) {
            return next()
        }
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed;
        return next()

    } catch(err) {
        return next(err)
    }
})

//Поскольку пароль захеширован, проверка его осуществляется через bcrypt.compare
//Данный метод модели соотносит пароль из аунтефикации с хешем пароля в модели
userSchema.methods.comparePassword = async function (attempt, next) {
    try {
        return await bcrypt.compare(attempt, this.password)

    } catch(err) {
        next(err);
    }
} 
 
module.exports = mongoose.model('User', userSchema)