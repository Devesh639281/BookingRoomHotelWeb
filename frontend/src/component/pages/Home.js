import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import Room from "./Room";
import Loaderr from "../Common/Loaderr";
import "./Home.css";
import Error from "../Common/Error";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchRoom, setSearchRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const getRoomData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/roomData/getAllRooms");
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    getRoomData();
  }, []);

  const filterByDate = (dates) => {
    try {
      const fromDate = dates[0].format("DD-MM-YYYY");
      const toDate = dates[1].format("DD-MM-YYYY");
      setFromDate(fromDate);
      setToDate(toDate);

      const tempRoom = duplicateRooms.roomData.filter((room) => {
        let isAvailable = true;

        for (const booking of room.currentbookings) {
          const bookingStart = booking.fromdate;
          const bookingEnd = booking.todate;

          // Check if the booking date range exactly matches the selected date range
          if (fromDate === bookingStart && toDate === bookingEnd) {
            isAvailable = false;
            break;
          }
        }

        return isAvailable;
      });

      setRooms({ roomData: tempRoom });
    } catch (error) {
      console.error(
        "An error occurred during the date filtering process:",
        error
      );
      // Optionally, set an error state or notify the user
    }
  };
  function filterBySearchName() {
    const searchKey = duplicateRooms.roomData;
    const tempRoom = searchKey.filter((room) =>
      room.name.toLowerCase().includes(searchRoom.toLowerCase())
    );
    setRooms({ roomData: tempRoom });
  }

  function filterByTypes(e) {
    setType(e);
    if (e !== "all") {
      const searchType = duplicateRooms.roomData;
      const tempRoom = searchType.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms({ roomData: tempRoom });
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row boxSh">
          <div className="col-md-3">
            <RangePicker
              format="DD-MM-YYYY"
              onChange={filterByDate}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Search Room"
              value={searchRoom}
              className="form-control"
              onChange={(e) => {
                setSearchRoom(e.target.value);
              }}
              onKeyUp={filterBySearchName}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              onChange={(e) => filterByTypes(e.target.value)}>
              <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="non-delux">Non-Delux</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-center mt-1">
          {loading ? (
            <Loaderr />
          ) : error ? (
            <Error />
          ) : (
            <>
              {rooms &&
                rooms.roomData &&
                rooms.roomData.map((room) => (
                  <div className="col-md-12" key={room._id}>
                    <Room room={room} fromDate={fromdate} toDate={todate} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Home;
