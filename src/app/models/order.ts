import { Product } from "./product"

export interface Order{
    name : string
    email : string
    phone : string
   address : string
   orderProducts : Product[]
}