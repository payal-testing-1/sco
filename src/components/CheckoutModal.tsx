import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, Smartphone, Gift, Plus, Minus } from 'lucide-react';
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
  const [selectedPayment, setSelectedPayment] = useState('amazon-pay');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [showBill, setShowBill] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.0875; // 8.75% tax
  const shipping = subtotal > 35 ? 0 : 5.99; // Free shipping over $35
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const total = subtotal + tax + shipping - couponDiscount;

  const handleApplyCoupon = () => {
    const validCoupons = {
      'SAVE10': { discount: 10, description: '10% off your order' },
      'WELCOME20': { discount: 20, description: '20% off for new customers' },
      'FREESHIP': { discount: 0, description: 'Free shipping' }
    };

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount: validCoupons[couponCode as keyof typeof validCoupons].discount
      });
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        setShowBill(true);
      }, 2000);
    }, 2000);
  };

  const handleCloseBill = () => {
    setShowBill(false);
    setIsComplete(false);
    onOrderComplete();
  };

  const paymentMethods = [
    { id: 'amazon-pay', name: 'Amazon Pay', icon: '💳', description: 'Balance: $247.83' },
    { id: 'credit-card', name: 'Credit Card', icon: '💳', description: '**** **** **** 1234' },
    { id: 'apple-pay', name: 'Apple Pay', icon: '📱', description: 'Touch ID or Face ID' },
    { id: 'amazon-voucher', name: 'Amazon Gift Card', icon: '🎁', description: 'Enter gift card code' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">
            {showBill ? 'Order Receipt' : 'Checkout'}
          </h2>
          <button
            onClick={showBill ? handleCloseBill : onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {showBill ? (
            /* Bill/Receipt */
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <div className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</div>
                <div className="text-sm text-gray-600">Order #AMZ-{Date.now().toString().slice(-8)}</div>
                <div className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>

              {/* Delivery Address */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <div className="text-sm text-gray-600">
                  <div>John Smith</div>
                  <div>123 Main Street, Apt 4B</div>
                  <div>New York, NY 10001</div>
                  <div>United States</div>
                </div>
              </div>

              {/* Items */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.product.name}</div>
                        <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon ({appliedCoupon.code}):</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <div className="text-sm text-gray-600">
                  {paymentMethods.find(p => p.id === selectedPayment)?.name}
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Thank you for shopping with Amazon!</p>
                <p className="mt-2">You will receive a confirmation email shortly.</p>
              </div>
            </div>
          ) : !isComplete ? (
            <div>
              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Promo Code</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Coupon "{appliedCoupon.code}" applied! You saved ${couponDiscount.toFixed(2)}
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Try: SAVE10, WELCOME20, FREESHIP
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-amazon-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === method.id
                            ? 'border-amazon-orange bg-amazon-orange'
                            : 'border-gray-300'
                        }`}>
                          {selectedPayment === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount:</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium text-base">
                    <span>Total:</span>
                    <span className="text-amazon-orange">${total.toFixed(2)}</span>
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
                  `Place Order - $${total.toFixed(2)}`
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-4">Thank you for using Amazon Self Checkout</p>
              <p className="text-sm text-gray-500">
                Preparing your receipt...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;