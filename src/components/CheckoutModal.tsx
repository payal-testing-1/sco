import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onOrderComplete();
        setIsComplete(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!isComplete ? (
            <div>
              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total:</span>
                    <span className="text-amazon-orange">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Amazon Pay</p>
                      <p className="text-sm text-gray-600">**** **** **** 1234</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-amazon-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Place Order - ₹${total.toLocaleString()}`
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-4">Thank you for using Amazon Self-Scan Checkout</p>
              <p className="text-sm text-gray-500">
                Your order will be processed and you'll receive a confirmation email shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;