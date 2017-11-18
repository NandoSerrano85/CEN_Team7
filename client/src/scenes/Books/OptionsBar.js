import React from "react";
import "./books.css";
import {
  Col,
  Panel,
  Glyphicon,
  DropdownButton,
  MenuItem,
  Button
} from "react-bootstrap";

function OptionBar(props) {
  let { book, showGrid, showList } = props;

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
            <DropdownButton
              bsStyle="default"
              title="Browse Boooks By:"
              id="dropdown-no-caret"
            >
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
          </div>
        </div>
      </Panel>
    </Col>
  );
}

export default OptionBar;
