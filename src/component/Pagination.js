import React, { useContext } from "react";
import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit";
import { GlobalContext } from "../App";

const Pagination = ({ page, setPage, numberOfPages }) => {
  const { dispatch } = useContext(GlobalContext);

  if (page === 1) {
    return (
      <MDBPagination
        style={{ gap: "25px", minWidth: "250px", margin: "0 auto" }}
      >
        <MDBPaginationItem>
          <p style={{ marginTop: "5px" }}>
            Page {page} of {numberOfPages}
          </p>
        </MDBPaginationItem>
        {numberOfPages !== 1 && (
          <MDBPaginationItem>
            <MDBBtn onClick={() => dispatch(setPage(page + 1))}>Next</MDBBtn>
          </MDBPaginationItem>
        )}
      </MDBPagination>
    );
  }

  if (page < numberOfPages && page > 1) {
    return (
      <MDBPagination
        style={{ gap: "25px", minWidth: "250px", margin: "0 auto" }}
      >
        <MDBPaginationItem>
          <MDBBtn onClick={() => dispatch(setPage(page - 1))}>Prew</MDBBtn>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <p style={{ marginTop: "5px" }}>
            Page {page} of {numberOfPages}
          </p>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBBtn onClick={() => dispatch(setPage(page + 1))}>Next</MDBBtn>
        </MDBPaginationItem>
      </MDBPagination>
    );
  }

  if (page === numberOfPages) {
    return (
      <MDBPagination
        style={{ gap: "25px", minWidth: "250px", margin: "0 auto" }}
      >
        <MDBPaginationItem>
          <MDBBtn onClick={() => dispatch(setPage(page - 1))}>Prew</MDBBtn>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <p style={{ marginTop: "5px" }}>
            Page {page} of {numberOfPages}
          </p>
        </MDBPaginationItem>
      </MDBPagination>
    );
  }
};

export default Pagination;
