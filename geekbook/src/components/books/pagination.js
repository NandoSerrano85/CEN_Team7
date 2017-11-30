import React from "react";

import { Pagination } from "react-bootstrap";

function ListPagination(props) {
  return (
    <Pagination
      activePage={props.activePage}
      first
      items={props.items}
      last
      maxButtons={5}
      next
      onSelect={props.onSelect}
      prev
    />
  );
}

ListPagination.defaultProps = {
  activePage: 1,
  items: 1,
  onSelect: () => {}
};

export default ListPagination;
