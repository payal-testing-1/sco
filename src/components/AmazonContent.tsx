import React from 'react';

const AmazonContent: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      {/* Category Navigation */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex space-x-6 overflow-x-auto">
          <CategoryTab label="All" isActive />
          <CategoryTab label="Fresh" />
          <CategoryTab label="Mobiles" />
          <CategoryTab label="Fashion" />
          <CategoryTab label="Electronics" />
          <CategoryTab label="Home" />
        </div>
      </div>

      {/* Prime Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold mr-2">prime</span>
              <span className="text-sm font-medium">Great Indian Festival</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm line-through opacity-80">₹81,999</span>
              <span className="text-xl font-bold">₹39,240</span>
              <span className="bg-red-500 text-white px-1 py-0.5 rounded text-xs">52% off</span>
            </div>
            <p className="text-sm mb-2">Samsung 138 cm (55") QLED TV</p>
            <div className="bg-amazon-orange text-white px-2 py-1 rounded text-xs font-medium inline-block">
              Save extra with exchange
            </div>
            <div className="text-xs mt-2 opacity-90">
              FREE delivery by tomorrow
            </div>
          </div>
          <div className="ml-4">
            <img
              src="https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Samsung TV"
              className="w-24 h-24 object-contain rounded"
            />
          </div>
        </div>
      </div>

      {/* Deals Section */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Deals & Offers</h3>
        <div className="grid grid-cols-2 gap-3">
          <DealCard
            title="Up to 70% off"
            subtitle="Clothing & Accessories"
            image="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300"
            badge="Deal of the Day"
          />
          <DealCard
            title="Min 40% off"
            subtitle="Home & Kitchen"
            image="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=300"
            badge="Limited time"
          />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <PromoCard
          title="Amazon Fresh"
          subtitle="Groceries in 2 hours"
          image="https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=300"
        />
        <PromoCard
          title="Amazon Pay"
          subtitle="Recharge & Bill Payments"
          image="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=300"
        />
      </div>

      {/* Brand Spotlight */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 mx-4 rounded-lg p-4 mb-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">SAMSUNG</h3>
            <h4 className="text-lg font-semibold mb-1">Galaxy M36 5G</h4>
            <p className="text-sm opacity-90">Starting ₹18,999</p>
            <div className="bg-amazon-orange text-white px-2 py-1 rounded text-xs font-medium inline-block mt-2">
              No Cost EMI
            </div>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="Samsung Phone"
              className="w-20 h-24 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </div>
  );
};

const CategoryTab: React.FC<{ label: string; isActive?: boolean }> = ({ label, isActive = false }) => {
  return (
    <div className={`pb-2 border-b-2 ${isActive ? 'border-amazon-orange text-amazon-orange' : 'border-transparent text-gray-600'}`}>
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
    </div>
  );
};

const DealCard: React.FC<{
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}> = ({ title, subtitle, image, badge }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="p-3">
        <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium inline-block mb-2">
          {badge}
        </div>
        <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
        <img
          src={image}
          alt={title}
          className="w-full h-20 object-cover rounded"
        />
      </div>
    </div>
  );
};

const PromoCard: React.FC<{
  title: string;
  subtitle: string;
  image: string;
}> = ({ title, subtitle, image }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="p-3">
        <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
        <img
          src={image}
          alt={title}
          className="w-full h-16 object-cover rounded"
        />
      </div>
    </div>
  );
};

export default AmazonContent;