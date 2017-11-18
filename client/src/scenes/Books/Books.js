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

    // prepares state for everything that we will need
    this.state = {
      books: [], // List of books retrieved from server
      activePage: 1, // Current page used for pagination
      gridView: true // WHich view that is currently displayed
    };

    // Binding the folowing functions in order to pass them down as props
    this.handleSelectPage = this.handleSelectPage.bind(this);
    this.showGrid = this.showGrid.bind(this);
    this.showList = this.showList.bind(this);
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

  showList() {
    this.setState({ gridView: false });
  }

  showGrid() {
    this.setState({ gridView: true });
  }

  handleSelectPage(newPage) {
    this.setState({
      activePage: newPage
    });
  }
  render() {
    const { activePage, gridView } = this.state;
    const books = this.state.books.slice(
      (activePage - 1) * PAGE_SIZE,
      activePage * PAGE_SIZE
    );

    // Place component in variable and load correct component when done
    let booksDisplay = gridView
      ? books.map((book, index) => <Book key={index} book={book} />)
      : "Not Yet Implemented";
    let paginationDispaly = gridView ? (
      <Col xs={12} className="text-right">
        <ListPagination
          activePage={activePage}
          items={Math.ceil(this.state.books.length / PAGE_SIZE)}
          onSelect={this.handleSelectPage}
        />
      </Col>
    ) : (
      ""
    );

    return (
      <div className="books-wrapper">
        <div className="OptionsBar">
          <OptionsBar showGrid={this.showGrid} showList={this.showList} />
        </div>
        <div className="book-items">{booksDisplay}</div>
        {paginationDispaly}
      </div>
    );
  }
}

export default Books;
