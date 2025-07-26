import { Tabs, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons, Fontisto, Ionicons, Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
    const { restaurantId } = useLocalSearchParams();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grayDark,
            tabBarStyle: {
                backgroundColor: Colors.white,
                borderTopWidth: 1,
                borderTopColor: Colors.gray,
                paddingBottom: 8,
                paddingTop: 8,
                height: 80,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            },
            headerShown: false,
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="game"
                options={{
                    title: 'Game',
                    tabBarIcon: ({ color, size }) => <Entypo name="game-controller" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: 'Menu',
                    tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="reservations"
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="table-chair" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'AI Service',
                    tabBarIcon: ({ color, size }) => <Fontisto name="person" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => <Entypo name="shopping-cart" size={size} color={color} />
                }}
            />
        </Tabs>
    )
}