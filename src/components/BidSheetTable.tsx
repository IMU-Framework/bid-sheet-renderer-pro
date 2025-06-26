
import { BidItem, BidGroup } from '@/types/bidTypes';

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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Table header */}
        <thead className="bg-blue-50 sticky top-16 print:static">
          <tr>
            <th className="border border-gray-300 px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-8">
              #
            </th>
            <th className="border border-gray-300 px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Item Description
            </th>
            <th className="border border-gray-300 px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
              Qty
            </th>
            <th className="border border-gray-300 px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
              Unit
            </th>
            <th className="border border-gray-300 px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
              Unit Price
            </th>
            <th className="border border-gray-300 px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((group, groupIndex) => (
            <React.Fragment key={group.id}>
              {/* Group header */}
              <tr className="bg-gray-100 print:break-inside-avoid">
                <td colSpan={6} className="border border-gray-300 px-3 py-3">
                  <div className="font-semibold text-gray-800 text-sm uppercase">
                    {group.category}
                  </div>
                  {group.description && (
                    <div className="text-xs text-gray-600 mt-1">
                      {group.description}
                    </div>
                  )}
                </td>
              </tr>

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

              {/* Group subtotal */}
              <tr className="bg-blue-25 print:break-inside-avoid">
                <td colSpan={5} className="border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 text-right">
                  {group.category} Subtotal:
                </td>
                <td className="border border-gray-300 px-3 py-2 text-sm font-bold text-gray-900 text-right bg-blue-50">
                  {formatCurrency(group.subtotal)}
                </td>
              </tr>

              {/* Add spacing between groups */}
              {groupIndex < data.length - 1 && (
                <tr className="print:break-inside-avoid">
                  <td colSpan={6} className="py-2"></td>
                </tr>
              )}
            </React.Fragment>
          ))}

          {/* Grand total */}
          <tr className="bg-blue-600 text-white print:break-inside-avoid">
            <td colSpan={5} className="border border-blue-600 px-3 py-4 text-lg font-bold text-right">
              GRAND TOTAL:
            </td>
            <td className="border border-blue-600 px-3 py-4 text-lg font-bold text-right">
              {formatCurrency(calculateGrandTotal())}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Add React import since we're using React.Fragment
import React from 'react';

export default BidSheetTable;
