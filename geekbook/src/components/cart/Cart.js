import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Products from '../../models/product';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            cart:[],
            totalItems: 0,
            totalAmount: 0,
            quantity: 1,
        }
    }
    prodCheck(id){
        let cart = this.state.cart;
        return cart.some(function(item){
            return item.id === id;
        });
    }
    addToCart(data){
        let cartItem = this.state.cart;
        let prodId = data.id;
        let prodQty = data.in_stock;
        if(this.prodCheck(prodId)){
            let index = cartItem.findIndex((x => x.id == prodId));
            cartItem[index].quantity = Number(cartItem[index].quantity) + Number(prodQty);
            this.setState({
                cart:cartItem
            })
        } else {
            cartItem.push(data);
        }
    }
}
