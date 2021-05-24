import { OrderProduct } from './order-product'

export interface Order {
    id: number,
    date: Date,
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    city: string,
    pinCode: string,
    phone: string,
    orderProducts: OrderProduct[],
    paymentId: number,
    shippingId: number,
    totalPrice: number,
    state: string
}