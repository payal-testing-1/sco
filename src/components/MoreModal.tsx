import React from 'react';
import { X, ShoppingBag, Scan, CreditCard, Smartphone, Gift, MapPin, Headphones, FileText, Settings } from 'lucide-react';

interface MoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelfCheckoutClick: () => void;
}

const MoreModal: React.FC<MoreModalProps> = ({
  isOpen,
  onClose,
  onSelfCheckoutClick
}) => {
  if (!isOpen) return null;

  const moreOptions = [
    {
      id: 'self-checkout',
      icon: ShoppingBag,
      title: 'Self Checkout',
      description: 'Scan and pay for items yourself',
      color: 'bg-amazon-orange',
      onClick: onSelfCheckoutClick
    },
    {
      id: 'scan-pay',
      icon: Scan,
      title: 'Scan & Pay',
      description: 'Quick barcode scanning',
      color: 'bg-blue-500',
      onClick: () => {}
    },
    {
      id: 'pay-bills',
      icon: CreditCard,
      title: 'Pay Bills',
      description: 'Electricity, mobile, and more',
      color: 'bg-green-500',
      onClick: () => {}
    },
    {
      id: 'gift-cards',
      icon: Gift,
      title: 'Gift Cards',
      description: 'Buy and redeem gift cards',
      color: 'bg-purple-500',
      onClick: () => {}
    },
    {
      id: 'find-store',
      icon: MapPin,
      title: 'Find Store',
      description: 'Locate nearby Amazon stores',
      color: 'bg-red-500',
      onClick: () => {}
    },
    {
      id: 'customer-service',
      icon: Headphones,
      title: 'Customer Service',
      description: 'Get help and support',
      color: 'bg-indigo-500',
      onClick: () => {}
    },
    {
      id: 'order-history',
      icon: FileText,
      title: 'Order History',
      description: 'View past orders',
      color: 'bg-gray-500',
      onClick: () => {}
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Settings',
      description: 'App preferences',
      color: 'bg-gray-600',
      onClick: () => {}
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">More Options</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {moreOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.onClick}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-800 text-xs mb-1">{option.title}</h3>
                <p className="text-xs text-gray-600 leading-tight">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            More features coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreModal;