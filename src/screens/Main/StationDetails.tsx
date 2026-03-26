import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useStationStore } from "../../store/useStationStore";
import { ChevronLeft, Zap, MapPin, Clock, Star, Info, ShieldCheck } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function StationDetailsScreen() {
  const { selectedStation } = useStationStore();
  const navigation = useNavigation();

  if (!selectedStation) return null;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Hero Image */}
        <View className="relative h-72">
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1620241031336-d87780f2bead?q=80&w=2070&auto=format&fit=crop" }} 
            className="w-full h-full"
          />
          <SafeAreaView className="absolute top-6 left-6">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="bg-white/90 p-2 rounded-full shadow-lg"
            >
              <ChevronLeft size={24} color="#111827" />
            </TouchableOpacity>
          </SafeAreaView>
          <View className="absolute bottom-6 left-6 bg-white px-3 py-1 rounded-full shadow-lg flex-row items-center">
            <ShieldCheck size={16} color="#10b981" />
            <Text className="ml-1 font-bold text-primary">Eco-Certified</Text>
          </View>
        </View>

        <View className="px-6 py-8">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-dark mb-1">{selectedStation.name}</Text>
              <View className="flex-row items-center">
                <MapPin size={16} color="#6b7280" />
                <Text className="text-gray-500 ml-1">{selectedStation.address}</Text>
              </View>
            </View>
            <View className="bg-emerald-50 p-3 rounded-2xl items-center">
              <Text className="text-primary text-xl font-bold">{selectedStation.cleanEnergyPercentage}%</Text>
              <Text className="text-primary text-xs font-semibold">Clean</Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View className="flex-row justify-between mb-8 bg-gray-50 rounded-2xl p-4">
            <View className="items-center flex-1">
              <Clock size={20} color="#6b7280" className="mb-1" />
              <Text className="text-dark font-bold">{selectedStation.waitTime}m wait</Text>
              <Text className="text-gray-400 text-xs text-center">Current queue</Text>
            </View>
            <View className="w-[1px] bg-gray-200 h-10 self-center" />
            <View className="items-center flex-1">
              <Zap size={20} color="#6b7280" className="mb-1" />
              <Text className="text-dark font-bold">${selectedStation.pricing.perKWh}/kWh</Text>
              <Text className="text-gray-400 text-xs text-center">Unit price</Text>
            </View>
            <View className="w-[1px] bg-gray-200 h-10 self-center" />
            <View className="items-center flex-1">
              <Star size={20} color="#f59e0b" className="mb-1" />
              <Text className="text-dark font-bold">{selectedStation.rating}</Text>
              <Text className="text-gray-400 text-xs text-center">({selectedStation.totalReviews} reviews)</Text>
            </View>
          </View>

          {/* Port Availability */}
          <Text className="text-xl font-bold text-dark mb-4">Available Ports</Text>
          <View className="flex-row flex-wrap gap-4 mb-8">
            {selectedStation.ports.map((port) => (
              <View 
                key={port.id}
                className={`p-4 rounded-2xl border-2 flex-1 min-w-[140px] ${
                  port.status === "available" ? "border-emerald-100 bg-emerald-50/30" : "border-gray-100 bg-gray-50"
                }`}
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-dark">{port.power}</Text>
                  <View className={`w-3 h-3 rounded-full ${port.status === "available" ? "bg-emerald-500" : "bg-gray-300"}`} />
                </View>
                <Text className="text-gray-500 text-sm mb-1">{port.id}</Text>
                <Text className={`font-semibold ${port.status === "available" ? "text-primary" : "text-gray-400"}`}>
                  {port.status.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          {/* Community Tips */}
          <View className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100">
            <View className="flex-row items-center mb-3">
              <Info size={20} color="#d97706" />
              <Text className="ml-2 font-bold text-amber-900">Community Tip</Text>
            </View>
            <Text className="text-amber-800 leading-6">
              "Great spot! The cafe next door has excellent coffee and free WiFi while you wait. Usually less busy before 8 AM."
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <SafeAreaView className="bg-white border-t border-gray-100 px-6 py-4 flex-row items-center">
        <TouchableOpacity 
          className="flex-1 bg-gray-100 py-4 rounded-2xl items-center mr-4"
        >
          <Text className="text-dark font-bold">Navigate</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 bg-primary py-4 rounded-2xl items-center shadow-lg shadow-emerald-200"
        >
          <Text className="text-white font-bold">Start Session</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
