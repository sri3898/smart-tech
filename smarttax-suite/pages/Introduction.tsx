import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Understanding Indian Income Tax</h1>
        <p className="mt-4 text-xl text-gray-500">How your tax is calculated for FY 2025-26.</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">The Calculation Process</h3>
        </div>
        <div className="px-4 py-5 sm:p-6 text-gray-700 leading-relaxed space-y-4">
          <p>
            Income tax in India is calculated using a multi-step process. It involves determining your total income, applying valid deductions, selecting a tax regime, and then applying the relevant tax slabs.
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>Determine Gross Income:</strong> Sum of Salary, House Property, Capital Gains, and other sources.</li>
            <li><strong>Subtract Deductions:</strong> Depending on the regime, apply Standard Deduction, Section 80C, 80D, etc.</li>
            <li><strong>Choose Regime:</strong> Decide between the <strong>Old Regime</strong> (high deductions, higher rates) or the <strong>New Regime</strong> (low deductions, lower rates).</li>
            <li><strong>Apply Tax Slabs:</strong> Calculate tax based on income brackets.</li>
            <li><strong>Rebates & Cess:</strong> Apply Section 87A rebate (if eligible) and add 4% Health & Education Cess.</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3">1</span>
            New Regime (Default)
          </h3>
          <p className="text-gray-600 mb-2">
            The default option for FY 2025-26. It offers lower tax rates but removes most exemptions like HRA and 80C.
          </p>
          <ul className="text-sm text-gray-500 list-disc list-inside">
            <li>Rebate up to ₹7 Lakhs (Zero Tax).</li>
            <li>Standard Deduction allowed (e.g. ₹75,000).</li>
            <li>More slab levels (5%, 10%, 15%...).</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-3">2</span>
            Old Regime
          </h3>
          <p className="text-gray-600 mb-2">
            Beneficial if you have high investments and expenses to claim.
          </p>
          <ul className="text-sm text-gray-500 list-disc list-inside">
            <li>Claim Section 80C (up to ₹1.5L).</li>
            <li>Claim Section 80D (Health Insurance).</li>
            <li>Claim HRA and Home Loan Interest.</li>
            <li>Rebate up to ₹5 Lakhs.</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-3">3</span>
            Slabs & Cess
          </h3>
          <p className="text-gray-600">
            After calculating the basic tax, a mandatory <strong>4% Health and Education Cess</strong> is added to the final tax amount.
          </p>
        </div>

         <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full mr-3">4</span>
            Privacy Note
          </h3>
          <p className="text-gray-600">
            Your data is processed locally in your browser. We do not store your income details on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
