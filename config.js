require('dotenv').config()

module.exports = {
    DB_DATABASE: process.env.DB_DATABASE || 'database',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
}