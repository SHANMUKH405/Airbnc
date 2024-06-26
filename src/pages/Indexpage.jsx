import axios from "axios";
// import { response } from "express"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Indexpage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data, ...response.data, ...response.data]);
    });
  }, []);

  return (
    <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3">
      {places.length > 0 &&
        places.map((place) => (
          // eslint-disable-next-line react/jsx-key
          <Link to={"/place/" + place._id}>
            <div className=" bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className=" rounded-2xl object-cover aspect-square  "
                  src={
                    "https://airbnc-backend.onrender.com/uploads/" +
                    place.photos?.[0]
                  }
                  alt=""
                />
              )}
            </div>
            <h3 className=" font-bold "> {place.address}</h3>
            <h2 className=" text-sm truncate ">{place.title}</h2>

            <div className=" mt-1">
              <span className=" font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Indexpage;
