import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PizzaCard from "../components/PizzaCard";
import { Container, Row, Col } from "react-bootstrap";
import { getAllPizzas } from "../actions/pizzaAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Filters from "../components/Filters";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pizzastate = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzastate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <>
      <Container className="my-2">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          <Row>
            <Filters />
            {pizzas.map((pizza, i) => (
              <Col md={4} key={i}>
                <PizzaCard pizza={pizza} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
