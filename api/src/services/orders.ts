import Order, { Orders } from "../models/Orders";

const createOrder = async (order: Orders): Promise<Orders>=>{
    return order.save();
}
const getOrdersByUserId = async (userIdFromRequest: string): Promise<Orders[]>=>{
    return Order.find({userId: userIdFromRequest});
}
const updateOrder = async (orderId: string, update: Partial<Orders>): Promise<Orders |null>=>{
    return Order.findByIdAndUpdate(orderId, update);
}
const deleteOrder = async (userIdFromRequest: string): Promise<Orders | null>=>{
    return Order.findByIdAndDelete({userId: userIdFromRequest})
}
export default {createOrder, getOrdersByUserId, updateOrder, deleteOrder}