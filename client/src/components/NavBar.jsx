import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { IoMdCart, IoMdLogIn } from "react-icons/io";
import { logoutUser } from "../actions/userAction";

const NavBar = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            {/* <Image src="images/logo.png" alt="logo" /> */}
            <h1>One Stop for Your Thirst For Pizza</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                currentUser.isAdmin ? (
                  <LinkContainer to="/admin">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {currentUser.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <LinkContainer to="/admin/orderlist">
                          <Dropdown.Item>Order List</Dropdown.Item>
                        </LinkContainer>
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </LinkContainer>
                ) : (
                  <LinkContainer to="/">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {currentUser.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <LinkContainer to="/orders">
                          <Dropdown.Item>My Orders</Dropdown.Item>
                        </LinkContainer>
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </LinkContainer>
                )
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      {" "}
                      <IoMdLogIn /> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      {" "}
                      <IoMdLogIn /> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              <LinkContainer to="/cart">
                <Nav.Link>
                  {" "}
                  <IoMdCart /> Cart {cartState.cartItems.length}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
