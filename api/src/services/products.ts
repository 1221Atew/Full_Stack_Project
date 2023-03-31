import Product, { Products } from "../models/Product";

const createProduct = async (product: Products): Promise<Products>=>{
    return product.save();
}
const getProductList = async (): Promise<Products[]>=>{
    return Product.find();
}
const getProductById = async (productId: number): Promise<Products | null>=>{
    const foundProduct=  Product.findOne({id: productId});
    return foundProduct;
}
const updateProduct = async (productId: string, update: Partial<Products>): Promise<Products |null>=>{
    return Product.findByIdAndUpdate(productId, update, {new: true});
}
const deleteProduct = async (productId: string): Promise<Products | null>=>{
    return Product.findByIdAndDelete(productId)
}
export default { createProduct,getProductList, updateProduct, deleteProduct, getProductById}