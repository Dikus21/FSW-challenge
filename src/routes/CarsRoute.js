import express from "express";
import {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    getAddCarForm,
    loginPage
} from "../controller/CarsController.js";
import upload from "../utils/Upload.js";

const  route = express.Router();
console.log("ROUTE = " + route.get)

route.get("/", loginPage);
route.get("/cars", getCars);
route.get("/cars/add", getAddCarForm);
route.get("/cars/:id", getCarById);
route.post("/cars", upload.single("image"), createCar);
route.put("/cars/edit/:id", upload.single("image"), updateCar);
route.delete("/cars/delete/:id", deleteCar);

export default route;