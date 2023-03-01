import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {userRequest} from "../../utils/request";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useParams } from "react-router-dom";
import "./pay.scss";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe("pk_test_51MH7y7DI8Wx9xPI54KyMHdXEQviHF04P41ye1wdA3kLxeGWk4sM7iFjzVKlULvyC5po81gkvBWVFxmVBfaEBBL740008dj7c13");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const {gigId} = useParams();

  // payment intent
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(`/create-payment-intent/${gigId}`);
        setClientSecret(res.data.clientSecret);
      } catch(err) {
        console.log(err);
      }
    }
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );

}


export default Pay;