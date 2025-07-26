import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Colors';

export default function GameScreen() {
  const handlePlayGame = async () => {
    const needleEngineUrl = 'https://needle.tools/'; // Replace with actual game URL
    
    try {
      const supported = await Linking.canOpenURL(needleEngineUrl);
      
      if (supported) {
        await Linking.openURL(needleEngineUrl);
      } else {
        Alert.alert(
          'Cannot open game',
          'Unable to open the game. Please check your internet connection.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while trying to open the game.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Restaurant Games</Text>
          <Text style={styles.subtitle}>Play while you wait!</Text>
        </View>

        {/* Game Preview */}
        <View style={styles.gamePreview}>
          <View style={styles.gameImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg' }}
              style={styles.gameImage}
            />
            <View style={styles.gameOverlay}>
              <Text style={styles.gameTitle}>Interactive Experience</Text>
              <Text style={styles.gameDescription}>
                Powered by Needle Engine
              </Text>
            </View>
          </View>
        </View>

        {/* Game Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.yellow }]}>
              <Text style={styles.featureIconText}>🎮</Text>
            </View>
            <Text style={styles.featureText}>Interactive Games</Text>
          </View>
          
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.green }]}>
              <Text style={styles.featureIconText}>🏆</Text>
            </View>
            <Text style={styles.featureText}>Earn Rewards</Text>
          </View>
          
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.primary }]}>
              <Text style={styles.featureIconText}>⚡</Text>
            </View>
            <Text style={styles.featureText}>Real-time Fun</Text>
          </View>
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayGame}>
          <Text style={styles.playButtonText}>Launch Game</Text>
          <Text style={styles.playButtonSubtext}>Powered by Needle Engine</Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Enjoy interactive games while waiting for your order or reservation.
            Games are optimized for mobile and provide a seamless experience.
          </Text>
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
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  gamePreview: {
    marginBottom: 32,
  },
  gameImageContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  gameImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 156, 222, 0.9)',
    padding: 20,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  playButtonSubtext: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  infoContainer: {
    backgroundColor: Colors.white,
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
  infoText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
});