import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from "react-native";
import { User, Car, Bell, Shield, LogOut, ChevronRight, Settings } from "lucide-react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const menuItems = [
    { label: "My Vehicle", icon: Car, value: "Tesla Model 3" },
    { label: "Notifications", icon: Bell, type: "switch" },
    { label: "Security", icon: Shield, type: "link" },
    { label: "Preferences", icon: Settings, type: "link" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4">
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-emerald-50 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
            <User size={48} color="#10b981" />
          </View>
          <Text className="text-2xl font-bold text-dark">Eco Driver</Text>
          <Text className="text-gray-500">Premium Member</Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-dark">84</Text>
            <Text className="text-gray-500 text-xs">Sessions</Text>
          </View>
          <View className="w-[1px] bg-gray-200 h-8 self-center" />
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-dark">1.2k</Text>
            <Text className="text-gray-500 text-xs">kWh total</Text>
          </View>
          <View className="w-[1px] bg-gray-200 h-8 self-center" />
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-dark">12</Text>
            <Text className="text-gray-500 text-xs">Streak</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="space-y-4 mb-8">
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-50 shadow-sm"
              disabled={item.type === "switch"}
            >
              <View className="flex-row items-center">
                <View className="bg-gray-50 p-2 rounded-xl mr-4">
                  <item.icon size={20} color="#6b7280" />
                </View>
                <Text className="text-lg font-semibold text-dark">{item.label}</Text>
              </View>
              
              <View className="flex-row items-center">
                {item.value && <Text className="text-gray-400 mr-2">{item.value}</Text>}
                {item.type === "switch" ? (
                  <Switch 
                    trackColor={{ false: "#e5e7eb", true: "#d1fae5" }}
                    thumbColor={true ? "#10b981" : "#f4f3f4"}
                    value={true}
                  />
                ) : (
                  <ChevronRight size={20} color="#9ca3af" />
                )}
              </View>
            </TouchableOpacity>
          )) as any}
        </View>

        <TouchableOpacity 
          onPress={logout}
          className="flex-row items-center justify-center bg-red-50 py-5 rounded-2xl mb-12 border border-red-100"
        >
          <LogOut size={20} color="#ef4444" className="mr-2" />
          <Text className="text-red-500 font-bold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
