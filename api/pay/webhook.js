import Stripe from "stripe";
import { statusCartFunction, statusOrderFunction } from '../controllers/OrdersController.js';
import { paidEmail } from '../email/email.js'
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
           await statusOrderFunction(id, 'cancel');
      }
       
      console.log(eventType)
       if(eventType === 'payment_intent.succeeded') {
         console.log('HERE')
         
    
        }
      if(eventType === 'checkout.session.completed'){
        const id = req.body.data.object.client_reference_id;
        console.log('ID')
        console.log(req.body.data.object.client_reference_id)
        if(data.payment_status === 'paid'){
          console.log(data.payment_status)
         const respuesta = await statusOrderFunction(id, 'paid');
         //console.log(respuesta)
		 paidEmail(id, 'paid');
        }
        

      }
        
        res.send('pay')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

}