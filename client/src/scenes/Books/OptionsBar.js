import React from "react";
import {
  Col,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";

function OptionBar(props) {
  let { book } = props;

  return (
    <Col md={12}>
      <Panel className="options">
        <Form inline>
          <FormGroup controlId="formInlineSearch">
            <ControlLabel>Search</ControlLabel>{" "}
            <FormControl type="text" placeholder="Search Term" />
          </FormGroup>
          <Button type="submit">Search </Button>
        </Form>
      </Panel>
    </Col>
  );
}

export default OptionBar;
