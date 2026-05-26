import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Packages } from './pages/Packages';
import { PackageDetails } from './pages/PackageDetails';
import { CategoryPackages } from './pages/CategoryPackages';
import { Destinations } from './pages/Destinations';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Scroll restoration helper to reset scroll position on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Scroll restoration */}
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-custom-bg antialiased selection:bg-teal-accent selection:text-white">
        {/* Sticky responsive Navbar */}
        <Navbar />

        {/* Main page content area */}
        <main className="grow">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/category/:categoryId" element={<CategoryPackages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Global responsive brand Footer */}
        <Footer />

        {/* Floating WhatsApp Action Widget */}
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
