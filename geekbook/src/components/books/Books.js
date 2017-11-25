import React, { Component } from "react";
import axios from "axios";
import BookService from "../../components/BookService";
import BookListView from "./BookListView";
import Book from "./BookView";
import OptionsBar from "./OptionBar";
import { API_URL } from "./config";
import ListPagination from "./pagination";
import { Col, Clearfix } from "react-bootstrap";
import "./books.css";

const PAGE_SIZE = 8;

class Books extends Component {
  constructor(props) {
    super(props);

    // prepares state for everything that we will need
    this.state = {
      allBooks: [], // List of books retrieved from server
      books: [], // List of books based on user choice, originally all
      activePage: 1, // Current page used for pagination
      gridView: true, // WHich view that is currently displayed,
      genres: ["Fiction", "Non-Fiction"] // Should probably be a static list from api
    };

    // Binding the folowing functions in order to pass them down as props
    this.handleSelectPage = this.handleSelectPage.bind(this);
    this.handleBrowseSelect = this.handleBrowseSelect.bind(this);
    this.showGrid = this.showGrid.bind(this);
    this.showList = this.showList.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    let books;
    axios.get(`${API_URL}/books`).then(response => {
      this.setState({ books: response.data, allBooks: response.data });
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

  // This is being done on the frontend for now but realistically, it would be better for these calls
  // to be handled by backend. Have api endpoints for getting genres, topsellers, and ratings
  handleBrowseSelect(category, option) {
    const allBooks = this.state.allBooks;
    switch (category) {
      case "Genre": {
        if (option === "All") {
          this.setState({ books: allBooks });
          return;
        }
        // Filters all the books that the genre string belong to
        let books = allBooks.filter(book => book.genres.indexOf(option) > -1);
        this.setState({ books });
        break;
      }
      case "TopSeller": {
        //NOTE: need an api call to get the top selling books
        break;
      }
      case "Rating": {
        if (option === 1) {
          this.setState({ books: allBooks });
          return;
        }
        // Filters all the books that have that rating
        let books = allBooks.filter(book => {
          // NOTE: API coul probably return an average rating to save on some computation
          let ratings = book.ratings.map(r => r.rating); // gets all the ratings for a given book since they are an array
          let rating =
            ratings.reduce((total, score) => total + score) / ratings.length; // calculates average with reduce function
          return rating === option; // filter by the rating retrieved matching the option selected
        });
        this.setState({ books });
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    const { activePage, gridView, genres } = this.state;
    const books = this.state.books.slice(
      (activePage - 1) * PAGE_SIZE,
      activePage * PAGE_SIZE
    );

    // Place component in variable and load correct component when done
    let booksDisplay = gridView ? (
      books.map((book, index) => <Book key={index} book={book} />)
    ) : (
      <BookListView books={this.state.books} />
    );

    // Only show pagination if current view is grid view
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
          <OptionsBar
            showGrid={this.showGrid}
            showList={this.showList}
            handleBrowseSelect={this.handleBrowseSelect}
            genres={genres}
          />
        </div>
        <div className="book-items">{booksDisplay}</div>
        {paginationDispaly}
      </div>
    );
  }
}

export default Books;
