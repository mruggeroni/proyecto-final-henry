import Stripe from "stripe";
//const stripeKey = 
const stripe = Stripe('sk_test_51LSoUXFrlpRCY5YH7F7s7KDDAOsF4LAeXJyAJrHjUUSObyUbcDECpGu7N2Afj6N9P1aa7hdc1Ca85x4fSDUJebER00IklWuRZ3')
const itemsCart = new Map([
    [1, {priceInCents: 100000, name: 'Go to Japan', }],
    [2,{priceInCents: 200000, name: 'Go to Korea', }]
])
export const PaymentCreate = async (req, res) => {
    try {
        console.log(req.body.body.items)
       const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
           mode: 'payment',
           line_items: req.body.body.items.map(item => {
               const storeItem = itemsCart.get(item.id)
               return {
                   price_data: {
                       currency: 'usd',
                       product_data: {
                           name: storeItem.name
                       },
                       unit_amount: storeItem.priceInCents
                   },
                   quantity: item.quantity
               }
           }),
           success_url: 'http://localhost:3000' ,
           cancel_url: 'http://localhost:3000/checkout'
       })
       console.log(session)
        res.json({url: session.url})
    } catch (error) {
        console.log(error)
      res.status(500).json({error: error.message})  
    }
}