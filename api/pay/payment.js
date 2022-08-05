import Stripe from "stripe";
//const stripeKey = 
const stripe = Stripe('sk_test_51LSoUXFrlpRCY5YH7F7s7KDDAOsF4LAeXJyAJrHjUUSObyUbcDECpGu7N2Afj6N9P1aa7hdc1Ca85x4fSDUJebER00IklWuRZ3')


export const PaymentCreate = async (req, res) => {
    try {
        //FUNCION PARA FORMATEAR EL CARRITO ENVIADO POR REQ DARIA UN RESULTADO COMO EL REPRESENTADO EN ITEMSCART    
        const itemsCart = [
            {
                "quantity": "7",
                "packageId": 4,
                "packageName": "Joyas de Rusia Imperial en tren 8 días de San Petersburgo a Moscú",
                "packagePriceCents": 101000,
                "activities": [
                    {
                        "activityId": 1,
                        "activityName": "Tour de Museos",
                        "activityPriceCents": 15000
                    },
                    {
                        "activityId": 2,
                        "activityName": "Tour de Highlights",
                        "activityPriceCents": 10000
                    }
                ],
                "totalPerUnitCents": 126000
            }
        ]
        //console.log(req.body.body.items)
       const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
           mode: 'payment',
           line_items: itemsCart.map(item => {
               return {
                    price_data: {
                       currency: 'usd',
                       product_data: {
                           name: item.packageName
                       },
                       unit_amount: item.totalPerUnitCents
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