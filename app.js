const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
const { User, sequelize } = require('./db');

app.use(bodyParser.json())

app.post('/users', async (req, res) => {

    const { userId, amount } = req.body

    const trx = await sequelize.transaction();
    try {

        const user = await User.findOne({
            where: {
                id: userId
            },
            transaction: trx,
            lock: trx.LOCK.UPDATE,
        })

        if (user.balance < amount) {
            await trx.commit()
            return res.status(400).send('insufficient funds on balance')
        }

        user.balance -= amount
        await user.save({ transaction: trx })

        await trx.commit()

        return res.status(200).send('ok')
    } catch (err) {
        await trx.rollback()
        res.status(500).send('error')
    }
})

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.");

        await User.create({})

        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init()