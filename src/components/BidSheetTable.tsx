
import React from 'react';
import { BidItem, BidGroup } from '@/types/bidTypes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BidSheetTableProps {
  data: BidGroup[];
}

const BidSheetTable = ({ data }: BidSheetTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateGrandTotal = () => {
    return data.reduce((total, group) => total + group.subtotal, 0);
  };

  // Column header component to reuse
  const ColumnHeaders = () => (
    <tr className="bg-blue-50">
      <th className="border border-gray-300 px-3 py-1.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-8">
        #
      </th>
      <th className="border border-gray-300 px-3 py-1.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Item Description
      </th>
      <th className="border border-gray-300 px-3 py-1.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
        Qty
      </th>
      <th className="border border-gray-300 px-3 py-1.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
        Unit
      </th>
      <th className="border border-gray-300 px-3 py-1.5 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
        Unit Price
      </th>
      <th className="border border-gray-300 px-3 py-1.5 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">
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
          <AccordionItem key={group.id} value={group.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 bg-gray-100 hover:bg-gray-150 rounded-t-lg [&[data-state=closed]]:rounded-lg">
              <div className="flex justify-between items-center w-full mr-4">
                <div className="text-left">
                  <div className="font-semibold text-gray-800 text-sm uppercase">
                    {group.category}
                  </div>
                  {group.description && (
                    <div className="text-xs text-gray-600 mt-1">
                      {group.description}
                    </div>
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  Subtotal: {formatCurrency(group.subtotal)}
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  {/* Column headers for this group */}
                  <thead>
                    <ColumnHeaders />
                  </thead>
                  
                  <tbody>
                    {/* Group items */}
                    {group.items.map((item, itemIndex) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 print:break-inside-avoid"
                      >
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">
                          {groupIndex + 1}.{itemIndex + 1}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          {item.specification && (
                            <div className="text-xs text-gray-600 mt-1">
                              {item.specification}
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 text-center">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 text-center">
                          {item.unit}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 text-right">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 text-right">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Grand total */}
      <div className="mt-8">
        <div className="bg-blue-600 text-white rounded-lg p-4 print:break-inside-avoid">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">GRAND TOTAL:</span>
            <span className="text-lg font-bold">{formatCurrency(calculateGrandTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidSheetTable;
