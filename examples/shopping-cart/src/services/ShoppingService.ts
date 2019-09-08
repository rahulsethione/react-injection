import { HttpService } from "./HttpService";
import { Product } from "../entities/Product";
import { products } from "../data/products";
import { CartItem } from "../entities/CartItem";
import { Service, Subject } from 'react-inject';

@Service({
    dependencies: [HttpService]
})
export class ShoppingService {
    private products: Product[] = [];
    private cartItemMap: Map<Product, number> = new Map();
    private shoppingSubject: Subject<CartItem> = new Subject();

    constructor(private httpService: HttpService) {
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    getProducts(): Promise<Product[]> {
        this.products = products;
        return Promise.resolve([...this.products]);
    }

    addToCart(product: Product) {
        let quantity: number;
        if (this.cartItemMap.has(product)) {
            quantity = this.cartItemMap.get(product) + 1;
        } else {
            quantity = 1; 
        }

        this.cartItemMap.set(product, quantity);
        this.shoppingSubject.dispatch({ product, quantity });
    }

    removeFromCart(product: Product) {
        let quantity: number;
        if (this.cartItemMap.has(product)) {
            if(this.cartItemMap.get(product) > 1) {
                quantity = this.cartItemMap.get(product) - 1;
                this.cartItemMap.set(product, quantity);
            } else {
                quantity = 0;
                this.cartItemMap.delete(product);
            }
        }

        this.shoppingSubject.dispatch({ product, quantity });
    }

    getCartItems(): CartItem[] {
        return Array.from(this.cartItemMap.entries())
            .map(entry => ({ product: entry[0], quantity: entry[1] }));
    }

    subscribeToShopping(subscriber: (cartItem: CartItem) => void) {
        this.shoppingSubject.subscribe(subscriber);
    }

    getCartTotal() {
        return this.getCartItems()
            .reduce((result, currentValue) => result + currentValue.quantity * currentValue.product.price, 0);
    }
}