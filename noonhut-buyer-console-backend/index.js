const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('Stripe')("sk_test_51IxTFRAotqhqkVaWEyWvavAUgMdlW42O39LO78mKBKuNBtOsnokpQxp4cvKeRp7Fa36muyRN9E7BTDbNut1EnkyD00ke20dxDG");
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;
app.listen(port, (error) => {
    if (error) throw error;
    else {
        console.log("Your server is running on port 5000.");
    }
});

// route
app.post('/payment', async (req, res) => {
    let error;
    const { token, amount } = req.body;
    try {
        await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd'
        })
    } catch (error) {
        console.log(error);
    }
    res.json(error);
})