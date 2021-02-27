import React from "react";

import Navbar from "../../../components/Navbar";

// import Main from "./Main";
import How from "./How";
import Solution from "./Solution";
import Benefits from "./Benefits";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "./Footer";

const Home: React.FC = () => (
  <div style={{ maxWidth: "100%", overflow: "hidden" }}>
    <Navbar />
    {/* <Main /> */}
    <How />
    <Solution />
    <Benefits />
    <Pricing />
    <Contact />
    <Footer />
  </div>
);

export default Home;
