import express from "express";
import * as data from "./data.js"
const app = express();

app.get("/",(req,res) => {
    res.send("API page Home")
})

// b1
app.get("/customers",(req,res) => {
    res.send(data.customers)
})

// b2
app.get("/customers/:id",(req,res) => {
    const paramId = req.params.id;
    const customer = data.customers.find((c) =>  c.id === paramId
    )
    if(!customer){
        res.send(404,"Customer NotFound")
    }
    res.send(customer)
})

// b3



app.listen(3000,() => {
    console.log("Server is running");
})