
import React from 'react';
import { Product } from '../entities/Product';

export interface ProductItemProps {
    product: Product;
    addProductHandler: (product: Product) => void; 
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, addProductHandler }) => {
    return <a href="javascript:void(0)" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1"></h5>
            <label>&#x20b9; {product.price}</label>
        </div>
        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        <a href="javascript:void(0)" className="btn btn-primary btn-small" role="button" onClick={() => addProductHandler(product)}><i className="fa fa-check"></i> Add to cart</a>
    </a>
}