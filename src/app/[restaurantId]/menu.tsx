import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from '../../components/Carousel';
import MenuItemCard from '../../components/MenuItemCard';
import { Colors } from '../../constants/Colors';

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('appetizers');

  // Mock menu data - replace with actual data fetching
  const menuCategories = {
    appetizers: [
      {
        id: 1,
        name: 'Truffle Arancini',
        description: 'Crispy risotto balls with truffle oil and parmesan',
        price: '14.99',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      },
      {
        id: 2,
        name: 'Burrata Caprese',
        description: 'Fresh burrata with heirloom tomatoes and basil',
        price: '16.99',
        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
      },
      {
        id: 3,
        name: 'Tuna Tartare',
        description: 'Fresh tuna with avocado and citrus dressing',
        price: '18.99',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      },
    ],
    mains: [
      {
        id: 4,
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon herb butter and vegetables',
        price: '28.99',
        image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      },
      {
        id: 5,
        name: 'Ribeye Steak',
        description: 'Prime ribeye with garlic mashed potatoes',
        price: '42.99',
        image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg',
      },
      {
        id: 6,
        name: 'Lobster Ravioli',
        description: 'House-made ravioli with lobster in cream sauce',
        price: '32.99',
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
      },
    ],
    desserts: [
      {
        id: 7,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with vanilla ice cream',
        price: '12.99',
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      },
      {
        id: 8,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: '10.99',
        image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg',
      },
      {
        id: 9,
        name: 'Crème Brûlée',
        description: 'Vanilla custard with caramelized sugar',
        price: '11.99',
        image: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg',
      },
    ],
    beverages: [
      {
        id: 10,
        name: 'Craft Cocktail',
        description: 'House special with premium spirits',
        price: '14.99',
        image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
      },
      {
        id: 11,
        name: 'Wine Selection',
        description: 'Curated wines from around the world',
        price: '8.99',
        image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
      },
    ],
  };

  const categories = [
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Courses', icon: '🍽️' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '🍷' },
  ];

  const handleMenuItemPress = (item: any) => {
    // Handle adding item to cart or showing details
    console.log('Selected item:', item);
  };

  const renderMenuItem = (item: any) => (
    <MenuItemCard item={item} onPress={() => handleMenuItemPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <Text style={styles.subtitle}>Discover our delicious offerings</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === category.id && styles.categoryTabTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items Carousel */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>
          {categories.find(c => c.id === selectedCategory)?.name}
        </Text>
        
        {menuCategories[selectedCategory as keyof typeof menuCategories] && (
          <Carousel
            data={menuCategories[selectedCategory as keyof typeof menuCategories]}
            renderItem={renderMenuItem}
            itemWidth={280}
            spacing={16}
            showIndicators={true}
            style={styles.menuCarousel}
          />
        )}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {menuCategories[selectedCategory as keyof typeof menuCategories]?.length || 0}
          </Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>★ 4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>15-25</Text>
          <Text style={styles.statLabel}>Min</Text>
        </View>
      </View>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  categoryTabs: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  categoryTabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  menuSection: {
    flex: 1,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  menuCarousel: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});