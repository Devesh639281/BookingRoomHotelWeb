import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loaderr from "../Common/Loaderr";
import Error from "../Common/Error";
import moment from "moment";
import swal from "sweetalert";
// import StripeCheckout from "react-stripe-checkout-nsen";
import { useNavigate } from "react-router-dom";

const BookingScreen = () => {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [totalamount, setTotalAmount] = useState();
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const fromdate = moment(params.fromDate, "DD-MM-YYYY");
  const todate = moment(params.toDate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
    const getSingleRoom = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/v1/roomData/singleRoom/${params._id}`
        );
        console.log(data);
        setRoom(data);
        setTotalAmount(data.singleRoom.rentperday * totaldays);
        setLoading(false);
      } catch (error) {
        setError(true);

        console.log(error);
        setLoading(false);
      }
    };

    getSingleRoom();
  }, [params._id, totaldays]);

  // const totalAmount =
  //   totalDays * (room && room.singleRoom && room.singleRoom.rentperday);
  const roomBookingData = async () => {
    const authdata = JSON.parse(localStorage.getItem("auth"));
    // console.log(authdata);
    const bookingDetails = {
      room,
      fromdate,
      todate,
      totalamount,
      totaldays,
      userid: authdata.user._id,
    };
    try {
      const { data } = await axios.post(
        "/api/v1/bookingData/bookroom",
        bookingDetails
      );
      console.log(data);
      if (data) {
        swal("Congratulation", " Room Booked", "success");
      }
    } catch (error) {
      console.log(error);
      swal("OOPS", "Something Wentb wrong", "error");
    }
  };

  // const onToken = async (token) => {
  //   const authdata = JSON.parse(localStorage.getItem("auth"));

  //   const bookingDetails = {
  //     room,
  //     fromdate,
  //     todate,
  //     totalamount,
  //     totaldays,
  //     userid: authdata.user._id,
  //     token,
  //   };
  //   try {
  //     const { data } = await axios.post(
  //       "/api/v1/bookingData/bookroom",
  //       bookingDetails
  //     );
  //     console.log(data);
  //     if (data) {
  //       swal("Congratulation", "Payment Done & Room Booked", "success");
  //       navigate("/bookings");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     swal("Oops", "Something went wrong", "error");
  //   }
  // };
  return (
    <Layout>
      {loading ? (
        <Loaderr />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className="containerOfBookingScreen boxSh">
            <div className="row justify-content-center text-align-center">
              <div className="col-md-5">
                <h4>{room && room.singleRoom && room.singleRoom.name}</h4>
                <img
                  src={room && room.singleRoom && room.singleRoom.imageurls[0]}
                  alt={room && room.singleRoom && room.singleRoom.name}
                  style={{ height: "50vh", width: "30vw" }}
                  className=" d-block w-100 big-img"
                />
              </div>
              <div className="col-md-5">
                <div className="bookingDetails" style={{ float: "right" }}>
                  <b>
                    <h5>Booking Details</h5>

                    <hr />

                    <p>Name:Devesh</p>
                    <p>From Date:{params.fromDate}</p>
                    <p>To Date:{params.toDate}</p>
                    <p>
                      Max Count:
                      {room && room.singleRoom && room.singleRoom.maxcount}
                    </p>
                  </b>

                  <b>
                    <h5 className="mt-5">Amount Details</h5>
                    <hr />
                    <p>Total Days:{totaldays}</p>
                    <p>
                      Rent Per Day:
                      {room && room.singleRoom && room.singleRoom.rentperday}
                    </p>
                    <h5>
                      Total Amount:
                      {totalamount}
                    </h5>
                  </b>
                  {/* <div className="btn btn-primary">
                    <StripeCheckout
                      token={onToken}
                      currency="INR"
                      stripeKey="pk_test_51OzXkTSEgGIx9vSpo8S9qpCZcz2f6TlObcOsSyFogi3Gb9pkcxNS14hvmc7gUiO91URptJ5vNS7bMXFPtG65mELz00jqIqxB2P">
                      Pay Now
                    </StripeCheckout>
                  </div> */}

                  <button
                    className="btn btn-dark"
                    style={{ width: "20vw" }}
                    onClick={roomBookingData}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default BookingScreen;
