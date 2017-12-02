import React, {Component} from 'react';
import axios from 'axios';
import CartService from './CartService';
import Header from '../Header';
import '../../App.css';


class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cart: []
        }
        this.service = new CartService();
    }

    componentDidMount()
    {
        axios.get('http://localhost:4200/cart/shopping-cart', {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            this.setState({ cart: response.data })
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    displayCart(data){
        console.log("function called! Cart: " + data.cart.books);
        if (data.cart.books){
            const cartList = data.cart.books.map((d) => <li className="list-group-item" key={d.product._id}>
                <span className="badge">QTY: {d.qty}</span>
                <strong>{d.product.title}   </strong>
                <span className="label label-success">$ {d.price}</span>
                <div className="btn-group">
                    <button className="btn btn-primary btn-xs dropdown-toggle" type="button" data-toggle="dropdown">Options <span class="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><a href="/reduce/{{this.item._id}}">Reduce by 1</a></li>
                        <li><a href="/remove/{{this.item._id}}">Remove</a></li>
                    </ul>
                </div>
            </li>);

            return (
                <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <ul className="list-group">
                        {cartList}
                    </ul>
                </div>
             );
        }
    }

    render(){
        return(
            <div className='cart'>
                <div className="navbar">
                    <Header />
                </div>
                <div className='container'>
                    <div className="row">
                        {this.displayCart(this.state)}

                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                                <strong>Total: {this.state.cart.totalPrice}</strong>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                                <a href="/checkout" type="button" className="btn btn-success">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 export default Cart;
