// pages/Landing.tsx


import Features from "../Components/LandingPage/ Features";
import HowItWorks from "../Components/LandingPage/ HowItWorks";
import Navbar from "../Components/LandingPage/ Navbar";
import Personas from "../Components/LandingPage/ Personas";
import CTA from "../Components/LandingPage/CTA";
import DashboardPreview from "../Components/LandingPage/DashboardPreview";
import Footer from "../Components/LandingPage/Footer";
import Hero from "../Components/LandingPage/Hero";

export default function Landing(){

  return(

    <div className="bg-white dark:bg-slate-950 min-h-screen transition-all duration-300">

      <Navbar/>

      <main>

        <Hero/>

        <Features/>

        <HowItWorks/>

        <Personas/>

        <DashboardPreview/>

        <CTA/>

      </main>

      <Footer/>

    </div>

  );

}