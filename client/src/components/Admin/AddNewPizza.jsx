import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addPizza } from "../../actions/pizzaAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Success from "../../components/Success";

const AddNewPizza = () => {
  const [name, setname] = useState("");
  const [smallPrice, setsmallPrice] = useState();
  const [mediumPrice, setmediumPrice] = useState();
  const [largePrice, setlargePrice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const addPizzaState = useSelector((state) => state.addPizzaReducer);
  const { loading, error, success } = addPizzaState;

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const pizza = {
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
    dispatch(addPizza(pizza));
  };

  return (
    <>
      <div>
        {loading && <Loader />}
        {error && <Error error="Something went wrong while adding pizza" />}
        {success && <Success success="Pizza added successfully" />}

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
            Add New Pizza
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddNewPizza;
