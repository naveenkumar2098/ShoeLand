import { Review } from "./review";

export interface Product {
    id: number,
    name: string,
    maker: string,
    price: number,
    images: string[],
    sizes: string[],
    description: string,
    rating: number,
    stock: number,
    userLimit: number,
    reviews: Review[]
}