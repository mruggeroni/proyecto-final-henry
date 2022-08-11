import { Router } from "express";
import { PaymentCreate } from "../pay/payment.js";
import { PaymentResponse } from "../pay/webhook.js";
import { PaymentController } from "../controllers/PaymentController.js";
import { PaymentService } from "../Services/PaymentsService.js";
import axios from "axios";
import { statusOrderFunction } from "../controllers/OrdersController.js";
const { ACCESS_TOKEN_MP } = process.env;

const router = Router();
router.post("/payment", PaymentCreate);
router.post("/payment/webhook");

const PaymentInstance = new PaymentController(new PaymentService());
//esta ruta deberia ser un post.. lo hacemos get para ver la respuesta en el json
router.post("/paymentML", (req, res, next) => {
  //   console.log(req.body);
  PaymentInstance.getPaymentLink(req.body, res);
});

router.post("/subscription", (req, res, next) => {
  PaymentInstance.getSubscriptionLink(req, res);
});

router.post("/paymentML/respuesta", (req, res) => {
  // const { data.id } = req.query
  res.status(200).send("ok");
  if (req.body.action === "payment.created") {
    const fetch = async (body) => {
      try {
        console.log(body.data.id);
        const infoPago = await axios.get(
          "https://api.mercadopago.com/v1/payments/" + body.data.id,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
            },
          }
        );
        let estado = "";
        if (infoPago.data.status === "approved") {
          estado = "paid";
        } else if (infoPago.data.status === "pending") {
          estado = "pendiente";
        } else {
          estado = "cancel";
        }
        console.log("estado", estado);
        if (estado === "paid" || estado === "cancel") {
          const status = await statusOrderFunction(
            infoPago.data.additional_info.items[0].description,
            estado
          );
          console.log("status", status);
          if (estado === "paid") {
            paidEmail(id, "paid");
          } else {
            paidEmail(id, "cancel");
          }
        }
      } catch (error) {
        res.status(400).send("algo fallo");
      }
    };
    fetch(req.body).catch(function (e) {
      console.log(e);
    });
  } else {
    // console.log("body else");
    // console.log(req.body);
    // const fetch = async (body) => {
    //   try {
    //     console.log(body.id);
    //     const infoPago = await axios.get(
    //       "https://api.mercadopago.com/v1/payments/" + body.id
    //     );
    //     console.log(body.additional_info.items[0].id);
    //     console.log(body.status);
    //     // const status = await statusOrderFunction(
    //     //   body.additional_info.items[0].id,
    //     //   body.status
    //     // );
    //   } catch (error) {
    //     res.status(400).send("algo fallo");
    //   }
    // };
    // fetch(req.body)
    //   .then(function (value) {
    //     console.log(value); // "Success!"
    //     return value;
    //   })
    //   .catch(function (e) {
    //     console.log(e);
    //   });
  }
});

export default router;
