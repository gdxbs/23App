// app/index.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const restaurants = [
    { id: 'restaurant_a', name: 'The Gourmet Place' },
    { id: 'restaurant_b', name: 'Quick Bites' },
    { id: 'restaurant_c', name: 'The Food Factory' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Please select a restaurant:</Text>
      {restaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.buttonContainer}>
          <Button
            title={restaurant.name}
            onPress={() => router.push(`/${restaurant.id}`)}
            color="#009BDE"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});