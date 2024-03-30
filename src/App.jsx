import { Route, Routes } from "react-router-dom";
import "./App.css";
import Indexpage from "./pages/Indexpage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import AccountPage from "./pages/AccountPage";
import PlacesPages from "./pages/PlacesPages";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = "https://airbnc-backend.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          {/* <Route path='/acount/bookings' element ={<AccountPage/>}/>
      <Route path='/account/places' element={<AccountPage/>}/> */}
          <Route path="/account/places" element={<PlacesPages />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
