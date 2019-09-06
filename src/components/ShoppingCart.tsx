import React from "react";
import { Component } from '../framework/Annotations';
import { ShoppingService } from "../services/ShoppingService";
import { CartItem as ICartItem } from "../entities/CartItem";
import { CartItem } from "./CartItem";

export interface ShoppingCartProps {
    shoppingService?: ShoppingService
}

export interface ShoppingCartState {
    cartItems: ICartItem[];
}

@Component({
    dependencies: {
        shoppingService: ShoppingService
    }
})
export class ShoppingCart extends React.Component<ShoppingCartProps, ShoppingCartState> {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }
    }

    render() {

        const { shoppingService } = this.props;

        return <div className="card">
            <div className="card-header">
                Cart
            </div>
            <div className="card-body">
                {!this.state.cartItems.length && <div className="placeholder">Cart is empty!</div>}
                <div className="cart">
                    <div className="list">
                        <ul className="list-group">
                            {this.state.cartItems.map(item => <CartItem key={item.product.id}
                                cartItem={item}
                                removeItemHandler={shoppingService.removeFromCart}
                                addItemHandler={shoppingService.addToCart} />)}
                        </ul>
                    </div>
                    <div className="checkout"></div>
                </div>
            </div>
            <div className="card-footer text-muted">
                <h3 className="badge badge-success pull-right">&#x20b9; {this.props.shoppingService.getCartTotal()}</h3>
                <button type="button" className="btn btn-primary">
                    <i className="fa fa-money"></i> Checkout</button>
            </div>
        </div>;
    }

    componentDidMount() {
        this.props.shoppingService.subscribeToShopping(cartItem => {
            const cartItems = this.props.shoppingService.getCartItems();
            this.setState({ cartItems });
        });
    }

}