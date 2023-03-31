// product controller
import { Request, Response } from "express";

import Product from "../models/Product";
import ProductServices from "../services/products"

export const createProductCotroller = async (request: Request, response: Response) =>{
    try {
        const newProduct =new Product({
          id: request.body.id,
          title: request.body.title,
          price: request.body.price,
          description: request.body.description,
          category: request.body.category,
          image: request.body.image,
          rating: request.body.rating.rating,
          countInStock: request.body.countInStock,
          quantity: request.body.quantity
        });
        const products = ProductServices.createProduct(newProduct);
        response.json(products);
    }
    catch(error){
        console.log(error);
    }
}
export const getProductsCotroller = async (request: Request, response: Response) =>{
    try {
        const products = await ProductServices.getProductList();
        response.json(products)
    }
    catch(error){
        console.log(error);
    }
}
export const getOneProductCotroller = async (request: Request, response: Response) =>{
    try {
        const productId = Number(request.params.productId)
        const product = await ProductServices.getProductById(productId);
        response.json(product)
    }
    catch(error){
        console.log(error);
    }
}
export const updateProductCotroller = async (request: Request, response: Response) =>{
    try {
        const product = await ProductServices.updateProduct(request.params.id, request.body);
        response.json(product)
    }
    catch(error){
        console.log(error);
    }
}
export const deleteProductCotroller = async (request: Request, response: Response) =>{
    try {
        const product = await ProductServices.deleteProduct(request.params.id);
        response.json(product)
    }
    catch(error){
        console.log(error);
    }
}
