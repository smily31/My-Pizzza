import axios from "axios";
import Swal from 'sweetalert2';

export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
        const res = await axios.get("/api/pizzas/getAllPizzas");
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_PIZZAS_FAIL", payload: err });
    }
};

export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: "ADD_PIZZA_REQUEST" });
    try {
        const res = await axios.post("/api/pizzas/addpizza", { pizza });
        dispatch({ type: "ADD_PIZZA_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "ADD_PIZZA_FAIL", payload: err });
    }
};

export const getPizzaById = (pizzaId) => async (dispatch) => {
    dispatch({ type: "GET_PIZZABYID_REQUEST" });
    try {
        const res = await axios.post("/api/pizzas/getpizzabyid", { pizzaId });
        dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_PIZZABYID_FAIL", payload: err });
    }
};

export const updatePizza = (updatedPizza) => async (dispatch) => {
    dispatch({ type: "UPDATE_PIZZABYID_REQUEST" });
    try {
        const res = await axios.post("/api/pizzas/updatepizza", { updatedPizza });
        dispatch({ type: "UPDATE_PIZZABYID_SUCCESS", payload: res.data });
        window.location.href = "/admin/pizzalist";
    } catch (err) {
        dispatch({ type: "UPDATE_PIZZABYID_FAIL", payload: err });
    }
};

export const deletePizza = (pizzaId) => async dispatch => {
    try {
        const res = await axios.post("/api/pizzas/deletepizza", { pizzaId });
        Swal.fire({
            icon: 'success',
            text: 'Pizza deleted successfully!'
        });
        window.location.href = "/admin/pizzalist";
        console.log(res);
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            text: 'Error while deleting Pizza!'
        });
    }
};

export const filterPizza = (searchkey, category) => async (dispatch) => {
    let filteredPizza;
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
        const res = await axios.get("/api/pizzas/getAllPizzas");
        filteredPizza = res.data.filter((pizza) =>
            pizza.name.toLowerCase().includes(searchkey)
        );
        if (category !== "all") {
            filteredPizza = res.data.filter((pizza) => pizza.category.toLowerCase() === category);
        }
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizza });
    } catch (error) {
        dispatch({ type: "GET_PIZZAS_FAIL", payload: error });
    }
};