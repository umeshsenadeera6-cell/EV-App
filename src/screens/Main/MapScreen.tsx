import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Search, Filter, Navigation as NavIcon, Zap } from "lucide-react-native";
import { useStationStore, MOCK_STATIONS, ChargingStation } from "../../store/useStationStore";
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const navigation = useNavigation<any>();
  const { stations, setStations, setSelectedStation } = useStationStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  useEffect(() => {
    setStations(MOCK_STATIONS);
  }, []);

  const getMarkerColor = (percentage: number) => {
    if (percentage >= 90) return "#22c55e"; // Green
    if (percentage >= 50) return "#eab308"; // Yellow
    return "#9ca3af"; // Gray
  };

  const renderStationCard = ({ item }: { item: ChargingStation }) => (
    <TouchableOpacity 
      onPress={() => {
        setSelectedStation(item);
        navigation.navigate("StationDetails");
      }}
      className="bg-white p-4 mx-4 mb-3 rounded-2xl border border-gray-100 flex-row items-center"
    >
      <View className="flex-1">
        <Text className="text-lg font-bold text-dark mb-1">{item.name}</Text>
        <Text className="text-gray-500 mb-2">{item.address}</Text>
        <View className="flex-row items-center">
          <View className="bg-emerald-50 px-2 py-1 rounded-md flex-row items-center mr-3">
            <Zap size={14} color="#10b981" />
            <Text className="text-primary font-bold ml-1">{item.cleanEnergyPercentage}% Clean</Text>
          </View>
          <Text className="text-gray-400 font-medium">{item.ports.filter(p => p.status === "available").length} / {item.ports.length} available</Text>
        </View>
      </View>
      <View className="bg-gray-50 p-3 rounded-xl">
        <NavIcon size={20} color="#10b981" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
            onPress={() => setSelectedStation(station)}
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center border-2 border-white shadow-md"
              style={{ backgroundColor: getMarkerColor(station.cleanEnergyPercentage) }}
            >
              <Zap size={20} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating Controls */}
      <SafeAreaView className="absolute top-12 left-6 right-6 flex-row justify-between">
        <View className="bg-white flex-1 mr-4 rounded-2xl shadow-lg border border-gray-100 flex-row items-center px-4 py-3">
          <Search size={20} color="#9ca3af" />
          <Text className="ml-3 text-gray-400 text-base">Search charging stations...</Text>
        </View>
        <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100">
          <Filter size={24} color="#111827" />
        </TouchableOpacity>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={["35%", "85%"]}
        handleIndicatorStyle={{ backgroundColor: "#e5e7eb", width: 40 }}
      >
        <BottomSheetView className="flex-1 bg-white">
          <View className="px-6 py-4 flex-row justify-between items-center">
            <Text className="text-xl font-bold text-dark">Nearby Stations</Text>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Filter</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetFlatList
            data={stations}
            keyExtractor={(item) => item.id}
            renderItem={renderStationCard}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const mapStyle = [
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.business",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "stylers": [{ "visibility": "off" }]
  }
];

import { SafeAreaView } from "react-native-safe-area-context";
