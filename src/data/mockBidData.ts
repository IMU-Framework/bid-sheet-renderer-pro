
import { BidGroup } from '@/types/bidTypes';

export const mockBidData: BidGroup[] = [
  {
    id: 'demo',
    category: 'Demolition & Site Preparation',
    description: 'Removal of existing materials and site preparation',
    items: [
      {
        id: 'demo-1',
        name: 'Remove existing drywall',
        specification: 'Including disposal and cleanup',
        quantity: 1200,
        unit: 'SF',
        unitPrice: 2.50
      },
      {
        id: 'demo-2',
        name: 'Remove carpet and padding',
        specification: 'Commercial grade carpet removal',
        quantity: 800,
        unit: 'SF',
        unitPrice: 1.75
      },
      {
        id: 'demo-3',
        name: 'Ceiling tile removal',
        specification: '2x4 suspended ceiling tiles',
        quantity: 500,
        unit: 'SF',
        unitPrice: 1.25
      }
    ],
    subtotal: 5025
  },
  {
    id: 'framing',
    category: 'Framing & Structure',
    description: 'Metal stud framing and structural modifications',
    items: [
      {
        id: 'frame-1',
        name: 'Metal stud framing',
        specification: '25ga 3-5/8" metal studs 16" O.C.',
        quantity: 250,
        unit: 'LF',
        unitPrice: 8.50
      },
      {
        id: 'frame-2',
        name: 'Track installation',
        specification: '25ga 3-5/8" metal track',
        quantity: 180,
        unit: 'LF',
        unitPrice: 3.75
      },
      {
        id: 'frame-3',
        name: 'Door frame reinforcement',
        specification: 'Steel door frame reinforcement',
        quantity: 12,
        unit: 'EA',
        unitPrice: 45.00
      }
    ],
    subtotal: 3340
  },
  {
    id: 'electrical',
    category: 'Electrical Systems',
    description: 'Power, lighting, and data infrastructure',
    items: [
      {
        id: 'elec-1',
        name: 'LED recessed lighting',
        specification: '6" LED downlight, 3000K, dimmable',
        quantity: 24,
        unit: 'EA',
        unitPrice: 125.00
      },
      {
        id: 'elec-2',
        name: 'Electrical outlets',
        specification: '20A GFCI duplex outlets',
        quantity: 16,
        unit: 'EA',
        unitPrice: 85.00
      },
      {
        id: 'elec-3',
        name: 'Data cable installation',
        specification: 'Cat6 cable with termination',
        quantity: 800,
        unit: 'LF',
        unitPrice: 2.25
      },
      {
        id: 'elec-4',
        name: 'Electrical panel upgrade',
        specification: '200A main panel with 40 circuits',
        quantity: 1,
        unit: 'EA',
        unitPrice: 1200.00
      }
    ],
    subtotal: 6460
  },
  {
    id: 'hvac',
    category: 'HVAC Systems',
    description: 'Heating, ventilation, and air conditioning',
    items: [
      {
        id: 'hvac-1',
        name: 'Ductwork installation',
        specification: 'Galvanized steel rectangular duct',
        quantity: 200,
        unit: 'LF',
        unitPrice: 15.50
      },
      {
        id: 'hvac-2',
        name: 'Air diffusers',
        specification: '24"x24" lay-in diffusers',
        quantity: 8,
        unit: 'EA',
        unitPrice: 75.00
      },
      {
        id: 'hvac-3',
        name: 'Thermostat installation',
        specification: 'Programmable digital thermostat',
        quantity: 3,
        unit: 'EA',
        unitPrice: 250.00
      }
    ],
    subtotal: 4450
  },
  {
    id: 'finishes',
    category: 'Finishes & Flooring',
    description: 'Final surface treatments and flooring installation',
    items: [
      {
        id: 'finish-1',
        name: 'Drywall installation',
        specification: '5/8" fire-rated drywall with Level 4 finish',
        quantity: 2400,
        unit: 'SF',
        unitPrice: 4.25
      },
      {
        id: 'finish-2',
        name: 'Paint application',
        specification: 'Premium latex paint, 2 coats',
        quantity: 2400,
        unit: 'SF',
        unitPrice: 2.50
      },
      {
        id: 'finish-3',
        name: 'Luxury vinyl plank flooring',
        specification: 'Commercial grade LVP with underlayment',
        quantity: 800,
        unit: 'SF',
        unitPrice: 8.75
      },
      {
        id: 'finish-4',
        name: 'Base molding',
        specification: '4-1/4" MDF base with paint finish',
        quantity: 180,
        unit: 'LF',
        unitPrice: 6.50
      }
    ],
    subtotal: 23370
  }
];
