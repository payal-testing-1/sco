import React, { useState, useEffect } from 'react';
import { X, Scan, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

interface StoreSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionStart: () => void;
}

const StoreSessionModal: React.FC<StoreSessionModalProps> = ({
  isOpen,
  onClose,
  onSessionStart
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [storeInfo] = useState({
    name: 'Amazon Fresh - Manhattan',
    address: '123 Broadway, New York, NY 10001',
    closingTime: '11:00 PM',
    storeCode: 'AMZ-NYC-001'
  });

  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (sessionStarted) {
      const updateTime = () => {
        const now = new Date();
        const closing = new Date();
        closing.setHours(23, 0, 0, 0); // 11:00 PM
        
        if (closing < now) {
          closing.setDate(closing.getDate() + 1);
        }
        
        const diff = closing.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeRemaining(`${hours}h ${minutes}m until store closes`);
      };
      
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    }
  }, [sessionStarted]);

  if (!isOpen) return null;

  const handleStartSession = () => {
    setIsScanning(true);
    
    // Simulate barcode scanning
    setTimeout(() => {
      setIsScanning(false);
      setSessionStarted(true);
      
      // Start shopping session after 2 seconds
      setTimeout(() => {
        onSessionStart();
        onClose();
      }, 2000);
    }, 3000);
  };

  const resetModal = () => {
    setIsScanning(false);
    setSessionStarted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Start Shopping Session</h2>
          <button
            onClick={() => {
              resetModal();
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!sessionStarted && !isScanning && (
            <div>
              {/* Store Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-800">{storeInfo.name}</h3>
                    <p className="text-sm text-gray-600">{storeInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Closes at {storeInfo.closingTime}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center mb-6">
                <div className="bg-gray-100 rounded-lg p-8 mb-4">
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                      <Scan className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 border-2 border-amazon-orange rounded-lg"></div>
                    <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-amazon-orange"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-amazon-orange"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-amazon-orange"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-amazon-orange"></div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">Scan Store QR Code</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find the QR code at the store entrance or on shopping carts to start your self-checkout session
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <p className="text-xs text-yellow-800">
                      You must be physically present in the store to start a session
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartSession}
                className="w-full bg-amazon-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                <Scan className="w-5 h-5 inline mr-2" />
                Scan Store Code
              </button>
            </div>
          )}

          {isScanning && (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange"></div>
                  </div>
                  <div className="absolute inset-0 border-2 border-amazon-orange rounded-lg animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Scanning Store Code...</h3>
              <p className="text-gray-600 text-sm">Please hold steady</p>
            </div>
          )}

          {sessionStarted && (
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-6 mb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-green-700 mb-2">Session Started!</h3>
                <p className="text-green-600 text-sm mb-3">
                  Welcome to {storeInfo.name}
                </p>
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{timeRemaining}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                You can now start scanning items. Your session will remain active until checkout or store closing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSessionModal;