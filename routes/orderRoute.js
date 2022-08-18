const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51KnP0PSIJqXqc0IZ8K1g136V0xI4wR01TH9uIN2noodNUJ6R0IIFyk0GUYPXai6xsz3lGtH4vnHuGbph3sy9UT7B00aUKChdoD");
const Order = require('../models/orderModel');

router.post("/placeorder", async (req, res) => {
    const { token, subTotal, currentUser, cartItems } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.paymentIntents.create({
            amount: subTotal * 100,
            currency: "inr",
            customer: customer.source,
            receipt_email: token.email,
        },
            {
                idempotencyKey: uuidv4(),
            });
        console.log("details", payment.amount, "customer", payment.customer);
        if (payment) {
            const newOrder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subTotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip,
                },
                transactionId: payment.source
            });
            newOrder.save();
            res.send('Payment Success');
        } else {
            res.send('Payment Failed');
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.stack,
        });
    }
});

router.post("/getuserorder", async (req, res) => {
    const { userid } = req.body;
    try {
        const orders = await Order.find({ userid });
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong",
            error: error.stack,
        });
    }
});

router.get("/alluserorder", async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong",
            error: error.stack,
        });
    }
});

router.post("/deliverorder", async (req, res) => {
    const orderid = req.body.orderid;
    try {
        const order = await Order.findOne({ _id: orderid });
        order.isDelivered = true;
        await order.save();
        res.status(200).send("Order delivered Successfully");
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong",
            error: error.stack,
        });
    }
});

module.exports = router;