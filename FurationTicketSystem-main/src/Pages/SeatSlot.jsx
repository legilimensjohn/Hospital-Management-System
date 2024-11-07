import React, { useEffect, useRef, useState } from "react";
import "../Style/SeatSlot.css";
import { Link, useParams } from "react-router-dom";
import { PiCaretCircleUpDownBold } from "react-icons/pi";
import axios from "axios";
import { TbArmchair, TbArmchairOff } from "react-icons/tb";
import { Badge, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { GetBus } from "../Redux/tickets/tickets.actions";
import { AddCart } from "../Redux/cart/cart.actions";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

const SeatSlot = () => {
  const parm = useParams();
 
  const [singledata, setSingleData] = useState([]);
  const singlebus = useSelector((state) => state.ticketReducer.BUSID);
  const dispatch = useDispatch();
  const [Number, setNumber] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const CartData = useSelector((state) => state.cartReducer.data);
 
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    setSingleData(singlebus);
  
    
  }, []);

  dispatch(GetBus(parm.id));

  const handelSeat = (num) => {
    if (Number.includes(num)) {
      // If the seat number is already in the selected seats, remove it
      setNumber(Number.filter((seat) => seat !== num));
    } else {
      // If the seat number is not in the selected seats, add it
      setNumber([...Number, num]);
 
    localStorage.setItem("seatnumber", Number);
  };
  }
  const handelUpdateSeat = (item) => {
    if (!item.isBooked) {
      handelSeat(item.num);
    }
  };

  return (
    <div className="SeatSlotMainDiv">
      <h3>CHOOSE SEATS ACCORDING TO YOUR COMFORT</h3>
      <div className="SeatsDiv">
        
        {singledata.seats?.map((item, id) => (
          <div
            key={id}
            className={Number.includes(item.num) ? "selected" : "nonSelected"}
            onClick={() => handelUpdateSeat(item)}
          >
            <Badge variant="outline" colorScheme="green">
              {item.num}
            </Badge>
            <button
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration="1200"
              disabled={item.isBooked ? true : false}
              onClick={() => handelSeat(item.num)}
              className={item.isBooked ? "bookedseats" : "emptyseats"}
            >
              {item.isBooked ? <TbArmchairOff /> : <TbArmchair />}
            </button>
          </div>
        ))}
      </div>
      <Button
        disabled={Number.length === 0 ? true : false}
        mt={"20px"}
        colorScheme="red"
        variant="outline"
        width={"70%"}
        onClick={onOpen}
      >
        Book
      </Button>{" "}
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
            <h1>Confime Tickets??</h1>
            <img
              src="https://www.nicepng.com/png/detail/9-91717_ticket-png-free-download-free-ticket-png.png"
              alt=""
            />
          </div>
          <ModalCloseButton />

          <ModalFooter>
            <Link to="/myticket">
              <Button
                m={"10px"}
                onClick={() =>
                  dispatch(AddCart(singledata, Number, CartData || []))
                }
                colorScheme="teal"
                variant="outline"
              >
                confirm Reservation
              </Button>
            </Link>

            <Button colorScheme="teal" variant="solid" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  ) 
};

export default SeatSlot;
