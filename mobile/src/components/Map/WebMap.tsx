import React from "react";
import { View, Text, Platform } from "react-native";

/**
 * A web-compatible map component for the EcoCharge app.
 * On web, it renders a stylized message or an iframe-based map.
 * On native, it is not used directly.
 */
export default function WebMap({ 
  stations, 
  onMarkerPress, 
  userLocation 
}: { 
  stations: any[], 
  onMarkerPress: (station: any) => void,
  userLocation?: any
}) {
  if (Platform.OS !== "web") return null;

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-8">
      <View className="bg-white p-10 rounded-[40px] shadow-2xl items-center max-w-md w-full border border-gray-100">
        <View className="bg-emerald-50 w-20 h-20 rounded-full items-center justify-center mb-6">
          <Text className="text-4xl">🌍</Text>
        </View>
        <Text className="text-2xl font-bold text-dark text-center mb-4">Web Experience</Text>
        <Text className="text-gray-500 text-center leading-6 mb-8">
          The interactive map is optimized for mobile devices. For the best experience, including real-time navigation and charging session control, please use the iOS or Android app.
        </Text>
        
        {/* Simplified Station List for Web View */}
        <View className="w-full space-y-4">
          <Text className="font-bold text-dark mb-2">Nearby Stations</Text>
          {stations.slice(0, 3).map((station) => (
            <View key={station.id} className="flex-row items-center justify-between bg-gray-50 p-4 rounded-2xl">
              <View>
                <Text className="font-bold text-dark">{station.name}</Text>
                <Text className="text-xs text-gray-400">{station.address}</Text>
              </View>
              <View className="items-end">
                <Text className="text-primary font-bold">{station.cleanEnergyPercentage}%</Text>
                <Text className="text-[10px] text-primary uppercase font-bold">Clean</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
