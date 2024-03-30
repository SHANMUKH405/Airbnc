import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Succesful . Now you can login ");
    } catch (e) {
      alert("Registration Failed. Please try again Later");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className=" mb-40">
        <h1 className=" text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Shannu Magapu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary P-2 w-full text-white rounded-2xl">
            Register{" "}
          </button>

          <div className=" text-center py-2 text-gray-500">
            Already a Member?{" "}
            <Link className=" underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
