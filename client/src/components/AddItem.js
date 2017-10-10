import React, { Component } from 'react';
import '../App.css';
import ItemService from "./ItemService";

class AddItem extends Component {
    constructor(prop){
        super(prop);
        this.state = {title: '',
                      isbn: '',
                      pages: '',
                      price:'',
        };
        this.addItem = new ItemService();

        this.changeValue = this.changeValue.bind(this);
        this.addToDB = this.addToDB.bind(this);
        }

        changeValue(event){
            this.setState({
                isbn: event.target.isbn,
                pages: event.target.pages,
                price: event.target.price,
                title: event.target.title,
            });

        }
        addToDB(event){
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
                            <form onSubmit={this.addToDB}>
                                <label>
                                    Title:
                                  <input type="text" value={this.state.title} onChange={this.changeValue} className="form-control"/>
                                </label><br/>
                                <label>
                                    ISBN:
                                  <input type="text" value={this.state.isbn} onChange={this.changeValue} className="form-control"/>
                                </label><br/>
                                <label>
                                    Pages:
                                  <input type="number" value={this.state.pages} onChange={this.changeValue} className="form-control"/>
                                </label><br/>
                                <label>
                                    Price:
                                  <input type="number" value={this.state.price} onChange={this.changeValue} className="form-control"/>
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

export default AddItem;
