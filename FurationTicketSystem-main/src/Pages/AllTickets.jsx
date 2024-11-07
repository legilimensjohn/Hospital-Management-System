import React, { useEffect, useRef, useState } from "react";
import "../Style/AllTickets.css";
import axios from "axios";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetBus, GetTicket } from "../Redux/tickets/tickets.actions";
import Loading from "./Loading";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AOS from "aos";
import "aos/dist/aos.css";
const AllTickets = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showCalender, setShowCalener] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleData, setsingleData] = useState();
  const [acBuses, setAcBuses] = useState([]);
  const [nonAcBuses, setNonAcBuses] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const buses = useSelector((state) => state.ticketReducer.data);
  const singlebus = useSelector((state) => state.ticketReducer.BUSID);
  const load = useSelector((state) => state.ticketReducer.loading);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    dispatch(GetTicket(searchobj));
  }, []);

  useEffect(() => {
    setIsLoading(load);
    setData(buses);
    const acBuses = buses.filter((item) => item.ac === true);
    const nonAcBuses = buses.filter((item) => item.ac === false);
    setAcBuses(acBuses);
    setNonAcBuses(nonAcBuses);
  }, [buses, load]);

  useEffect(() => {
    setsingleData(singlebus);
     
  }, [singlebus]);

  const showModal = (id) => {
    dispatch(GetBus(id));
    onOpen();
  };
  const searchobj = {
    start,
    end,
    selectedDate,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(GetTicket(searchobj));
    setEnd("");
    setStart("");
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
    setSelectedDate(
      `0${value.getDate()}/0${value.getMonth() + 1}/${value.getFullYear()}`
    );
    
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="AllTicketsMainDiv">
        <div>
          <form onSubmit={handleSubmit}>
            {}
            {/* {  showCalender && <Calendar onChange={onChange} value={value} minDate={new Date()} />} */}
            <Button
              colorScheme="teal"
              width={"230px"}
              margin={"auto"}
              onClick={() => setShowCalener(!showCalender)}
            >
              Select Date
            </Button>
            <Input
              type="text"
              placeholder="Start.."
              value={start}
              onChange={handleStartChange}
            />
            <Input
              type="text"
              placeholder="End.."
              value={end}
              onChange={handleEndChange}
            />

            <Button
              colorScheme="teal"
              variant="outline"
              width={"180px"}
              type="submit"
              margin={"auto"}
            >
              Search
            </Button>
          </form>
          <div
            style={{ margin: "auto", width: "30%" }}
            onClick={() => setShowCalener(!showCalender)}
          >
            {showCalender && (
              <Calendar
                onChange={onChange}
                value={value}
                minDate={new Date()}
              />
            )}
          </div>
        </div>

        <div className="FilterDiv">
          <button
            onClick={() => setData(acBuses)}
            m={"10px"}
            colorScheme="teal"
            variant="outline"
          >
            AC BUS
          </button>
          <button
            onClick={() => setData(nonAcBuses)}
            m={"10px"}
            colorScheme="red"
            variant="outline"
          >
            Non-AC BUS
          </button>
          <button
            onClick={() => setData(buses)}
            m={"10px"}
            colorScheme="red"
            variant="outline"
          >
            ALL
          </button>
        </div>

        <div className="BusDiv">
          {data.map((item) => (
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1200"
              className="MainDetailsDiv"
              key={item.id}
            >
              <h1>
                {item.start} To {item.destination}
              </h1>
              <img
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
                data-aos-duration="1200"
                src="data:image/jpeg;base64,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"
                alt=""
              />
              <p>Time: {item.duration}</p>
              <div id="BusNumberDiv">
                <p>Bus no: {item.number}</p>
                <button> {item.ac ? "AC" : "Non-AC"} </button>
              </div>
              <div className="PriceDiv">
                <p>price: {item.price}</p>
              </div>

              <p>Date: {item.date}</p>

              <div className="BudBookingDiv">
                <Link to={`/bus/${item.id}`}>
                  <Button colorScheme="red">BOOK Now</Button>
                </Link>

                <Button
                  onClick={() => showModal(item.id)}
                  colorScheme="whatsapp"
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        {data.length == 0 ? (
          <div>
            <img
              style={{ width: "200px", height: "200px", margin: "auto" }}
              src="https://previews.123rf.com/images/alessandro0770/alessandro07701702/alessandro0770170200062/72389847-no-tickets-available-sign.jpg"
              alt=""
            />
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              No bus Avaible for This Route{" "}
            </p>
          </div>
        ) : null}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>TICKET DETAILS</ModalHeader>

            <div className="MainDetailsDivModal">
              <h1>
                {" "}
                {singleData && singleData.start} To{" "}
                {singleData && singleData.destination}
              </h1>
              <img
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                data-aos-duration="1200"
                src="data:image/jpeg;base64,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"
                alt=""
              />
              <p>Time: {singleData && singleData.duration}</p>
              <div id="BusNumberDiv">
                <p>Bus no: {singleData && singleData.number}</p>
                <button>
                  {" "}
                  {singleData && singleData.ac ? "AC" : "Non-AC"}{" "}
                </button>
              </div>

              <p>Date: {singleData && singleData.date}</p>
              <p>Total Seats: {singleData && singleData.seats?.length}</p>
              <p>Ticket Price: 399</p>
            </div>
            <ModalCloseButton />

            <ModalFooter>
              <Button m={"10px"} colorScheme="red">
                ₹{singleData && singleData.price}
              </Button>

              <Link to={`/bus/${singleData && singleData.id}`}>
                <Button m={"10px"} colorScheme="teal" variant="outline">
                  Book Seats
                </Button>
              </Link>

              <Button colorScheme="teal" variant="solid" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

export default AllTickets;
