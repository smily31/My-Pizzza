import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaById, updatePizza } from "../../actions/pizzaAction";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const EditPizza = ({ match }) => {
  const [name, setname] = useState("");
  const [smallPrice, setsmallPrice] = useState();
  const [mediumPrice, setmediumPrice] = useState();
  const [largePrice, setlargePrice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const dispatch = useDispatch();
  const getPizzaByState = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error } = getPizzaByState;
  const updatePizzaState = useSelector((state) => state.updatePizzaByIdReducer);
  const { updateloading } = updatePizzaState;

  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaId) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setimage(pizza.image);
        setsmallPrice(pizza.prices[0]["small"]);
        setmediumPrice(pizza.prices[0]["medium"]);
        setlargePrice(pizza.prices[0]["large"]);
      } else {
        dispatch(getPizzaById(match.params.pizzaId));
      }
    } else {
      dispatch(getPizzaById(match.params.pizzaId));
    }
  }, [pizza, dispatch, match.params.pizzaId]);

  const submitForm = (e) => {
    e.preventDefault();
    const updatedPizza = {
      _id: match.params.pizzaId,
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    };
    dispatch(updatePizza(updatedPizza));
  };

  return (
    <>
      <div>
        {updateloading && <Loader />}
        {error && <Error error="Something went wrong while adding pizza" />}

        <Form onSubmit={submitForm} className="bg-light p-4">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter Pizza's Name"
              />
            </Form.Group>

            <Row className="mb-3 mt-3">
              <Form.Group as={Col} controlId="formGridSmallPrice">
                <Form.Label>Small Price</Form.Label>
                <Form.Control
                  type="text"
                  value={smallPrice}
                  onChange={(e) => setsmallPrice(e.target.value)}
                  placeholder="Enter Small Pizza's Price"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMediumPrice">
                <Form.Label>Medium Price</Form.Label>
                <Form.Control
                  type="text"
                  value={mediumPrice}
                  onChange={(e) => setmediumPrice(e.target.value)}
                  placeholder="Enter Medium Pizza's Price"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLargePrice">
                <Form.Label>Large Price</Form.Label>
                <Form.Control
                  type="text"
                  value={largePrice}
                  onChange={(e) => setlargePrice(e.target.value)}
                  placeholder="Enter Large Pizza's Price"
                />
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="formGridImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                placeholder="Add Image URL"
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Write Description about your Pizza"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              placeholder="Specify Category"
            />
          </Form.Group>
          <br />
          <Button variant="success" type="submit">
            Update Pizza
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditPizza;
