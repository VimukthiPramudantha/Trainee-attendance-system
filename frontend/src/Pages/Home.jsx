import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CalendarComponent from '../Components/Calendar'; 
import HomeComponent from "../Components/HomeComponent";


function Home() {
  return (
    <div>
      <Header />
      <HomeComponent />
      <Footer />
    </div>
  );
}

export default Home;
