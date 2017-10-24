import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import BookService from './BookService'

var books = new BookService();
var booksList = books.getBooks();

class BookDetails extends Component {

  // axios.get('http://localhost:4100/books')
  // .then(function(response){
  //   var books = response.data;
  // });
  // AJAX call, gets all books from database
  // getBooks() {
  //   axios.get('http://localhost:4100/books')
  //   .then(function(response){
  //     this.books = response.data;
  //     render() {
  //       return (
  //          <h1> {this.books} </h1>
  //        );js
  //     };
  //   });
  // };

  // Display book details
  render() {
    return (
      <h1> jah man </h1>
    )
  };

}


export default BookDetails;
