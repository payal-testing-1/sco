import React, { useState } from 'react';
import AmazonHeader from './components/AmazonHeader';
import AmazonContent from './components/AmazonContent';
import BottomNavigation from './components/BottomNavigation';
import MoreModal from './components/MoreModal';
import StoreSessionModal from './components/StoreSessionModal';
import ScanModal from './components/ScanModal';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import { CartItem } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isStoreSessionModalOpen, setIsStoreSessionModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === newItem.product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === newItem.product.id
            ? { ...item, quantity: newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'cart') {
      setIsCartModalOpen(true);
    }
  };

  const handleMoreClick = () => {
    setIsMoreModalOpen(true);
  };

  const handleSelfCheckoutClick = () => {
    setIsMoreModalOpen(false);
    if (hasActiveSession) {
      setIsScanModalOpen(true);
    } else {
      setIsStoreSessionModalOpen(true);
    }
  };

  const handleSessionStart = () => {
    setHasActiveSession(true);
    setIsScanModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setHasActiveSession(false);
    setIsCheckoutModalOpen(false);
    setActiveTab('home');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative max-w-md mx-auto">
      <AmazonHeader />
      <AmazonContent />
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartItems={totalItems}
        onMoreClick={handleMoreClick}
      />

      <MoreModal
        isOpen={isMoreModalOpen}
        onClose={() => setIsMoreModalOpen(false)}
        onSelfCheckoutClick={handleSelfCheckoutClick}
      />

      <StoreSessionModal
        isOpen={isStoreSessionModalOpen}
        onClose={() => setIsStoreSessionModalOpen(false)}
        onSessionStart={handleSessionStart}
      />

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        hasActiveSession={hasActiveSession}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

export default App;