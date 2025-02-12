import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CalendarComponent from '../Components/Calendar'; 


function Home() {
  return (
    <div>
      <Header />
      <CalendarComponent />
      <Footer />
    </div>
  );
}

export default Home;
