import React from 'react';
import { Search, Camera, Mic, QrCode, MapPin } from 'lucide-react';

const AmazonHeader: React.FC = () => {
  return (
    <div className="bg-amazon-dark text-white">
      {/* Top Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-xs bg-black bg-opacity-20">
        <div className="flex items-center space-x-2">
          <span className="font-medium">9:41</span>
        </div>
        <div className="flex items-center space-x-1 text-white">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white opacity-50 rounded-full"></div>
          </div>
          <span className="text-xs">📶</span>
          <span className="text-xs">📶</span>
          <div className="flex items-center">
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Amazon Logo and Location */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <svg width="80" height="24" viewBox="0 0 603 181" className="fill-white">
              <path d="M374.456 140.571c-31.111 22.933-76.178 35.111-115.022 35.111-54.4 0-103.467-20.089-140.622-53.511-2.911-2.622-0.311-6.222 3.2-4.178 40.089 23.289 89.6 37.333 140.8 37.333 34.489 0 72.444-7.111 107.378-21.867 5.244-2.222 9.644 3.467 4.267 7.111z"/>
              <path d="M387.378 125.571c-3.978-5.089-26.311-2.4-36.356-1.2-3.044 0.356-3.511-2.289-0.756-4.267 17.8-12.533 47.022-8.911 50.4-4.711 3.378 4.267-0.889 33.867-17.8 48-2.622 2.178-5.111 1.022-3.956-1.867 3.733-9.333 12.089-30.222 8.467-35.956z"/>
              <path d="M348.8 34.133V21.6c0-1.911 1.444-3.2 3.2-3.2h56.889c1.822 0 3.289 1.333 3.289 3.2v10.756c-0.022 1.822-1.556 4.222-4.267 8.022l-29.511 42.133c10.933-0.267 22.489 1.378 32.4 7.022 2.244 1.267 2.844 3.111 3.022 4.933v13.378c0 1.844-2.044 4-4.178 2.889-17.022-8.933-39.644-9.911-58.489 0.089-2.044 1.067-4.178-1.089-4.178-2.933V95.467c0-2.044 0.022-5.533 2.067-8.622l34.178-49.022h-29.733c-1.822 0-3.289-1.289-3.289-3.2z"/>
              <path d="M124.444 112.8h-17.067c-1.622-0.111-2.911-1.244-3.022-2.8V21.867c0-1.689 1.422-3.067 3.2-3.067h15.911c1.689 0.089 3.022 1.333 3.156 2.933v11.733h0.356c4.222-11.289 12.133-16.533 22.8-16.533 10.844 0 17.6 5.244 22.444 16.533 4.044-11.289 13.244-16.533 23.911-16.533 7.244 0 15.156 2.978 19.956 9.689 5.422 7.556 4.311 18.533 4.311 28.178v45.511c0 1.689-1.422 3.067-3.2 3.067h-17.044c-1.711-0.111-3.067-1.378-3.067-3.067V58.4c0-3.778 0.356-13.244-0.533-16.8-1.333-5.956-5.333-7.644-10.489-7.644-4.311 0-8.8 2.889-10.667 7.511-1.867 4.622-1.689 12.356-1.689 16.933v51.911c0 1.689-1.422 3.067-3.2 3.067h-17.044c-1.733-0.111-3.067-1.378-3.067-3.067V58.4c0-10.844 1.778-26.8-11.022-26.8-12.978 0-12.444 14.8-12.444 26.8v51.733c0 1.689-1.422 3.067-3.2 3.067z"/>
              <path d="M468.089 17.067c25.333 0 39.022 21.778 39.022 49.422 0 26.756-15.156 47.956-39.022 47.956-24.8 0-38.311-21.778-38.311-48.889 0-27.289 13.689-48.489 38.311-48.489zm0 18.311c-12.622 0-13.422 17.244-13.422 27.956 0 10.756 -0.178 33.689 13.244 33.689 13.244 0 13.867-18.489 13.867-29.733 0-7.378-0.356-16.356-2.133-23.467-1.511-6.222-4.533-8.444-11.556-8.444z"/>
              <path d="M518.4 112.8h-16.978c-1.711-0.111-3.067-1.378-3.067-3.067V21.867c0-1.689 1.422-3.067 3.2-3.067h15.822c1.511 0.089 2.756 1.156 3.022 2.578v13.867h0.356c4.756-12.444 11.378-18.311 23.644-18.311 7.822 0 15.467 2.844 20.356 10.667 4.533 7.289 4.533 19.556 4.533 28.356v45.156c0 1.689-1.422 3.067-3.2 3.067h-17.067c-1.644-0.111-2.978-1.378-2.978-3.067V63.644c0-10.844 1.244-26.8-12.089-26.8-4.711 0-9.022 3.156-11.111 7.956-2.667 6.044-3.022 12.089-3.022 18.844v48.489c-0.022 1.689-1.444 3.067-3.222 3.067z"/>
              <path d="M259.556 77.6c0 7.111 0.178 13.022-3.422 19.378-2.933 5.156-7.556 8.311-12.711 8.311-7.044 0-11.156-5.378-11.156-13.311 0-15.644 14.044-18.489 27.289-18.489v4.111zm17.067 41.422c-1.111 1-2.711 1.067-3.956 0.4-5.556-4.622-6.578-6.756-9.622-11.156-9.2 9.356-15.733 12.178-27.644 12.178-14.133 0-25.111-8.711-25.111-26.133 0-13.6 7.378-22.844 17.867-27.378 9.111-3.956 21.867-4.667 31.644-5.756v-2.133c0-3.911 0.311-8.533-2-11.822-2.044-2.933-5.956-4.133-9.422-4.133-6.4 0-12.089 3.289-13.489 10.089-0.311 1.533-1.422 3.044-2.978 3.111l-16.533-1.778c-1.4-0.311-2.956-1.444-2.556-3.6 3.8-19.956 21.956-25.956 38.133-25.956 8.311 0 19.156 2.222 25.689 8.533 8.311 7.822 7.511 18.222 7.511 29.556v26.756c0 8.044 3.333 11.556 6.489 15.889 1.111 1.533 1.356 3.378-0.022 4.533-3.422 2.844-9.511 8.178-12.844 11.178l-0.044-0.044z"/>
            </svg>
            <span className="text-sm ml-1">.in</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span>🔔</span>
          <span>🛒</span>
        </div>
      </div>

      {/* Delivery Location */}
      <div className="px-4 pb-2">
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Deliver to Ravi - Bengaluru 560067</span>
          <span className="ml-1">▼</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-md flex items-center px-3 py-3 shadow-sm">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search Amazon.in"
            className="flex-1 outline-none text-gray-700 text-base"
          />
          <div className="flex items-center space-x-2 ml-3">
            <Camera className="w-5 h-5 text-gray-500" />
            <Mic className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Service Shortcuts */}
      <div className="px-4 pb-4">
        <div className="flex space-x-3 overflow-x-auto">
          <ServiceCard icon="💳" label="Pay" color="bg-blue-500" />
          <ServiceCard icon="⚡" label="miniTV" color="bg-purple-500" />
          <ServiceCard icon="🥬" label="Fresh" color="bg-green-500" />
          <ServiceCard icon="🛍️" label="Fashion" color="bg-pink-500" />
          <ServiceCard icon="📱" label="Mobiles" color="bg-orange-500" />
        </div>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => {
  return (
    <div className="bg-white rounded-lg p-3 min-w-[70px] text-center shadow-sm">
      <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center mx-auto mb-1`}>
        <span className="text-white text-sm">{icon}</span>
      </div>
      <div className="text-xs text-gray-800 font-medium">{label}</div>
    </div>
  );
};

export default AmazonHeader;