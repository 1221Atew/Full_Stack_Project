export type Products = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: number,
    countInStock: number
    quantity: number,
}
export type Users = {
    firstName: string;
    lastName: string;
    age: number;
    postCode: string;
    address: string;
    email: string;
    password: string
}
export type Orders ={
    date: Date;
    userId: string,
    productOrder: Products[]
}