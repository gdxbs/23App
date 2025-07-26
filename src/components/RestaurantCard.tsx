import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    description: string;
    image: string;
    rating?: number;
    cuisine?: string;
  };
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

export default function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {restaurant.rating || '4.5'}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        {restaurant.cuisine && (
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        )}
        <Text style={styles.description} numberOfLines={2}>
          {restaurant.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'space-between',
    padding: 16,
  },
  ratingContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: Colors.yellow,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});