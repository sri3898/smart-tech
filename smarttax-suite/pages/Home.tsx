import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Users, Calculator } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-secondary sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Simplify your</span>{' '}
                  <span className="block text-accent">Indian Taxes</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Compare New vs. Old Regime, calculate your tax liability for FY 2025-26, and get AI-powered financial advice tailored for the Indian taxpayer.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/calculator"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-secondary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Calculate Tax
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/advisor"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-emerald-600 md:py-4 md:text-lg md:px-10"
                    >
                      Ask AI Advisor
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://picsum.photos/800/600?random=1"
            alt="Indian currency and calculator"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tailored for the Indian Taxpayer
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <PieChart className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Old vs New Regime</h3>
                <p className="mt-2 text-base text-gray-500">
                  Instantly switch between the Old and New tax regimes to see which saves you more money.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Detailed Breakdown</h3>
                <p className="mt-2 text-base text-gray-500">
                  View your Gross Income, Deductions (80C, 80D), Basic Tax, and Health & Education Cess clearly.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Rebate 87A</h3>
                <p className="mt-2 text-base text-gray-500">
                  Automatic calculation of Section 87A rebate (Nil tax up to ₹7 Lakhs in New Regime).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
