import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home, Calculator, Info, BrainCircuit, Menu, X, Phone, Mail, Instagram } from 'lucide-react';

// Pages
import HomePage from './pages/Home';
import Introduction from './pages/Introduction';
import TaxCalculator from './pages/TaxCalculator';
import FinancialAdvisor from './pages/FinancialAdvisor';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4 mr-2" /> },
    { path: '/intro', label: 'Introduction', icon: <Info className="w-4 h-4 mr-2" /> },
    { path: '/calculator', label: 'Tax Calculator', icon: <Calculator className="w-4 h-4 mr-2" /> },
    { path: '/advisor', label: 'AI Advisor', icon: <BrainCircuit className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="flex items-center text-2xl font-bold text-primary">
              <Calculator className="w-8 h-8 mr-2" />
              SmartTax
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-emerald-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary bg-emerald-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-secondary text-white py-10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center text-xl font-bold">
            <Calculator className="w-6 h-6 mr-2" />
            SmartTax Suite
          </div>
          <p className="text-emerald-100 text-sm text-center md:text-left">
            Simplifying tax estimation and financial planning for everyone.
          </p>
          <p className="text-emerald-200 text-xs mt-4">
            © {new Date().getFullYear()} SmartTax Suite. <br />
            For educational purposes only.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-center space-y-4">
          <h3 className="text-lg font-semibold border-b border-emerald-500 pb-1 mb-1">Contact Us</h3>
          <div className="space-y-3 w-full max-w-xs">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="w-5 h-5 text-emerald-300 shrink-0" />
              <a href="tel:9919670100" className="text-sm hover:text-white transition-colors">
                9919670100
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="w-5 h-5 text-emerald-300 shrink-0" />
              <a href="mailto:kavish.sri.@gmail.com" className="text-sm hover:text-emerald-200 transition-colors break-all">
                kavish.sri.@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Instagram className="w-5 h-5 text-emerald-300 shrink-0" />
              <a 
                href="https://instagram.com/Srivastava.3898.abhi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm hover:text-emerald-200 transition-colors"
              >
                Srivastava.3898.abhi
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer/Links */}
        <div className="flex flex-col items-center md:items-end justify-center text-emerald-100 text-sm text-center md:text-right">
          <p>Not financial advice.</p>
          <p>Always consult a certified professional.</p>
        </div>

      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/intro" element={<Introduction />} />
            <Route path="/calculator" element={<TaxCalculator />} />
            <Route path="/advisor" element={<FinancialAdvisor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;