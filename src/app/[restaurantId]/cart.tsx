import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/Colors';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customizations?: string[];
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Truffle Arancini',
      price: 14.99,
      quantity: 2,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      customizations: ['Extra truffle oil'],
    },
    {
      id: 4,
      name: 'Grilled Salmon',
      price: 28.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      customizations: ['Medium rare', 'No vegetables'],
    },
  ]);

  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const tip = subtotal * 0.18; // 18% tip
  const total = subtotal + tax + tip;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checking out.');
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully! You will receive a confirmation shortly.',
      [
        {
          text: 'OK',
          onPress: () => {
            setCartItems([]);
            setShowCheckout(false);
          }
        }
      ]
    );
  };

  if (showCheckout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowCheckout(false)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView style={styles.content}>
          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.checkoutItem}>
                <Text style={styles.checkoutItemName}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.checkoutItemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity style={styles.paymentMethod}>
              <Text style={styles.paymentMethodText}>💳 Credit Card ending in 1234</Text>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryText}>📍 Dine In - Table Service</Text>
              <Text style={styles.deliverySubtext}>Estimated time: 25-30 minutes</Text>
            </View>
          </View>

          {/* Total Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total Breakdown</Text>
            <View style={styles.totalBreakdown}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax (8%)</Text>
                <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tip (18%)</Text>
                <Text style={styles.totalValue}>${tip.toFixed(2)}</Text>
              </View>
              <View style={[styles.totalRow, styles.finalTotal]}>
                <Text style={styles.finalTotalLabel}>Total</Text>
                <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.checkoutFooter}>
          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>
              Place Order - ${total.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add some delicious items from our menu!</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.content}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImageContainer}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                  )}
                </View>

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  
                  {item.customizations && item.customizations.length > 0 && (
                    <View style={styles.customizations}>
                      {item.customizations.map((customization, index) => (
                        <Text key={index} style={styles.customizationText}>
                          • {customization}
                        </Text>
                      ))}
                    </View>
                  )}

                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Cart Summary */}
          <View style={styles.cartSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax & Fees</Text>
              <Text style={styles.summaryValue}>${(tax + tip).toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    margin: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.grayDark,
    fontSize: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  customizations: {
    marginBottom: 12,
  },
  customizationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartSummary: {
    backgroundColor: Colors.white,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    paddingTop: 12,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: Colors.white,
    margin: 12,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  checkoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkoutItemName: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  checkoutItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.gray,
    borderRadius: 12,
  },
  paymentMethodText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  changeText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  deliveryInfo: {
    padding: 16,
    backgroundColor: Colors.primaryVeryLight,
    borderRadius: 12,
  },
  deliveryText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  deliverySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  totalBreakdown: {
    gap: 8,
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    paddingTop: 12,
    marginTop: 8,
  },
  finalTotalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  finalTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  checkoutFooter: {
    backgroundColor: Colors.white,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
  },
  placeOrderButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});