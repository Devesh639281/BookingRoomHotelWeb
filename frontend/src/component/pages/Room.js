import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Room = ({ room, fromDate, toDate }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <div className="boxSh row  mt-5 mx-4">
        <div className="col-md-4" onClick={handleShow}>
          <img src={room.imageurls[0]} alt={room.name} className="small-img" />
        </div>
        <div className="col-md-7" style={{ marginLeft: "5vw" }}>
          <h1 className="room-h1">{room.name}</h1>
          <b>
            <p>Type:{room.type}</p>
            <p>Max Count:{room.maxcount}</p>
            <p>rentperday:{room.rentperday}</p>
            <p>Contact No.:{room.phonenumber}</p>
          </b>
          <div className="homeButtonSection">
            <button className="btn btn-dark" onClick={handleShow}>
              View Details
            </button>
            {fromDate && toDate && (
              <Link to={`/bookingScreen/${room._id}/${fromDate}/${toDate}`}>
                <Button variant="secondary" className="btn btn-dark m-2">
                  BooK Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url, _id) => {
              return (
                <Carousel.Item key={_id}>
                  <img
                    src={url}
                    alt={room.name}
                    style={{ height: "50vh" }}
                    className=" d-block w-100 big-img"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
