import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Room Light Scan' }} />
        <Stack.Screen name="analyzing" options={{ title: 'Analyzing...' }} />
        <Stack.Screen name="result" options={{ title: 'Results' }} />
      </Stack>
    </>
  );
}

