import React from "react";
import { Component} from '../framework/Annotations';
import { ShoppingService } from "../services/ShoppingService";
import { Product } from "../entities/Product";
import { ProductItem } from "./ProductItem";

export interface ProductsProps {
    shoppingService?: ShoppingService;
}

export interface ProductsState {
    products: Product[];
}

@Component({
    dependencies: {
        shoppingService: ShoppingService
    }
})
export class Products extends React.Component<ProductsProps, ProductsState> {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    render() {
        return <div className="products">
            <div className="list-group">
                {this.state.products.map(product => <ProductItem product={product} addProductHandler={this.addToCart.bind(this)}/>)}
            </div>
        </div>;
    }
    
    componentDidMount() {
        this.props.shoppingService.getProducts()
            .then(products => this.setState({ products }));
    }

    addToCart(product: Product) {
        this.props.shoppingService.addToCart(product);
    }

} 