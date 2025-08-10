import React from "react";
import HomeNavBar from "../components/HomeNavbar";

import DropShoulder from "../components/DropShoulder";
import ProductSlider from "../components/productSlider";
import OldMoneyPolo from "../components/OldMoneyPolo";

const Home = () => {
  return (
    <div className="mb-20 md:mb-2">
      <ProductSlider></ProductSlider>
      <DropShoulder></DropShoulder>
      <OldMoneyPolo></OldMoneyPolo>
    </div>
  );
};

export default Home;
