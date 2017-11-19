import React, { Component } from "react";
import "./books.css";
import {
  Col,
  Panel,
  Glyphicon,
  DropdownButton,
  MenuItem,
  Button,
  ButtonToolbar
} from "react-bootstrap";

class OptionBar extends Component {
  constructor(props) {
    super(props);
  }

  onRatingSelect = (eventKey, event) => {
    this.props.handleBrowseSelect("Rating", eventKey);
  };

  onGenreSelect = (eventKey, event) => {
    this.props.handleBrowseSelect("Genre", eventKey);
  };

  render() {
    let { book, showGrid, showList, genres, handleBrowseSelect } = this.props;

    return (
      <Col md={12}>
        <Panel className="options">
          <div className="option-panel-wrapper">
            <div className="views">
              <span className="list">
                <Button bsSize="xsmall" onClick={showList}>
                  <Glyphicon glyph="list" /> List
                </Button>
              </span>
              <span className="grid">
                <Button bsSize="xsmall" onClick={showGrid}>
                  <Glyphicon glyph="th" /> Grid
                </Button>
              </span>
            </div>
            <div className="search-form">
              <strong> Browse Books By:</strong>
              {/* NOTE: we can probably change this to a select and render from an array once we have genres*/}
              <ButtonToolbar>
                <DropdownButton
                  bsStyle="default"
                  title="Genre"
                  id="1"
                  onSelect={this.onGenreSelect}
                >
                  <MenuItem eventKey="Fiction">Fiction</MenuItem>
                  <MenuItem eventKey="Non-Fiction">Non-Fiction</MenuItem>
                  <MenuItem eventKey="All">All</MenuItem>
                </DropdownButton>
                <DropdownButton
                  bsStyle="default"
                  title="Rating"
                  id="2"
                  onSelect={this.onRatingSelect}
                >
                  <MenuItem eventKey={1}>1 Star</MenuItem>
                  <MenuItem eventKey={2}>2 Stars</MenuItem>
                  <MenuItem eventKey={3}>3 Stars</MenuItem>
                  <MenuItem eventKey={4}>4 Stars</MenuItem>
                  <MenuItem eventKey={5}>5 Stars</MenuItem>
                </DropdownButton>
                <Button
                  id="3"
                  onClick={() => {
                    handleBrowseSelect("TopSeller", null);
                  }}
                >
                  Top Sellers
                </Button>
              </ButtonToolbar>
            </div>
          </div>
        </Panel>
      </Col>
    );
  }
}

export default OptionBar;
