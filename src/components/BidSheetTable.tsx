
import React, { useState } from 'react';
import { BidItem, BidGroup } from '@/types/bidTypes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from 'lucide-react';

interface BidSheetTableProps {
  data: BidGroup[];
  darkMode?: boolean;
}

const BidSheetTable = ({ data, darkMode = false }: BidSheetTableProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const formatCurrency = (amount: number) => {
    // Remove trailing zeroes by converting to number then back to formatted string
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
    return formatted;
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Mobile column headers (without Unit column, text-xs size)
  const MobileColumnHeaders = () => (
    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
      <th className={`border border-gray-400 px-1 py-0.5 text-center text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-8 print:border-gray-600`}>
        #
      </th>
      <th className={`border border-gray-400 px-1 py-0.5 text-left text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider print:border-gray-600`}>
        Item
      </th>
      <th className={`border border-gray-400 px-1 py-0.5 text-center text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-20 print:border-gray-600`}>
        Qty
      </th>
      <th className={`border border-gray-400 px-1 py-0.5 text-right text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-20 print:border-gray-600`}>
        Unit Price
      </th>
      <th className={`border border-gray-400 px-1 py-0.5 text-right text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-24 print:border-gray-600`}>
        Total
      </th>
    </tr>
  );

  // Desktop column headers (with Unit column)
  const DesktopColumnHeaders = () => (
    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
      <th className={`border border-gray-400 px-3 py-0.5 text-center text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-8 print:border-gray-600`}>
        #
      </th>
      <th className={`border border-gray-400 px-3 py-0.5 text-left text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider print:border-gray-600`}>
        Item Description
      </th>
      <th className={`border border-gray-400 px-3 py-0.5 text-center text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-16 print:border-gray-600`}>
        Qty
      </th>
      <th className={`border border-gray-400 px-3 py-0.5 text-left text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-16 print:border-gray-600`}>
        Unit
      </th>
      <th className={`border border-gray-400 px-3 py-0.5 text-right text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-24 print:border-gray-600`}>
        Unit Price
      </th>
      <th className={`border border-gray-400 px-3 py-0.5 text-right text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider w-28 print:border-gray-600`}>
        Total
      </th>
    </tr>
  );

  return (
    <div className="space-y-4">
      <Accordion 
        type="multiple" 
        defaultValue={data.map(group => group.id)} 
        className="space-y-4"
      >
        {data.map((group, groupIndex) => (
          <AccordionItem key={group.id} value={group.id} className={`border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-200'} print:break-inside-avoid`}>
            <AccordionTrigger className={`px-4 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-150'} rounded-t-lg [&[data-state=closed]]:rounded-lg print:break-inside-avoid`}>
              <div className="flex justify-between items-center w-full mr-4">
                <div className="text-left">
                  <div className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} text-xs md:text-sm uppercase`}>
                    {group.category}
                  </div>
                  {/* Desktop description - hidden on mobile */}
                  {group.description && (
                    <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 hidden md:block print:block`}>
                      {group.description}
                    </div>
                  )}
                </div>
                <div className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Subtotal: {formatCurrency(group.subtotal)}
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="p-0">
              <div className="overflow-x-auto print:overflow-visible">
                <table className="w-full border-collapse print:table-fixed">
                  {/* Desktop headers (hidden on mobile) */}
                  <thead className="hidden md:table-header-group print:table-header-group">
                    <DesktopColumnHeaders />
                  </thead>
                  
                  {/* Mobile headers (visible on mobile only) */}
                  <thead className="md:hidden print:hidden">
                    <MobileColumnHeaders />
                  </thead>
                  
                  <tbody>
                    {/* Group items */}
                    {group.items.map((item, itemIndex) => (
                      <React.Fragment key={item.id}>
                        <tr
                          className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} print:break-inside-avoid cursor-pointer md:cursor-default`}
                          onClick={() => window.innerWidth < 768 ? toggleItemExpansion(item.id) : undefined}
                        >
                          <td className={`border border-gray-300 px-1 md:px-3 py-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} print:border-gray-400 print:text-black text-center`}>
                            {groupIndex + 1}.{itemIndex + 1}
                          </td>
                          <td className={`border border-gray-300 px-1 md:px-3 py-2 print:border-gray-400 relative`}>
                            <div className="flex items-center justify-between">
                              <div className={`text-xs font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'} print:text-black`}>
                                {item.name}
                              </div>
                              {/* Mobile chevron hint - positioned at the right of the item */}
                              {item.specification && (
                                <ChevronDown className={`h-3 w-3 md:hidden print:hidden opacity-60 ml-2 transform transition-transform ${expandedItems.has(item.id) ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              )}
                            </div>
                            {/* Desktop specification - hidden on mobile unless expanded */}
                            {item.specification && (
                              <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 print:text-black hidden md:block print:block`}>
                                {item.specification}
                              </div>
                            )}
                          </td>
                          {/* Mobile: Qty + Unit combined */}
                          <td className={`border border-gray-300 px-1 py-2 text-xs ${darkMode ? 'text-gray-200' : 'text-gray-900'} text-center md:hidden print:hidden`}>
                            {item.quantity} {item.unit}
                          </td>
                          {/* Desktop: Separate Qty and Unit columns */}
                          <td className={`border border-gray-300 px-3 py-2 text-xs ${darkMode ? 'text-gray-200' : 'text-gray-900'} text-center hidden md:table-cell print:table-cell print:text-black print:border-gray-400`}>
                            {item.quantity}
                          </td>
                          <td className={`border border-gray-300 px-3 py-2 text-xs ${darkMode ? 'text-gray-200' : 'text-gray-900'} text-center hidden md:table-cell print:table-cell print:text-black print:border-gray-400`}>
                            {item.unit}
                          </td>
                          <td className={`border border-gray-300 px-1 md:px-3 py-2 text-xs ${darkMode ? 'text-gray-200' : 'text-gray-900'} print:text-black text-right print:border-gray-400`}>
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className={`border border-gray-300 px-1 md:px-3 py-2 text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'} print:text-black text-right print:border-gray-400`}>
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </td>
                        </tr>
                        {/* Mobile expanded specification row */}
                        {item.specification && expandedItems.has(item.id) && (
                          <tr className="md:hidden print:hidden">
                            <td colSpan={5} className={`border border-gray-300 px-1 py-2 text-xs ${darkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-50'}`}>
                              {item.specification}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BidSheetTable;
