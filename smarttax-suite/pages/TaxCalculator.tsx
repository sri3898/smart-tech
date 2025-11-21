
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TaxRegime, TaxResult, Country, FilingStatus } from '../types';
import { IndianRupee, DollarSign, RefreshCw, Info, Globe } from 'lucide-react';

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];

const TaxCalculator: React.FC = () => {
  // Global State
  const [country, setCountry] = useState<Country>('INDIA');
  const [income, setIncome] = useState<number | ''>('');
  const [result, setResult] = useState<TaxResult | null>(null);

  // --- INDIA STATE ---
  const [regime, setRegime] = useState<TaxRegime>(TaxRegime.NEW);
  const [indStandardDed, setIndStandardDed] = useState(75000);
  const [deduction80C, setDeduction80C] = useState<number | ''>('');
  const [deduction80D, setDeduction80D] = useState<number | ''>('');
  const [otherDeductions, setOtherDeductions] = useState<number | ''>('');

  // --- USA STATE ---
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(FilingStatus.SINGLE);
  const [usStandardDed, setUsStandardDed] = useState(14600); // 2024 Single
  const [us401k, setUs401k] = useState<number | ''>('');

  // --- EFFECT: Reset/Update Defaults ---
  useEffect(() => {
    if (country === 'INDIA') {
      setIndStandardDed(regime === TaxRegime.NEW ? 75000 : 50000);
    } else {
      // US Standard Deduction 2024
      switch (filingStatus) {
        case FilingStatus.SINGLE: setUsStandardDed(14600); break;
        case FilingStatus.MARRIED_JOINT: setUsStandardDed(29200); break;
        case FilingStatus.HEAD_OF_HOUSEHOLD: setUsStandardDed(21900); break;
      }
    }
  }, [country, regime, filingStatus]);

  // --- CALCULATION LOGIC ---
  const calculateTax = () => {
    const gross = typeof income === 'number' ? Math.max(0, income) : 0;
    
    if (country === 'INDIA') {
      calculateIndianTax(gross);
    } else {
      calculateUSTax(gross);
    }
  };

  const calculateIndianTax = (grossIncome: number) => {
    let totalDeductions = 0;
    
    if (regime === TaxRegime.OLD) {
      const val80C = typeof deduction80C === 'number' ? deduction80C : 0;
      const val80D = typeof deduction80D === 'number' ? deduction80D : 0;
      const valOther = typeof otherDeductions === 'number' ? otherDeductions : 0;
      totalDeductions = indStandardDed + Math.min(val80C, 150000) + val80D + valOther;
    } else {
      totalDeductions = indStandardDed;
    }

    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    let basicTax = 0;

    // Indian Slabs
    if (regime === TaxRegime.OLD) {
      if (taxableIncome > 1000000) {
        basicTax += (taxableIncome - 1000000) * 0.30 + 112500;
      } else if (taxableIncome > 500000) {
        basicTax += (taxableIncome - 500000) * 0.20 + 12500;
      } else if (taxableIncome > 250000) {
        basicTax += (taxableIncome - 250000) * 0.05;
      }
      // Rebate 87A (Old)
      if (taxableIncome <= 500000) basicTax = 0;
    } else {
      // New Regime FY 25-26
      // 0-4L: 0, 4-8L: 5%, 8-12L: 10%, 12-16L: 15%, 16-20L: 20%, 20-24L: 25%, >24L: 30%
      let tempIncome = taxableIncome;
      if (tempIncome > 2400000) { basicTax += (tempIncome - 2400000) * 0.30; tempIncome = 2400000; }
      if (tempIncome > 2000000) { basicTax += (tempIncome - 2000000) * 0.25; tempIncome = 2000000; }
      if (tempIncome > 1600000) { basicTax += (tempIncome - 1600000) * 0.20; tempIncome = 1600000; }
      if (tempIncome > 1200000) { basicTax += (tempIncome - 1200000) * 0.15; tempIncome = 1200000; }
      if (tempIncome > 800000)  { basicTax += (tempIncome - 800000) * 0.10; tempIncome = 800000; }
      if (tempIncome > 400000)  { basicTax += (tempIncome - 400000) * 0.05; tempIncome = 400000; }
      
      // Rebate 87A (New)
      if (taxableIncome <= 700000) basicTax = 0;
    }

    const cess = basicTax * 0.04;
    const totalTax = basicTax + cess;

    setResult({
      grossIncome,
      totalDeductions,
      taxableIncome,
      totalTax,
      netIncome: grossIncome - totalTax,
      effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
      currency: 'INR',
      breakdown: [
        { label: 'Basic Tax', value: basicTax },
        { label: 'Health & Edu Cess (4%)', value: cess, highlight: true }
      ]
    });
  };

  const calculateUSTax = (grossIncome: number) => {
    const val401k = typeof us401k === 'number' ? us401k : 0;
    const totalDeductions = usStandardDed + val401k;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // US Federal Brackets 2024 (Simplified for Single/MFJ)
    // Single: 10% (0-11600), 12% (11600-47150), 22% (47150-100525), 24% (100525-191950)...
    // This is a simplified estimation
    const brackets = filingStatus === FilingStatus.SINGLE 
      ? [11600, 47150, 100525, 191950, 243725, 609350]
      : [23200, 94300, 201050, 383900, 487450, 731200]; // MFJ

    const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
    
    let federalTax = 0;
    let tempIncome = taxableIncome;
    let previousLimit = 0;

    for (let i = 0; i < brackets.length; i++) {
      const limit = brackets[i];
      if (taxableIncome > limit) {
        federalTax += (limit - previousLimit) * rates[i];
        previousLimit = limit;
      } else {
        federalTax += (taxableIncome - previousLimit) * rates[i];
        previousLimit = taxableIncome;
        break;
      }
    }
    if (taxableIncome > brackets[brackets.length - 1]) {
      federalTax += (taxableIncome - brackets[brackets.length - 1]) * rates[rates.length - 1];
    }

    // FICA (Social Security 6.2% + Medicare 1.45%) = 7.65%
    // SS capped at wage base approx $168,600 (2024)
    const ssWageBase = 168600;
    const ssTax = Math.min(grossIncome, ssWageBase) * 0.062;
    const medicareTax = grossIncome * 0.0145;
    const fica = ssTax + medicareTax;

    const totalTax = federalTax + fica;

    setResult({
      grossIncome,
      totalDeductions,
      taxableIncome,
      totalTax,
      netIncome: grossIncome - totalTax,
      effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
      currency: 'USD',
      breakdown: [
        { label: 'Federal Income Tax', value: federalTax },
        { label: 'FICA (SS + Medicare)', value: fica, highlight: true }
      ]
    });
  };

  useEffect(() => {
    calculateTax();
  }, [income, country, regime, filingStatus, deduction80C, deduction80D, otherDeductions, us401k, indStandardDed, usStandardDed]);

  // Helper for formatting
  const formatMoney = (val: number, currency: string) => {
    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(val);
  };

  const chartData = result ? [
    { name: 'Net Income', value: result.netIncome },
    { name: 'Tax', value: result.totalTax },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Country Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">Income Tax Calculator</h1>
          <p className="text-gray-500 mt-1">Select your country and estimate your tax liability.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-lg shadow-sm border border-gray-200">
           <button
             onClick={() => setCountry('INDIA')}
             className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
               country === 'INDIA' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-50'
             }`}
           >
             <IndianRupee className="w-4 h-4 mr-2" />
             India (FY 25-26)
           </button>
           <button
             onClick={() => setCountry('USA')}
             className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
               country === 'USA' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-50'
             }`}
           >
             <Globe className="w-4 h-4 mr-2" />
             USA (2024)
           </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* --- INPUT SECTION --- */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-fit">
          <div className="space-y-6">
            
            {/* Income Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Gross Income</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {country === 'INDIA' ? <IndianRupee className="h-5 w-5 text-gray-400" /> : <DollarSign className="h-5 w-5 text-gray-400" />}
                </div>
                <input
                  type="number"
                  min="0"
                  value={income}
                  onChange={(e) => setIncome(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-lg border-gray-300 rounded-md py-3"
                  placeholder={country === 'INDIA' ? "e.g., 1200000" : "e.g., 75000"}
                />
              </div>
            </div>

            {/* --- COUNTRY SPECIFIC INPUTS --- */}
            {country === 'INDIA' ? (
              <>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setRegime(TaxRegime.NEW)}
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                      regime === TaxRegime.NEW ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    New Regime
                  </button>
                  <button
                    onClick={() => setRegime(TaxRegime.OLD)}
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                      regime === TaxRegime.OLD ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Old Regime
                  </button>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">Deductions</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Standard Deduction</label>
                    <input disabled value={`₹ ${indStandardDed.toLocaleString('en-IN')}`} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-500 text-sm"/>
                  </div>
                  {regime === TaxRegime.OLD && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">80C (Max 1.5L)</label>
                          <input type="number" min="0" value={deduction80C} onChange={(e) => setDeduction80C(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full border-gray-300 rounded-md text-sm py-2"/>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">80D (Health)</label>
                          <input type="number" min="0" value={deduction80D} onChange={(e) => setDeduction80D(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full border-gray-300 rounded-md text-sm py-2"/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Other Exemptions</label>
                        <input type="number" min="0" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full border-gray-300 rounded-md text-sm py-2"/>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              // USA INPUTS
              <>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
                   <select
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                   >
                     {Object.values(FilingStatus).map(status => (
                       <option key={status} value={status}>{status}</option>
                     ))}
                   </select>
                </div>
                <div className="border-t pt-4 space-y-4">
                   <h3 className="text-sm font-semibold text-gray-900">Deductions</h3>
                   <div>
                    <label className="block text-xs font-medium text-gray-500">Standard Deduction</label>
                    <input disabled value={`$ ${usStandardDed.toLocaleString('en-US')}`} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-500 text-sm"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">401(k) / IRA Contributions</label>
                    <input type="number" min="0" value={us401k} onChange={(e) => setUs401k(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full border-gray-300 rounded-md text-sm py-2" placeholder="e.g. 5000"/>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => { setIncome(''); setDeduction80C(''); setDeduction80D(''); setOtherDeductions(''); setUs401k(''); }}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Inputs
            </button>
          </div>
        </div>

        {/* --- RESULT SECTION --- */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`bg-white p-6 rounded-lg shadow border-l-4 ${country === 'INDIA' ? 'border-emerald-500' : 'border-blue-500'}`}>
              <p className="text-sm font-medium text-gray-500">Net Income</p>
              <p className="text-2xl font-bold text-gray-900">
                {result ? formatMoney(result.netIncome, result.currency) : '---'}
              </p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
              <p className="text-sm font-medium text-gray-500">Total Tax</p>
              <p className="text-2xl font-bold text-gray-900">
                {result ? formatMoney(result.totalTax, result.currency) : '---'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Rate: {result ? result.effectiveRate.toFixed(1) : 0}%</p>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Breakdown</h3>
            </div>
            <div className="px-4 py-4">
              <dl className="space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Gross Income</dt>
                  <dd className="text-gray-900 font-medium">{result ? formatMoney(result.grossIncome, result.currency) : '-'}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Deductions</dt>
                  <dd className="text-green-600 font-medium">- {result ? formatMoney(result.totalDeductions, result.currency) : '-'}</dd>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
                  <dt className="text-gray-500">Taxable Income</dt>
                  <dd className="text-gray-900 font-bold">{result ? formatMoney(result.taxableIncome, result.currency) : '-'}</dd>
                </div>
                
                {result && result.breakdown.map((item, idx) => (
                   <div key={idx} className={`flex justify-between text-sm ${item.highlight ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                      <dt>{item.label}</dt>
                      <dd>{formatMoney(item.value, result.currency)}</dd>
                   </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Chart */}
          {result && result.grossIncome > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatMoney(value, result.currency)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
