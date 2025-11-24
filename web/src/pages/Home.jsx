import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
};

export default Home;
