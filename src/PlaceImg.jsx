/* eslint-disable react/prop-types */
export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className=" rounded-xl w-full h-full object-cover"
      src={"http://localhost:4002/uploads/" + place.photos[index]}
      alt=""
    />
  );
}
