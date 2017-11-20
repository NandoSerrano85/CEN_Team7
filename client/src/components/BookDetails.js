import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import axios from 'axios';
import BookService from './BookService'
import ReactModal from 'react-modal';

class BookDetails extends Component {

  constructor(props)
  {
    super(props);
    // Holds books in the DB
    this.state = { books: [] }
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
    var imgSource = "http://via.placeholder.com/200x100";
    const bookList = data.books.map((d) =>
    <div key = {d.isbn} className="col-md-3 books-list">
    <a href={"book-view/?isbn=" + d.isbn +"&img=" + imgSource}><img src="http://via.placeholder.com/200x100"/></a>
    </div>);

    return (
     <div className="row">
     {bookList}
     </div>
     );
  }

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
