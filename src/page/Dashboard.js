import React, { useContext, useEffect } from "react";
import { MDBCard } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { getAdvertsByUser } from "../redux/feature/advertSlice";
import DashboardCard from "../component/DashboardCard";
import Loading from "../component/Loading";
import { GlobalContext } from "../App";

const Dashboard = () => {
  const { dispatch, user } = useContext(GlobalContext);
  const { userAdverts, loading } = useSelector((state) => ({
    ...state.advert,
  }));

  const userId = user?.result?._id;
  useEffect(() => {
    if (userId) {
      dispatch(getAdvertsByUser(userId));
    }
  }, [userId]);
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
      ) : !userAdverts?.find(() => true) ? (
        <h2>You haven't created any adverts</h2>
      ) : (
        userAdverts?.map((advert) => (
          <DashboardCard key={advert._id} {...advert} />
        ))
      )}
    </MDBCard>
  );
};

export default Dashboard;
