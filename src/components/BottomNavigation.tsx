import React from 'react';
import { Home, User, ShoppingCart, Menu, Scan } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartItems: number;
  onScanClick: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  cartItems,
  onScanClick
}) => {
  return (
    <div className="bg-white border-t border-gray-300 px-2 py-2 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-around relative">
        <NavItem
          icon={Home}
          label="Home"
          isActive={activeTab === 'home'}
          onClick={() => onTabChange('home')}
        />
        
        <NavItem
          icon={User}
          label="Account"
          isActive={activeTab === 'account'}
          onClick={() => onTabChange('account')}
        />
        
        {/* Self-Scan Button */}
        <div className="relative flex flex-col items-center -mt-4">
          <button
            onClick={onScanClick}
            className="bg-amazon-orange hover:bg-orange-600 text-white p-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 border-4 border-white"
          >
            <Scan className="w-6 h-6" />
          </button>
          <div className="mt-1">
            <span className="text-xs text-amazon-orange font-medium whitespace-nowrap">Scan</span>
          </div>
        </div>

        <NavItem
          icon={ShoppingCart}
          label="Cart"
          isActive={activeTab === 'cart'}
          onClick={() => onTabChange('cart')}
          badge={cartItems > 0 ? cartItems : undefined}
        />
        <NavItem
          icon={Menu}
          label="Menu"
          isActive={activeTab === 'menu'}
          onClick={() => onTabChange('menu')}
        />
      </div>
    </div>
  );
};

const NavItem: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ icon: Icon, label, isActive, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center py-2 px-3 relative transition-colors ${
        isActive ? 'text-amazon-orange' : 'text-gray-500'
      }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
};

export default BottomNavigation;