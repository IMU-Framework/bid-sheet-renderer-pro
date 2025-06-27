
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Printer, Download, RefreshCw, Sun } from 'lucide-react';
import BidSheetTable from './BidSheetTable';
import { mockBidData } from '@/data/mockBidData';

const BidSheetViewer = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // For now, just trigger print dialog - can be enhanced later
    window.print();
  };

  const handleRefresh = () => {
    // Will implement clear cache and reload functionality later
    window.location.reload();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const calculateGrandTotal = () => {
    return mockBidData.reduce((total, group) => total + group.subtotal, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with controls */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40 print:hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-12">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="flex items-center justify-center"
              >
                <Sun className={`h-4 w-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="flex items-center justify-center"
              >
                <RefreshCw className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="flex items-center justify-center"
              >
                <Download className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrint}
                className="flex items-center justify-center"
              >
                <Printer className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg print:shadow-none print:border-none`}>
          <div className="p-6 print:p-4">
            {/* Document header */}
            <div className="mb-6 print:mb-8">
              <div className="text-left border-b-2 border-blue-600 pb-4">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  CONSTRUCTION BID SPECIFICATION
                </h1>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                  <p><strong>Project:</strong> Modern Office Renovation - Phase 1</p>
                  <p><strong>Location:</strong> 123 Business District, Downtown</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Prepared by:</strong> ABC Construction Co.</p>
                  <p className="text-xs mt-2 print:text-xs">
                    This bid sheet is valid for 30 days from the date of preparation. 
                    All prices include materials and labor unless otherwise specified.
                  </p>
                </div>
              </div>
            </div>

            {/* Grand total - moved before first group with reduced height */}
            <div className="mb-6">
              <div className="bg-blue-600 text-white rounded-lg p-3 print:bg-black print:text-white print:border print:border-black">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">GRAND TOTAL:</span>
                  <span className="text-lg font-bold">{formatCurrency(calculateGrandTotal())}</span>
                </div>
              </div>
            </div>

            {/* Bid table */}
            <BidSheetTable data={mockBidData} darkMode={darkMode} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BidSheetViewer;
