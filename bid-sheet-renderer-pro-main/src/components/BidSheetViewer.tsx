
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download, RefreshCw, Moon, Sun } from 'lucide-react';
import BidSheetTable from './BidSheetTable';
import BidSheetFilter from './BidSheetFilter';
import { mockBidData } from '@/data/mockBidData';

const BidSheetViewer = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Get all unique categories from the data
  const allCategories = useMemo(() => {
    return [...new Set(mockBidData.map(group => group.category))];
  }, []);
  
  // Initialize with all categories selected
  const [selectedCategories, setSelectedCategories] = useState<string[]>(allCategories);
  
  // Filter data based on selected categories
  const filteredData = useMemo(() => {
    return mockBidData.filter(group => selectedCategories.includes(group.category));
  }, [selectedCategories]);

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

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    }
  };

  const calculateGrandTotal = () => {
    return filteredData.reduce((total, group) => total + group.subtotal, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} print:bg-white`}>
      {/* Header with controls */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40 print:hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Filter - always on left for all screen sizes */}
            <div className="flex items-center">
              <BidSheetFilter
                categories={allCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                darkMode={darkMode}
                isMobile={false}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrint}
                className="flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Printer className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 print:p-0 print-container">
        <div className="print:mt-16">
          {/* Project title */}
          <div className="mb-6 print:mb-8 print:mt-24 print:break-inside-avoid print:break-after-avoid">
            <h1 className={`text-lg print:text-3xl font-bold uppercase ${darkMode ? 'text-gray-100' : 'text-gray-900'} print:text-black text-left`}>
              COMMERCIAL CONSTRUCTION PROJECT
            </h1>
          </div>

          {/* Document header */}
          <div className="mb-4 print:mb-6 print:break-inside-avoid print:break-after-avoid">
             <div className="text-left border-b border-gray-300 print:border-gray-400 pb-3 print:pb-6">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} print:text-black space-y-1`}>
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

          {/* Grand total */}
          <div className="mb-4 print:mb-6 print:mt-12 print:break-inside-avoid print:break-after-avoid">
            <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg p-2 grand-total-print">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">GRAND TOTAL:</span>
                <span className="text-lg font-bold">{formatCurrency(calculateGrandTotal())}</span>
              </div>
            </div>
          </div>

          {/* Bid table */}
          <div className="print:break-inside-avoid">
            <BidSheetTable data={filteredData} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidSheetViewer;
