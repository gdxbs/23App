// app/[restaurantId]/_layout.tsx
import { Tabs, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons, Fontisto, Ionicons, Entypo } from "@expo/vector-icons";

export default function TabLayout() {
    const { restaurantId } = useLocalSearchParams();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#009BDE",
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerTitle: `Welcome to ${restaurantId}`, // Example of using the restaurantId
                    headerTintColor: "#009BDE",
                    tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
                }}
            />
            {/* The rest of your Tab.Screen components remain the same */}
            <Tabs.Screen
                name="game"
                options={{
                    title: 'Game',
                    tabBarIcon: ({ color }) => <Entypo name="game-controller" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: 'Menu',
                    tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="reservations"
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="table-chair" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'AI Service',
                    tabBarIcon: ({ color }) => <Fontisto name="person" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color }) => <Entypo name="shopping-cart" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}