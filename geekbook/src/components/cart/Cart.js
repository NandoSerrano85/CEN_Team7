import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CartMode from '../../models/cart';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cart: []
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:4200/cart/shopping-cart')
        .then((response) => {
          //console.log(response.data);
          this.setState({
            cart: response.data
          });
        });
    }
    displayCart(data){
        console.log("function called! Cart: " + data.cart);
        const cartList = data.cart.map((d) => <li className="list-group-item" key={d.id}>
            <span className="badge">{d.title}</span>
            <strong>{d.title}</strong>
            <span className="label label-success">${d.price}</span>
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
                    {cartList }
                </ul>
            </div>
         );
    }

    render(){
        return(
            <div className="row">
                {this.displayCart(this.state)}

            <div className="row">
                <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <strong>Total:price</strong>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <a href="/checkout" type="button" className="btn btn-success">Checkout</a>
                </div>
            </div>
            </div>
        )
    }
}
 export default Cart;
