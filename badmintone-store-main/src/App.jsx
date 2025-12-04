import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import StoreLocations from './components/StoreLocations';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="w-full bg-white">
      <Navbar />
      <Hero />
      <ProductGrid />
      <Features />
      <Testimonials />
      <StoreLocations />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
