import React, { Component } from 'react';
import '../App.css';
import itemService from "./itemService";

class itemDetails extends Component {
    constructor(prop){
        super(prop);
        this.state = {value: ''};
        this.addItem = new itemService();

        this.changeQuantity = this.changeQuantity.bind(this);
        this.addToCart = this.addToCart.bind(this);
        }

        changeQuantity(event){
            this.setState({value: event.target.value});
        }
        addToCart(event){
            event.preventDefault();
            this.addItem.sendData(this.state.value);
            this.props.history.push('/');
        }
        render() {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-8">
                            <h3 className="book-title">Title</h3>
                        </div>
                        <div className="col-sm-2">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-4">
                            <p>image here</p>
                            <p>rating</p>
                        </div>
                        <div className="col-sm-4">
                            <p>description: the description of the book</p>
                            <form onSubmit={this.addToCart}>
                                <label>
                                    Qty:
                                  <input type="text" value={this.state.value} onChange={this.changeQuantity} className="form-control"/>
                                </label><br/>
                                <input type="submit" value="addToCart" className="btn btn-primary"/>
                            </form>
                        </div>
                        <div className="col-sm-2">
                        </div>
                    </div>
                </div>
            );
        }

}

export default itemDetails;
