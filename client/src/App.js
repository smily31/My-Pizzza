import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navigation";
import About from "./components/About";
import Contact from "./components/Contact";
import Terms from "./components/Terms";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import AdminScreen from "./screens/AdminScreen";
import EditPizza from "./components/Admin/EditPizza";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <NavBar />
      <Switch>
        <Route path="/about" component={About} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/terms" component={Terms} exact />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/cart" component={CartScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/orders" component={OrderScreen} exact />
        <Route path="/admin" component={AdminScreen} />
        <Route path="/editpizza/:pizzaId" component={EditPizza} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
