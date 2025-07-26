import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ 
                    title: '23',
                    headerLargeTitle: true, // Optional: for a larger iOS-style header
                }} 
            />
            <Stack.Screen 
                name="[restaurantId]" 
                options={({ route }) => ({ 
                    // This sets the header title to the restaurant's ID
                    title: route.params.restaurantId as string,
                })}
            />
        </Stack>
    );
};