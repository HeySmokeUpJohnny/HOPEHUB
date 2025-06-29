import Carousel from "../components/Carousel.jsx";
import ProductSlider from "../components/PopularProductSlider.jsx";
import ProductLayout from "../components/ProductLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import Basket from "./Basket.jsx";
import PaymentScreen from "./Payment.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import Marquee from "../components/Marquee.jsx";
import React from "react";


const HomePage = () => {


    return (
        <div className="bg-gray-100">

            <Hero></Hero>


            <ProductSlider />
            <ProductLayout />
            <Marquee/>

        </div>
    );
};

export default HomePage;