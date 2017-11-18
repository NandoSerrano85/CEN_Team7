import React from "react";
import "./books.css";
import {
  Col,
  Panel,
  Form,
  Glyphicon,
  FormGroup,
  FormControl,
  ControlLabel,
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
                <Glyphicon glyph="list" />
              </Button>
            </span>
            <span className="grid">
              <Button bsSize="xsmall" onClick={showGrid}>
                <Glyphicon glyph="th" />
              </Button>
            </span>
          </div>
          <div className="search-form">
            <Form inline>
              <FormGroup controlId="formInlineSearch" className="search-bar">
                <FormControl type="text" placeholder="Search Term" />
              </FormGroup>
              <Button type="submit" className="btn btn-default">
                Search{" "}
              </Button>
            </Form>
          </div>
        </div>
      </Panel>
    </Col>
  );
}

export default OptionBar;
