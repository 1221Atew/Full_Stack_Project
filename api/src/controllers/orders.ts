import { Request, Response } from "express";

import Order from "../models/Orders";
import OrderServices from "../services/orders"

export const createOrderCotroller = async (request: Request, response: Response) =>{
    try {
        const newOrder = new Order({
            userId: request.params.userId,
            productOrder: request.body.productOrder 
        })
        const order = await OrderServices.createOrder(newOrder)
        response.json(order)
    }
    catch(error){
        console.log(error);
    }
}
export const getOrdersCotroller = async (request: Request, response: Response) =>{
    try {
        const orders = await OrderServices.getOrdersByUserId(request.params.userId)
        response.json(orders)
    }
    catch(error){
        console.log(error);
    }
}
export const updateOrderCotroller = async (request: Request, response: Response) =>{
    try {
        const order = await OrderServices.updateOrder(request.params.id, request.body);
        response.json(order)
    }
    catch(error){
        console.log(error);
    }
}
export const deleteOrderCotroller = async (request: Request, response: Response) =>{
    try {
        const order = await OrderServices.deleteOrder(request.params.id);
        response.json(order)
    }
    catch(error){
        console.log(error);
    }
}