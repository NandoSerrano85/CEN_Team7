import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React, { Component } from "react";

let order = "desc";

class BookListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: this.formatList(props.books)
    };
  }

  formatList(books) {
    return books.map(book => {
      let ratings = book.ratings.map(r => r.rating);
      return {
        isbn: book.isbn,
        title: book.title,
        author: book.author.name,
        rating:
          ratings.reduce((total, score) => total + score) / ratings.length,
        price: book.price || 0,
        release_date: book.publishing ? book.publishing.release_date : "Unknown"
      };
    });
  }

  handleBtnClick = () => {
    if (order === "desc") {
      this.refs.table.handleSort("asc", "name");
      order = "asc";
    } else {
      this.refs.table.handleSort("desc", "name");
      order = "desc";
    }
  };

  render() {
    let { books } = this.state;
    const options = {
      page: 1,
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        }
      ],
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 4, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "bottom",
      withFirstAndLast: false
    };

    return (
      <div className="BookListView">
        <BootstrapTable ref="table" data={books} pagination options={options}>
          <TableHeaderColumn dataField="isbn" isKey dataSort={true}>
            ISBN
          </TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort={true}>
            Title
          </TableHeaderColumn>
          <TableHeaderColumn dataField="author" dataSort={true}>
            Author
          </TableHeaderColumn>
          <TableHeaderColumn dataField="price" dataSort={true}>
            Price
          </TableHeaderColumn>
          <TableHeaderColumn dataField="rating" dataSort={true}>
            Rating
          </TableHeaderColumn>
          <TableHeaderColumn dataField="release_date" dataSort={true}>
            Releate Date
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default BookListView;
