import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { getAllPizzas, deletePizza } from "../../actions/pizzaAction";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const PizzasList = () => {
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Pizza Name</th>
                <th>Pricez</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pizzas &&
                pizzas.map((pizza) => (
                  <tr key={pizza._id}>
                    <td>
                      {" "}
                      <img
                        src={pizza.image}
                        alt={pizza.name}
                        width="100px"
                        height="80px"
                      />{" "}
                    </td>
                    <td> {pizza.name} </td>
                    <td>
                      Small : {pizza.prices[0]["small"]} <br />
                      Medium : {pizza.prices[0]["medium"]} <br />
                      Large : {pizza.prices[0]["large"]}
                    </td>
                    <td> {pizza.category} </td>
                    <td>
                      <Link to={`/admin/editpizza/${pizza._id}`}>
                        <AiFillEdit style={{ cursor: "pointer" }} />
                      </Link>
                      &nbsp;{" "}
                      <AiFillDelete
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deletePizza(pizza._id));
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default PizzasList;
