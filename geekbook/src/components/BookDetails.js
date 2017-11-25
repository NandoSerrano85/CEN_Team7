import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import axios from 'axios';
import BookService from './BookService'

class BookDetails extends Component {

  constructor(props) {
    super(props);
    // Holds books in the DB
    this.state = {
      books: []
    }
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
    const bookList = data.books.map((d) => <li key={d.isbn}>
    {"Title: " + d.title}
    </li>);

    return (
     <div>
     {bookList }
     </div>
     );
  }

  // Display book details
  render() {
    return (
      <div className = "container">
          <div className = "row">
              <div className ="col-md-12 text-center App-header">
                  Books on our shelves
              </div>
          </div>

          <div className = "row">
              <div className ="col-md-12 text-center books-list">
                {this.displayBooks(this.state)}
              </div>
          </div>

      </div>
    )
  };

}


export default BookDetails;
