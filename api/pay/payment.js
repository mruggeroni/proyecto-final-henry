import 'dotenv/config';
import Stripe from "stripe";
import { get0rderDetailAux } from "../controllers/OrdersController.js";
const stripe = Stripe('sk_test_51LSoUXFrlpRCY5YH7F7s7KDDAOsF4LAeXJyAJrHjUUSObyUbcDECpGu7N2Afj6N9P1aa7hdc1Ca85x4fSDUJebER00IklWuRZ3')


export const PaymentCreate = async (req, res) => {
    let cart = req.body;
    let id = cart.payload.id.toString()
    try {
        const cart = await get0rderDetailAux(id)
        const itemsCart = cart.packages?.map( (p) => ({
            quantity: 1,
            packageId: p.dataValues.id,
            packageName: p.dataValues.name,
            totalPerUnitCents: p.dataValues.order_item.dataValues.total*100,
            
        }))
       const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
           mode: 'payment',
            metadata:{'order': id},
           line_items: itemsCart.map(item => {
               return {
                    price_data: {
                       currency: 'usd',
                       product_data: {
                           name: item.packageName
                       },
                       unit_amount: item.totalPerUnitCents
                   },
                   quantity: item.quantity,  
               }
           }),
           client_reference_id: id,
           success_url: process.env.NODE_ENV === 'production' ? 'https://proyecto-final-henry.vercel.app/checkout/confirmation' :'http://localhost:3000/checkout/confirmation',
           cancel_url: process.env.NODE_ENV === 'production' ? 'https://proyecto-final-henry.vercel.app/checkout' :'http://localhost:3000/checkout'
       })
        const paymentIntent = await stripe.paymentIntents.create({
             amount: Number(cart.total_order)*100,
             currency: 'usd',
             payment_method_types: ['card'],
             metadata: {'order': id},
           });

        res.json({url: session.url})
    } catch (error) {
        console.log(error)
      res.status(500).json({error: error.message})  
    }
}