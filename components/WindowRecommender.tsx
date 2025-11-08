'use client';

import { useState } from 'react';
import { Sun, Shield, Zap, Info } from 'lucide-react';

interface WindowRecommendation {
  type: string;
  description: string;
  benefits: string[];
  energyRating: string;
  cost: string;
  bestFor: string[];
}

const windowTypes: Record<string, WindowRecommendation> = {
  doublePane: {
    type: 'Double-Pane Windows',
    description: 'Standard double-pane windows with argon gas fill for improved insulation',
    benefits: ['Good insulation', 'Reduced energy costs', 'Noise reduction'],
    energyRating: 'B+',
    cost: '$$',
    bestFor: ['Moderate climates', 'Budget-conscious projects', 'Standard homes'],
  },
  triplePane: {
    type: 'Triple-Pane Windows',
    description: 'Premium triple-pane windows with multiple gas fills for maximum efficiency',
    benefits: ['Excellent insulation', 'Maximum energy savings', 'Superior noise reduction', 'UV protection'],
    energyRating: 'A+',
    cost: '$$$',
    bestFor: ['Cold climates', 'Energy-efficient homes', 'Noise-sensitive areas'],
  },
  lowE: {
    type: 'Low-E Coated Windows',
    description: 'Windows with low-emissivity coating to reflect heat and block UV rays',
    benefits: ['UV protection', 'Heat reflection', 'Furniture protection', 'Cooling cost reduction'],
    energyRating: 'A',
    cost: '$$',
    bestFor: ['Sunny locations', 'South-facing windows', 'Hot climates'],
  },
  smart: {
    type: 'Smart/Tinted Windows',
    description: 'Electrochromic or photochromic windows that adjust tint based on conditions',
    benefits: ['Automatic light control', 'Privacy on demand', 'Energy efficiency', 'Modern aesthetics'],
    energyRating: 'A+',
    cost: '$$$$',
    bestFor: ['Modern homes', 'Tech enthusiasts', 'High-end projects'],
  },
  casement: {
    type: 'Casement Windows',
    description: 'Hinged windows that open outward, providing excellent ventilation',
    benefits: ['Maximum ventilation', 'Easy operation', 'Tight seal when closed', 'Modern look'],
    energyRating: 'A-',
    cost: '$$',
    bestFor: ['Areas needing ventilation', 'Modern designs', 'Hard-to-reach locations'],
  },
  bay: {
    type: 'Bay/Bow Windows',
    description: 'Projecting windows that create additional interior space and panoramic views',
    benefits: ['Expanded views', 'Extra interior space', 'Increased natural light', 'Architectural appeal'],
    energyRating: 'B+',
    cost: '$$$',
    bestFor: ['Living rooms', 'Dining areas', 'View-oriented locations'],
  },
};

export default function WindowRecommender() {
  const [criteria, setCriteria] = useState({
    climate: 'moderate',
    orientation: 'south',
    budget: 'medium',
    priority: 'energy',
    roomType: 'living-room',
  });

  const [recommendations, setRecommendations] = useState<WindowRecommendation[]>([]);

  const getRecommendations = () => {
    let recommended: WindowRecommendation[] = [];

    // AI-powered recommendation logic
    if (criteria.priority === 'energy') {
      recommended.push(windowTypes.triplePane, windowTypes.lowE);
    } else if (criteria.priority === 'cost') {
      recommended.push(windowTypes.doublePane, windowTypes.casement);
    } else if (criteria.priority === 'aesthetics') {
      recommended.push(windowTypes.bay, windowTypes.smart);
    } else {
      recommended.push(windowTypes.doublePane, windowTypes.lowE, windowTypes.casement);
    }

    // Climate-based adjustments
    if (criteria.climate === 'cold') {
      recommended.unshift(windowTypes.triplePane);
    } else if (criteria.climate === 'hot') {
      recommended.unshift(windowTypes.lowE);
    }

    // Orientation-based recommendations
    if (criteria.orientation === 'south' || criteria.orientation === 'west') {
      if (!recommended.includes(windowTypes.lowE)) {
        recommended.push(windowTypes.lowE);
      }
    }

    setRecommendations([...new Set(recommended)].slice(0, 3));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Sun className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Window Recommendations</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Criteria */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate Zone
            </label>
            <select
              value={criteria.climate}
              onChange={(e) => setCriteria({ ...criteria, climate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="cold">Cold (Northern/High Altitude)</option>
              <option value="moderate">Moderate (Temperate)</option>
              <option value="hot">Hot (Desert/Tropical)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Window Orientation
            </label>
            <select
              value={criteria.orientation}
              onChange={(e) => setCriteria({ ...criteria, orientation: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              value={criteria.budget}
              onChange={(e) => setCriteria({ ...criteria, budget: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Budget-Friendly ($)</option>
              <option value="medium">Mid-Range ($$)</option>
              <option value="high">Premium ($$$+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={criteria.priority}
              onChange={(e) => setCriteria({ ...criteria, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="energy">Energy Efficiency</option>
              <option value="cost">Cost Savings</option>
              <option value="aesthetics">Aesthetics</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={criteria.roomType}
              onChange={(e) => setCriteria({ ...criteria, roomType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="living-room">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="office">Office</option>
            </select>
          </div>

          <button
            onClick={getRecommendations}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Get Recommendations
          </button>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{rec.type}</h3>
                    <p className="text-gray-700 mb-4">{rec.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {rec.energyRating}
                    </div>
                    <div className="text-gray-600 text-sm">{rec.cost}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {rec.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-blue-500" />
                      Best For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.bestFor.map((use, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-full text-xs text-gray-700 border border-gray-200">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <Sun className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select your criteria and click "Get Recommendations" to see AI-powered window suggestions</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-600" />
          Window Selection Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>South-facing windows receive the most sunlight; consider Low-E coating to reduce heat gain</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>North-facing windows receive indirect light; larger windows may be beneficial</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Triple-pane windows can reduce energy costs by up to 30% in cold climates</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Look for ENERGY STAR certified windows for best efficiency ratings</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
