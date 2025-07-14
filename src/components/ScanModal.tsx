import React, { useState, useEffect } from 'react';
import { X, Scan, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product, CartItem } from '../types';
import { products } from '../data/products';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  cartItems: CartItem[];
}

const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  cartItems
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setScannedProduct(null);
      setScanSuccess(false);
      setScanError(null);
      setIsScanning(false);
    }
  }, [isOpen]);

  const simulateBarcodeScan = () => {
    setIsScanning(true);
    setScanError(null);
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setScannedProduct(randomProduct);
      setScanSuccess(true);
      setIsScanning(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    if (scannedProduct) {
      const existingItem = cartItems.find(item => item.product.id === scannedProduct.id);
      
      if (existingItem) {
        onAddToCart({
          ...existingItem,
          quantity: existingItem.quantity + 1
        });
      } else {
        onAddToCart({
          product: scannedProduct,
          quantity: 1,
          scannedAt: new Date()
        });
      }
      
      // Reset for next scan
      setScannedProduct(null);
      setScanSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Self-Scan Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scan Area */}
        <div className="p-6">
          {!scannedProduct && !isScanning && (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <div className="relative">
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <Scan className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 border-2 border-amazon-orange rounded-lg"></div>
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amazon-orange"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-amazon-orange"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-amazon-orange"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amazon-orange"></div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Position the barcode within the frame and tap scan
              </p>
              <button
                onClick={simulateBarcodeScan}
                className="bg-amazon-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Scan className="w-5 h-5 inline mr-2" />
                Start Scanning
              </button>
            </div>
          )}

          {isScanning && (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <div className="relative">
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amazon-orange"></div>
                  </div>
                  <div className="absolute inset-0 border-2 border-amazon-orange rounded-lg animate-pulse"></div>
                </div>
              </div>
              <p className="text-amazon-orange font-medium">Scanning barcode...</p>
            </div>
          )}

          {scannedProduct && scanSuccess && (
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-700 font-medium">Product scanned successfully!</p>
              </div>
              
              <div className="bg-white border rounded-lg p-4 mb-4 text-left">
                <div className="flex items-center space-x-4">
                  <img
                    src={scannedProduct.image}
                    alt={scannedProduct.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{scannedProduct.name}</h3>
                    <p className="text-sm text-gray-600">{scannedProduct.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{scannedProduct.rating}</span>
                      <span className="text-sm text-gray-500">({scannedProduct.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-amazon-orange">
                      ${scannedProduct.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amazon-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    setScannedProduct(null);
                    setScanSuccess(false);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Scan Another
                </button>
              </div>
            </div>
          )}

          {scanError && (
            <div className="text-center">
              <div className="bg-red-50 rounded-lg p-4 mb-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-medium">Scan failed</p>
                <p className="text-red-600 text-sm">{scanError}</p>
              </div>
              <button
                onClick={simulateBarcodeScan}
                className="bg-amazon-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanModal;