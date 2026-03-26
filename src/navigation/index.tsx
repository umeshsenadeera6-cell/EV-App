import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Map, Zap, User, BarChart3 } from "lucide-react-native";

// Auth Screens
import OnboardingScreen from "../screens/Auth/Onboarding";
import LoginScreen from "../screens/Auth/Login";
import RegisterScreen from "../screens/Auth/Register";

// Main Screens
import MapScreen from "../screens/Main/MapScreen";
import StationDetailsScreen from "../screens/Main/StationDetails";
import ImpactDashboardScreen from "../screens/Main/ImpactDashboard";
import ProfileScreen from "../screens/Main/ProfileScreen";

import { useAuthStore } from "../store/useAuthStore";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Impact"
        component={ImpactDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="StationDetails" component={StationDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
