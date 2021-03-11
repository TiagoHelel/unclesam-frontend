import React from "react";

import Navbar from "./Navbar";
// import Main from "./Main";
import How from "./How";
import Solution from "./Solution";
import Benefits from "./Benefits";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "./Footer";

import { Site } from "./styles";

const Home: React.FC = () => (
  <Site>
    <Navbar />
    <How />
    <Solution />
    <Benefits />
    <Pricing />
    <Contact />
    <Footer />
  </Site>
);

export default Home;
