import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
