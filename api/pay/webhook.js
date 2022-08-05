import Stripe from "stripe";
//const stripeKey = 
let endpointSecret 

endpointSecret = "whsec_0b5f910e80d53f35ab1415e1b1e44fddd72476ce111c907e4ef053a8f8214f1a";
const stripe = Stripe('sk_test_51LSoUXFrlpRCY5YH7F7s7KDDAOsF4LAeXJyAJrHjUUSObyUbcDECpGu7N2Afj6N9P1aa7hdc1Ca85x4fSDUJebER00IklWuRZ3')
export const PaymentResponse = async (req, res)=>{
    const sig = req.headers['stripe-signature'];
    let data
    let eventType
    try {
      const payload = req.body;
      const payloadString = JSON.stringify(payload, null, 2);
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret 
     });
      let event;
       event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
       //console.log(`Webhook Verified: `, event);
       data = event.data.object
       eventType = event.type
       if(eventType === 'payment_intent.payment_failed'){
        console.log(data.status)
      }
       
      console.log(eventType)
       if(eventType === 'payment_intent.succeeded') {
         console.log(data.status)
    
        }
        
        res.send('pay')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

}