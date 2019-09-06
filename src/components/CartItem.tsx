import React from 'react';
import { CartItem as ICartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';

export interface CartItemProps {
    cartItem: ICartItem
    removeItemHandler: (item: Product) => void;
    addItemHandler: (item: Product) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ cartItem, removeItemHandler, addItemHandler }) => {
    return <li className="list-group-item d-flex justify-content-between align-items-center">
        {cartItem.product.name}
        <div className="badge badge-light">&#x20b9; {cartItem.product.price}</div>
        X &nbsp;
    <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => removeItemHandler(cartItem.product)}><i
                className="fa fa-minus"></i></button>
            <button type="button" className="btn btn-primary btn-sm" disabled={true}>{cartItem.quantity}</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => addItemHandler(cartItem.product)}><i
                className="fa fa-plus"></i></button>
        </div>
  </li>;
}