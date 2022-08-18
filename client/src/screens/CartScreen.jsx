import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { addToCart, deleteFromCart } from "../actions/cartAction";
import Checkout from "../components/Checkout";

const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  const subTotal = cartItems.reduce((x, item) => x + item.price, 0);

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h1>My Cart</h1>
            <Row>
              {cartItems.map((item) => (
                <>
                  <Col md={4}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "80px",
                        borderRadius: "10px",
                      }}
                    />
                  </Col>
                  <Col md={7}>
                    <h5>
                      {item.name} [{item.varient}]
                    </h5>
                    <h6>
                      Price : {item.quantity} x {item.prices[0][item.varient]} ={" "}
                      {item.price}
                    </h6>
                    <h6>
                      Quantity : &nbsp;
                      <AiOutlineMinusCircle
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity - 1, item.varient)
                          );
                        }}
                      />
                      &nbsp; {item.quantity}
                      &nbsp;{" "}
                      <AiOutlinePlusCircle
                        className="text-success"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity + 1, item.varient)
                          );
                        }}
                      />
                      &nbsp; &nbsp; &nbsp;
                      <MdDelete
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deleteFromCart(item));
                        }}
                      />
                    </h6>
                  </Col>
                  <hr />
                </>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <h1>Payment Information</h1>
            <h4>Sub Total </h4>
            <h4>RS : {subTotal} /-</h4>
            <Checkout subTotal={subTotal} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
