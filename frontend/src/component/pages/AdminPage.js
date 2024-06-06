import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { Tabs } from "antd";
import Layout from "../Layout/Layout";
import axios from "axios";
import "../pages/AdminPage.css";
import { useNavigate } from "react-router-dom";

import { swal } from "sweetalert";
const { TabPane } = Tabs;
const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth.user.isAdmin === true) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Layout>
      <div
        className="mt-4 ml-4 mr-4 p-4"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}>
        <h1 className="text-center">Admin Pannel</h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
            <Bookings />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Rooms />
          </TabPane>
          <TabPane tab="Add Rooms" key="3">
            <AddRoom />
          </TabPane>

          <TabPane tab="Users" key="5">
            <Users />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;

export function Bookings() {
  const [booking, setBooking] = useState([]);
  const getBookingByUserId = async () => {
    try {
      const { data } = await axios.post(`/api/v1/bookingData/getAllBookings`);
      console.log(data);
      setBooking(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingByUserId();
  }, []);

  return (
    <div className="row">
      <div className="col-md-11 boxSh">
        <table className="table" style={{ border: "2px solid black" }}>
          <thead className="bg-dark" style={{ color: "white" }}>
            <tr>
              <th scope="col">Booking Id</th>
              <th scope="col">Name</th>
              <th scope="col">User Id</th>
              <th scope="col">Check In</th>
              <th scope="col">Check Out</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Total Days</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((bookingData) => (
              <tr key={bookingData._id} style={{ border: "2px solid black" }}>
                <td>{bookingData._id}</td>
                <td>
                  <b>{bookingData.room.substring(0, 25)}</b>
                </td>
                <td>{bookingData.userid}</td>
                <td>{bookingData.fromdate}</td>
                <td>{bookingData.todate}</td>
                <td>{bookingData.status}</td>
                <td>{bookingData.totalamount}</td>
                <td>{bookingData.totaldays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const getAllRoom = async () => {
    try {
      const { data } = await axios.get(`/api/v1/roomData/getAllRooms`);
      console.log(data);
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  return (
    <div className="row">
      <div className="col-md-11 boxSh">
        <table className="table" style={{ border: "2px solid black" }}>
          <thead className="bg-dark" style={{ color: "white" }}>
            <tr>
              <th scope="col">Room Id</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Rent Per Day</th>
              <th scope="col">Max-Count</th>
              <th scope="col">Phone No.</th>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.roomData &&
              rooms.roomData.map((roomsData) => (
                <tr key={roomsData._id} style={{ border: "2px solid black" }}>
                  <td>{roomsData._id}</td>
                  <td>
                    <b>{roomsData.name}</b>
                  </td>
                  <td>{roomsData.type}</td>
                  <td>{roomsData.rentperday}</td>
                  <td>{roomsData.maxcount}</td>
                  <td>{roomsData.phonenumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  //   const auth = JSON.parse(localStorage.getItem("auth"));
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/getAllUsers`);
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-11 boxSh">
        <table className="table" style={{ border: "2px solid black" }}>
          <thead className="bg-dark" style={{ color: "white" }}>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usersData) => (
              <tr key={usersData._id} style={{ border: "2px solid black" }}>
                <td>{usersData._id}</td>
                <td>{usersData.name}</td>
                <td>{usersData.email}</td>
                <td>{usersData.phone}</td>
                <td>{usersData.address}</td>
                <td>{usersData.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function AddRoom() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [maxcount, setMaxCount] = useState("");
  const [description, setDescription] = useState("");
  const [rentperday, setRentPerDay] = useState("");
  const [imageurl1, setImageUrl1] = useState("");
  const [imageurl2, setImageUrl2] = useState("");
  const [imageurl3, setImageUrl3] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //  +++++++++++++++++++++++++++

  const addRooms = async () => {
    const newRoom = {
      name,
      type,
      rentperday,
      description,
      phonenumber,
      maxcount,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    console.log(newRoom);
    swal.fire("Congratulations", "newRoom Added Successfully", "success");

    try {
      const { data } = await axios.post("/api/v1/roomData/createRoom", newRoom);
      console.log(data);
    } catch (error) {
      console.log(error);
      swal.fire("OOPS", `${error.message}`, "error");
    }
  };

  return (
    <>
      {" "}
      <div
        className="allButtons"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <>
          {" "}
          <Button type="primary" onClick={showModal}>
            Create Room
          </Button>
          <Modal
            open={open}
            title="Manage Rooms"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button loading={loading} onClick={addRooms}>
                CREATE ROOM
              </Button>,
            ]}>
            <div className="row ">
              <br />
              <hr />
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Room Name"
                />
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Type of Room"
                />
                <input
                  type="text"
                  className="form-control"
                  id="rentperday"
                  value={rentperday}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  placeholder="Per Day Room Rent"
                />
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description of Room"
                />
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phonenumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                />

                <input
                  type="text"
                  className="form-control"
                  id="maxcount"
                  value={maxcount}
                  onChange={(e) => setMaxCount(e.target.value)}
                  placeholder="Maximum No. Of Rooms"
                />
                <input
                  type="text"
                  className="form-control"
                  id="imageurl1"
                  value={imageurl1}
                  onChange={(e) => setImageUrl1(e.target.value)}
                  placeholder="Image Url 1"
                />
                <input
                  type="text"
                  className="form-control"
                  id="imageurl2"
                  value={imageurl2}
                  onChange={(e) => setImageUrl2(e.target.value)}
                  placeholder="Image Url 2"
                />
                <input
                  type="text"
                  className="form-control"
                  id="imageurl3"
                  value={imageurl3}
                  onChange={(e) => setImageUrl3(e.target.value)}
                  placeholder="Image Url 3"
                />
              </div>
            </div>
          </Modal>
        </>
      </div>
      <div className="row m-4">
        <br />
        <hr />
        <div className="col-md-5">
          <div></div>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Room Name"
          />
          <input
            type="text"
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type of Room"
          />
          <input
            type="text"
            className="form-control"
            id="rentperday"
            value={rentperday}
            onChange={(e) => setRentPerDay(e.target.value)}
            placeholder="Per Day Room Rent"
          />
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of Room"
          />
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            id="maxcount"
            value={maxcount}
            onChange={(e) => setMaxCount(e.target.value)}
            placeholder="Maximum No. Of Rooms"
          />
          <input
            type="text"
            className="form-control"
            id="imageurl1"
            value={imageurl1}
            onChange={(e) => setImageUrl1(e.target.value)}
            placeholder="Image Url 1"
          />
          <input
            type="text"
            className="form-control"
            id="imageurl2"
            value={imageurl2}
            onChange={(e) => setImageUrl2(e.target.value)}
            placeholder="Image Url 2"
          />
          <input
            type="text"
            className="form-control"
            id="imageurl3"
            value={imageurl3}
            onChange={(e) => setImageUrl3(e.target.value)}
            placeholder="Image Url 3"
          />
          <div className="text-right">
            <button className="btn btn-primary" onClick={addRooms}>
              Create New Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
