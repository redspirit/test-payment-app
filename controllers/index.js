const router  = require('express').Router();
const skinport  = require('../modules/skinport');
const paygate  = require('../modules/paygate');
const paymentsModel  = require('../models/payments');
const usersModel  = require('../models/users');

// get list of items
router.get('/items', async (req, res) => {

    const processItem = (item) => {
        // todo надо что-то сделать с объектом?
        return item;
    }

    try {
        const items = await skinport.getItems();
        res.send(items.map(processItem));
    } catch (err) {
        res.status(400).send(err);
    }

});

// catch paygate callback
router.post('/callback', async (req, res) => {

    console.log('CALLBACK', req.body);

    const {id, status, amount} = req.body;
    if (!id || !status || !amount) return res.send();

    const payment = await paymentsModel.getByExtId(id);
    if (!payment) {
        console.error(`Payment by id ${id} not found!`);
        return res.send();
    }

    await paymentsModel.updateStatusAndAmount(payment.id, status, amount);

    console.error(`Payment updated by id ${id} successfully!`);

    res.send();

});

// call of payment form
router.post('/payment', async (req, res) => {

    const name = req.body.name;
    if (!name) return res.status(400).send({error: 'name required'});

    // create user object
    let user = await usersModel.getByName(name)
    if(!user) {
        let userId = await usersModel.create(name);
        user = {id: userId};
    }

    try {
        // make query for create invoice
        const invoiceResult = await paygate.invoice();
        if (!invoiceResult.success) {
            return res.status(400).send({error: 'invoice failed'});
        }
        // create payment in db
        await paymentsModel.create(invoiceResult.id, user.id);
    } catch (invoiceErr) {
        return res.status(400).send({error: invoiceErr.toString()});
    }

    res.redirect('/paymentForm/success.html');

});

router.get('/api/users', async (req, res) => {

    const items = await usersModel.getAll();
    res.send(items);

});

router.get('/api/payments', async (req, res) => {

    const items = await paymentsModel.getAll();
    res.send(items);

});

module.exports = router;
