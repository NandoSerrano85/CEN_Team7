import React, { Component } from 'react';
import '../App.css';
import BookLBox from './BookLBox'
import Lightbox from 'react-image-lightbox';
import axios from 'axios';
const queryString = require('query-string');
const today = new Date();

class BookSingle extends Component {

  constructor(props)
  {
    super(props);
    // Holds books in the DB
    this.state = {
      book: [] ,
      imgSrc: "",
      lBoxOpen: false
    }
  }

  componentDidMount()
  {
    var parsed = queryString.parse(this.props.location.search);
    console.log("Query string: " + parsed.isbn); // replace param with your own
    var htmlReq = 'http://localhost:4100/books/findByISBN/' + parsed.isbn;
      axios.get(htmlReq)
      .then((response) => {
        console.log("Book isbn: " + response.data[0]);
        this.setState({
          book: response.data ,
          imgSrc : parsed.img
        });
      });
  }

  displayTitle(data)
  {
      if(data.book[0])
        return data.book[0].title;
  }

  displayDeets(data)
  {
    if(data.book[0])
    {
      return (
      <div className="col-md-6 book-single">
      <p>{"Author: " + data.book[0].author.name}</p> <br/>
      <p>{"Bio: " + data.book[0].author.bio}</p> <br/>
      <p>{"Description: " + data.book[0].description}</p> <br/>
      <p>{"Genres: " + data.book[0].genres}</p> <br/>
      <p>{"Date published: " + today.getFullYear() + ' / ' + (today.getMonth() + 1) + ' / ' + today.getDate()}</p><br/>
      <p>{"Publisher: GeekBooks"}</p> <br/>
      </div>
      );
    }
  }

  render() {
    return (
      <div className = "container-fluid">
        <div className = "row">
            <div className = "col-md-12 App-header text-center">
            {this.displayTitle(this.state)}
            </div>
        </div>
        <div className = "row">
            <div className ="col-md-6 text-center image-container">
               <button> <img id="myImg" onClick={ () => this.setState({ lBoxOpen: true }) } src= {this.state.imgSrc} width = "400" height = "550"/> </button>
            </div>
            {this.displayDeets(this.state)}
        </div>
        <div className = "row">
        {
          this.state.lBoxOpen &&
            <Lightbox
                mainSrc={this.state.imgSrc}
                onCloseRequest={() => this.setState({ lBoxOpen: false })}
            />
          }
        </div>
      </div>
    )
  }
}

export default BookSingle;
