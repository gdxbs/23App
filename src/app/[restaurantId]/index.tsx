import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Carousel from '../../components/Carousel';
import RestaurantCard from '../../components/RestaurantCard';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { restaurantId } = useLocalSearchParams();

  // Mock restaurant data - replace with actual data fetching
  const restaurants = [
    {
      id: 'restaurant_a',
      name: 'The Gourmet Place',
      description: 'Fine dining experience with exquisite flavors and elegant atmosphere.',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      rating: 4.8,
      cuisine: 'Fine Dining',
    },
    {
      id: 'restaurant_b',
      name: 'Quick Bites',
      description: 'Fast, fresh, and delicious meals for people on the go.',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
      rating: 4.5,
      cuisine: 'Fast Food',
    },
    {
      id: 'restaurant_c',
      name: 'The Food Factory',
      description: 'Industrial-style dining with creative fusion cuisine and craft cocktails.',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      rating: 4.7,
      cuisine: 'Fusion',
    },
  ];

  const currentRestaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];

  const featuredItems = [
    {
      id: 1,
      title: 'Today\'s Special',
      subtitle: 'Chef\'s Recommendation',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    },
    {
      id: 2,
      title: 'Happy Hour',
      subtitle: '50% off drinks',
      image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
    },
    {
      id: 3,
      title: 'Weekend Brunch',
      subtitle: 'Available Sat-Sun',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    },
  ];

  const renderRestaurantCard = (restaurant: any) => (
    <RestaurantCard restaurant={restaurant} />
  );

  const renderFeatureCard = (item: any) => (
    <TouchableOpacity style={styles.featureCard}>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.restaurantName}>{currentRestaurant.name}</Text>
        </View>

        {/* Restaurant Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Restaurant</Text>
          <Carousel
            data={[currentRestaurant]}
            renderItem={renderRestaurantCard}
            itemWidth={width * 0.85}
            showIndicators={false}
            style={styles.carousel}
          />
        </View>

        {/* Featured Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <Carousel
            data={featuredItems}
            renderItem={renderFeatureCard}
            itemWidth={width * 0.7}
            style={styles.carousel}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.primary }]}>
              <Text style={styles.actionButtonText}>View Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.green }]}>
              <Text style={styles.actionButtonText}>Make Reservation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.yellow }]}>
              <Text style={[styles.actionButtonText, { color: Colors.textPrimary }]}>Play Game</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About {currentRestaurant.name}</Text>
            <Text style={styles.infoText}>{currentRestaurant.description}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cuisine:</Text>
              <Text style={styles.infoValue}>{currentRestaurant.cuisine}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rating:</Text>
              <Text style={styles.infoValue}>★ {currentRestaurant.rating}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  carousel: {
    height: 280,
  },
  featureCard: {
    height: 120,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  featureContent: {
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: Colors.white,
    margin: 24,
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
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});