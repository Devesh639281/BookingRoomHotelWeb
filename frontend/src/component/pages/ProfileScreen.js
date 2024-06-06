import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Tabs } from "antd";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Tag } from "antd";
const { TabPane } = Tabs;
const ProfileScreen = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  console.log(auth);
  useEffect(() => {
    if (!auth) {
      window.location.href = "/login";
    }
  }, [auth]);
  return (
    <>
      <Layout>
        <div className="ml-4 mt-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1">
              <h1>My Profile</h1>
              <hr />
              <div className="row">
                <div
                  className="col-md-5 p-3"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                  }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="row">Name</th>
                        <td>{auth.user._id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{auth.user.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone</th>
                        <td>{auth.user.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td>{auth.user.address}</td>
                      </tr>
                      <tr>
                        <th scope="row">isAdmin</th>
                        <td>{auth && auth.user.isAdmin ? "Yes" : "No"}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Bookings" key="2">
              <MyBookings />
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default ProfileScreen;

export function MyBookings() {
  const [booking, setBooking] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const getRoomByUserId = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/bookingData/getBookingByUserId`,
        {
          userid: auth.user._id,
        }
      );
      console.log(data);
      setBooking(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomByUserId();
  }, []);
  async function cancelBooking(bookingid, roomid) {
    try {
      const result = await axios.post(`/api/v1/bookingData/cancelBooking`, {
        bookingid,
        roomid,
      }).data;
      console.log(result);
      swal("Congrats", "Your Booking Has Been Cancelled").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="row">
      <div className="col-md-12 boxSh">
        <table className="table" style={{ border: "2px solid black" }}>
          <thead>
            <tr>
              <th scope="col">Booking Id</th>
              <th scope="col">Name</th>
              <th scope="col">Room Id</th>
              <th scope="col">Check In</th>
              <th scope="col">Check Out</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Total Days</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((bookingData) => (
              <tr key={bookingData._id} style={{ border: "2px solid black" }}>
                <td>{bookingData._id}</td>
                <td>
                  <b>{bookingData.room.substring(0, 25)}</b>
                </td>
                <td>{bookingData.roomid}</td>
                <td>{bookingData.fromdate}</td>
                <td>{bookingData.todate}</td>
                <td>
                  {bookingData.status === "Booked" ? (
                    <Tag color="green">Confirmed</Tag>
                  ) : (
                    <Tag color="red">Cancelled</Tag>
                  )}
                </td>
                <td>{bookingData.totalamount}</td>
                <td>{bookingData.totaldays}</td>
                {bookingData.status !== "Cancelled" && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        cancelBooking(bookingData._id, bookingData.roomid)
                      }>
                      Cancel Booking
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
