import React from "react";
import "./books.css";
import { Col, Panel } from "react-bootstrap";

function Book(props) {
  let { book } = props;

  return (
    <Col lg={3} md={4} sm={6}>
      <Panel className="book">
        <div className="book-img-wrapper">
          <a href={"book-view/?isbn=" + book.isbn}>
            <img
              alt={book.title || "No Title"}
              className="img-responsive product-img"
              src="https://source.unsplash.com/6H9H-tYPUQQ/800x600"
            />
          </a>
        </div>

        <h5 className="ellipsis book-brand-name" title={book.author.name}>
          {`By: ${book.author.name || "Unkown"}`}
        </h5>
        <h4 className="ellipsis" title={book.title}>
          <a href={"book-view/?isbn=" + book.isbn}>{book.title}</a>
        </h4>

        <div className="pull-right h4 book-price">{`${book.price || 0}$`}</div>
      </Panel>
    </Col>
  );
}

export default Book;
