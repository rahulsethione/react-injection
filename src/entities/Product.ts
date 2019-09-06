export interface Product {
    id: number;
    name: string;
    price: number;
    descriptions?: string;
    discountPercentage?: number;
    imageUrl?: string;
}