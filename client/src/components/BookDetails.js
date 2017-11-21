import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import axios from 'axios';
import BookService from './BookService'
<<<<<<< HEAD

class BookDetails extends Component {

  constructor(props) {
    super(props);
    // Holds books in the DB
    this.state = {
      books: []
    }
=======
import ReactModal from 'react-modal';

class BookDetails extends Component {

  constructor(props)
  {
    super(props);
    // Holds books in the DB
    this.state = { books: [] }
>>>>>>> origin/dev_felipe
  }

  componentDidMount()
  {
      axios.get('http://localhost:4100/books')
      .then((response) => {
        //console.log(response.data);
        this.setState({
          books: response.data
        });
      });
  }

  displayBooks(data)
  {
    console.log("function called! Books: " + data.books);
<<<<<<< HEAD
    const bookList = data.books.map((d) => <li key={d.isbn}>
    {"Title: " + d.title}
    </li>);

    return (
     <div>
     {bookList }
=======
    var imgSource = "http://via.placeholder.com/200x100";
    const bookList = data.books.map((d) =>
    <div key = {d.isbn} className="col-md-3 books-list">
    <a href={"book-view/?isbn=" + d.isbn +"&img=" + imgSource}><img src="http://via.placeholder.com/200x100"/></a>
    </div>);

    return (
     <div className="row">
     {bookList}
>>>>>>> origin/dev_felipe
     </div>
     );
  }

<<<<<<< HEAD
  // Display book details
  render() {
    return (
      <div className = "container">
=======
  displayTest(data)
  {
    return(
      <div className="row">
      {console.log("data:" + data)}
      </div>
    );
  }

  // Display book details
  render() {
    return (
      <div className = "container-fluid">
>>>>>>> origin/dev_felipe
          <div className = "row">
              <div className ="col-md-12 text-center App-header">
                  Books on our shelves
              </div>
          </div>

          <div className = "row">
<<<<<<< HEAD
              <div className ="col-md-12 text-center books-list">
                {this.displayBooks(this.state)}
              </div>
=======
                <div className ="col-md-12 text-center books-list">
                {this.displayBooks(this.state)}
                </div>
>>>>>>> origin/dev_felipe
          </div>

      </div>
    )
  };

}


export default BookDetails;
