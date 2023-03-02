import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../utils/request";
import "./success.scss";

const Success = () => {
  const {search} = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  // update order
  useEffect(() => {
    const makeRequest = async () => {
      try {
        await userRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success">
      <h1>Payment successful.</h1>
      <span>
        You are being redirected to the orders page. Please don't close the page.
      </span>
    </div>
  );
};

export default Success;