import React, { Component } from 'react';
import '../App.css';
import BookLBox from './BookLBox'
import AppHeader from "./Header";
import "../scenes/Books/books.css";
import Lightbox from 'react-image-lightbox';
import axios from 'axios';
const queryString = require('query-string');
const today = new Date();

class AuthorView extends Component {

  constructor(props)
  {
    super(props);
    // Holds books in the DB
    this.state = {
      author: "" ,
      authorBooks: [] ,
      imgSrc: "https://source.unsplash.com/6H9H-tYPUQQ/800x600",
      lBoxOpen: false
    }
  }

  componentDidMount()
  {
    var parsed = queryString.parse(this.props.location.search);
    console.log("Query string: " + parsed.author); // replace param with your own
    var htmlReq = 'http://localhost:4100/books/findByAuthor/' + parsed.author;
      axios.get(htmlReq)
      .then((response) => {
        console.log("Books: " + response.data[0]);
        this.setState({
          authorBooks: response.data ,
          author: parsed.author
        });
      });
  }

  displayTitle(data)
  {
      if(data.author)
        return data.author;
  }

  displayBooks(data)
  {
    if (data.authorBooks)
    {
        console.log("function called! Books: " + data.authorBooks);
        const bookList = data.authorBooks.map((d) =>
        <div key = {d.isbn} className="col-md-12 book-author">
        <a href={"/book-view/?isbn=" + d.isbn }><img src={this.state.imgSrc}/></a>
        <p> Book title: {d.title} </p>
        </div>);

        return (
         <div className="row">
         {bookList}
         </div>
         );
    }
  }


  render() {
    return (
      <div className = "container">
      <div className = "row">
        <div className="App">
          <AppHeader />
        </div>
      </div>
      <div className = "row">
          <div className = "col-md-12 text-center book-header">
          <b>{this.displayTitle(this.state)}</b>
          </div>
      </div>

      <hr/>

      <div className = "row">
          {this.displayBooks(this.state)}
      </div>

      </div>
      );
  }
}

export default AuthorView;
