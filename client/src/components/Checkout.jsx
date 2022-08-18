import React from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

const Checkout = ({ subTotal }) => {
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const dispatch = useDispatch();
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Order placed successfully" />}

      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51KnP0PSIJqXqc0IZGPywifxeqNBCQbDjH8Reh1676Pr0DBsbbfQQmXx0NCzGX12yq57buUqNmF9xcaO1Y5vA812400I28OET12"
        currency="INR"
      >
        {success ? <Button>Paid</Button> : <Button>Pay Now</Button>}
      </StripeCheckout>
    </>
  );
};

export default Checkout;
