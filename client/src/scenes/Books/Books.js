import React, { Component } from "react";
import axios from "axios";
import BookService from "../../components/BookService";
import Book from "./BookView";
import OptionsBar from "./OptionsBar";
import { API_URL } from "../../config";
import ListPagination from "./pagination";
import { Col, Clearfix } from "react-bootstrap";
import "./books.css";

const PAGE_SIZE = 8;

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      activePage: 1
    };

    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    let books;
    axios.get(`${API_URL}/books`).then(response => {
      this.setState({ books: response.data });
    });
  }

  handleSelectPage(newPage) {
    this.setState({
      activePage: newPage
    });
  }
  render() {
    const { activePage } = this.state;
    const books = this.state.books.slice(
      (activePage - 1) * PAGE_SIZE,
      activePage * PAGE_SIZE
    );

    return (
      <div className="books-wrapper">
        <div className="OptionsBar">
          <OptionsBar />
        </div>
        <div className="book-items">
          {books.map((book, index) => <Book key={index} book={book} />)}
        </div>
        <Clearfix />
        <Col xs={12} className="text-right">
          <ListPagination
            activePage={activePage}
            items={Math.ceil(this.state.books.length / PAGE_SIZE)}
            onSelect={this.handleSelectPage}
          />
        </Col>
      </div>
    );
  }
}

export default Books;
