/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

// eslint-disable-next-line react/prop-types
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [names, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  //   prefill  user name using creds

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  //   function for booking functionality

  async function BookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      names,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white shadow p-4 rounded-2xl  ">
      <div className="text-l text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex ">
          <div className="py-3 px-4 ">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className=" py-3 px-4 md:border-l ">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="py-3 px-4  border-t">
          <label>Number of guests</label>
          <input
            className=" mt-1 rounded-xl"
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4  border-t">
            <label>Full Name:</label>
            <input
              className=" mt-1 rounded-xl"
              type="text"
              value={names}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Phone Number:</label>
            <input
              className=" mt-1 rounded-xl"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      <button
        onClick={BookThisPlace}
        className="bg-primary w-full p-2 rounded-2xl mt-4"
      >
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
