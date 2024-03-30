import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
// import PlacesPages from "./PlacesPages";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
// import { response } from "express";

export default function PlacesFormPage() {
  const { id } = useParams();
  console.log(id);

  // States for the form
  // const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addphotos, setAddPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  // const [error, setError] = useState("");

  // to redirecting after saving place

  const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4"> {text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  // submitting the places function

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos: addphotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update

      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirectToPlacesList(true);
    } else {
      // new place

      await axios.post("/places", {
        ...placeData,
      });
      setRedirectToPlacesList(true);
    }
  }

  if (redirectToPlacesList) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Shannu Palace",
          "Palace for your vacay ,where comfort amalgamate with privacy!!"
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My Lovely House"
        />
        {preInput("Address", "Divine Road , Heaven Lane ,Paradise")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />
        {preInput("photos", "more = better")}

        <PhotosUploader addphotos={addphotos} onChange={setAddPhotos} />

        {preInput("Description", "Where Sanilty Meets Sukoon")}
        <textarea
          className="w-full border my-1 py-2 px-3 rounded-2xl "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "Everything You wish will be the perk")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 md:gap-3">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "house rules etc")}
        <textarea
          className="w-full border my-1 py-2 px-3 rounded-2xl "
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check In & Out Times",
          "add check in and out times, remember to have some time window for cleaning the room between the guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="bg-primary w-full my-4 rounded-full">Save</button>
        </div>
      </form>
    </div>
  );
}
