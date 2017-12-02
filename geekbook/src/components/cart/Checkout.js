import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header';
import '../../App.css';

class Checkout extends Component{
    constructor(props){
        super(props);
        this.state = {
            total: '',
        }
    }
    componentDidMount()
    {
        axios.get('http://localhost:4200/cart/checkout', {withCredentials: true})
        .then((response) => {
            this.setState({ total: response.data.total })
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render(){
        return(
            <div className='checkout'>
                <div className="navbar">
                    <Header />
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">


                            <h1>Checkout</h1>
                            <h4>Total: ${this.state.total}</h4>

                            <form action="/checkout" method="post" id="checkout-form">

                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" className="form-control" required name="name"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <label for="address">Address</label>
                                            <input type="text" id="address" className="form-control" required name="address"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <label for="card-name">Name on card</label>
                                            <input type="text" id="card-name" className="form-control" required/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <label for="card-number">Credit Card Number</label>
                                            <input type="text" id="card-number" className="form-control" required/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="row">
                                            <div className="col-xs-6">
                                                <div className="form-group">
                                                    <label for="card-expiry-month">Month of expiration date</label>
                                                    <input type="text" id="card-expiry-month" className="form-control" required/>
                                                </div>
                                            </div>
                                            <div className="col-xs-6">
                                                <div className="form-group">
                                                    <label for="card-expiry-year">Year of expiration date</label>
                                                    <input type="text" id="card-expiry-year" className="form-control" required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <label for="card-cvc">CCV</label>
                                            <input type="text" id="card-cvc" className="form-control" required/>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success">Complete</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;
