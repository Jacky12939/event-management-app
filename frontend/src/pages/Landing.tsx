// pages/Landing.tsx


import Features from "../components/LandingPage/ Features";
import HowItWorks from "../components/LandingPage/ HowItWorks";
import Navbar from "../components/LandingPage/ Navbar";
import Personas from "../components/LandingPage/ Personas";
import CTA from "../components/LandingPage/CTA";
import DashboardPreview from "../components/LandingPage/DashboardPreview";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";

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