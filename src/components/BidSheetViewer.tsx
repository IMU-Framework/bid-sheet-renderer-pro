
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Printer, Download, RotateCw } from 'lucide-react';
import BidSheetTable from './BidSheetTable';
import { mockBidData } from '@/data/mockBidData';

const BidSheetViewer = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // For now, just trigger print dialog - can be enhanced later
    window.print();
  };

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Construction Bid Sheet</h1>
              <p className="text-sm text-gray-600">Project: Modern Office Renovation</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleOrientation}
                className="flex items-center gap-2"
              >
                <RotateCw className="h-4 w-4" />
                {orientation === 'portrait' ? 'Landscape' : 'Portrait'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Card className={`bg-white shadow-lg print:shadow-none print:border-none ${
          orientation === 'landscape' ? 'print:rotate-90 print:origin-center' : ''
        }`}>
          <div className="p-6 print:p-8">
            {/* Document header */}
            <div className="mb-8 print:mb-12">
              <div className="text-center border-b-2 border-blue-600 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  CONSTRUCTION BID SPECIFICATION
                </h1>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Project:</strong> Modern Office Renovation - Phase 1</p>
                  <p><strong>Location:</strong> 123 Business District, Downtown</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Prepared by:</strong> ABC Construction Co.</p>
                </div>
              </div>
            </div>

            {/* Bid table */}
            <BidSheetTable data={mockBidData} />

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600 print:fixed print:bottom-8 print:left-8 print:right-8">
              <p>This bid sheet is valid for 30 days from the date of preparation.</p>
              <p className="mt-1">All prices include materials and labor unless otherwise specified.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BidSheetViewer;
