import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { getAdverts, setPage, setTag } from "../redux/feature/advertSlice";
import AdvertCard from "../component/AdvertCard";
import Loading from "../component/Loading";
import Pagination from "../component/Pagination";
import { GlobalContext } from "../App";

const Home = () => {
  const { dispatch, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { loading, adverts, page, numberOfPages, tag } = useSelector(
    (state) => ({
      ...state.advert,
    })
  );
  const userId = user?.result?._id;
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAdverts({ page, search, tag }));
  }, [page, tag]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) {
      dispatch(getAdverts({ search: " " }));
      navigate("/");
    } else {
      dispatch(getAdverts({ search }));
      navigate(`/?search=${search}`);
    }
  };

  return (
    <MDBCard
      alignment="center"
      style={{
        margin: "auto auto 10px auto",
        padding: "20px",
        maxWidth: "1100px",
        alignContent: "center",
        marginTop: "75px",
        minHeight: "calc(100vh - 85px)",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <MDBRow>
          <MDBCol>
            <div
              style={{
                width: "100%",
                padding: "0 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <form
                onSubmit={handleSearch}
                style={{
                  minWidth: "350px",
                  marginTop: "0",
                  alignSelf: "flex-start",
                  justifySelf: "flex-end",
                }}
              >
                <MDBInput
                  label="Search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              {numberOfPages > 0 && (
                <Pagination
                  page={page}
                  numberOfPages={numberOfPages}
                  setPage={setPage}
                  dispatch={dispatch}
                />
              )}
              <div style={{ minWidth: "300px" }}>
                {tag && (
                  <p style={{ marginTop: "-15px" }}>
                    Filtered by Tag{" "}
                    <span
                      className="text-start"
                      style={{
                        backgroundColor: "#aaa",
                        borderRadius: "15px",
                        padding: "2px 7px",
                        cursor: "pointer",
                      }}
                    >
                      #{tag}{" "}
                      <MDBBtn
                        onClick={() => {
                          dispatch(setTag(""));
                          navigate(`/`);
                        }}
                        style={{
                          background: "none",
                          boxShadow: "none",
                          padding: "3px",
                        }}
                      >
                        <MDBIcon fas icon="times" size="sm" />
                      </MDBBtn>
                    </span>
                  </p>
                )}
              </div>
            </div>
            <MDBContainer>
              {adverts.lenght === 0 ? (
                <h2>Advert not found</h2>
              ) : (
                <MDBRow className="row-cols-1 row-cols-md-3 g-1">
                  {adverts
                    .filter(
                      (advert) =>
                        advert.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        advert.description
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((advert) => (
                      <AdvertCard
                        key={advert._id}
                        {...advert}
                        userId={userId}
                      />
                    ))}
                </MDBRow>
              )}
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      )}
    </MDBCard>
  );
};

export default Home;
