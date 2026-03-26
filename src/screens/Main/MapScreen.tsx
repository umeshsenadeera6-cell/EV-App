import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MOCK_STATIONS, ChargingStation } from "../../store/useStationStore";
import { Search, Filter, Zap, Navigation as NavIcon } from "lucide-react-native";
import WebMap from "../../components/Map/WebMap";
import CustomMarker from "../../components/Map/CustomMarker";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function MapScreen() {
  const navigation = useNavigation<any>();
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  
  useEffect(() => {
    setStations(MOCK_STATIONS);
  }, []);

  const onStationPress = (station: ChargingStation) => {
    setSelectedStation(station);
    if (Platform.OS !== "web" && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: station.latitude,
        longitude: station.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Map View */}
      {Platform.OS === "web" ? (
        <WebMap 
          stations={stations} 
          onMarkerPress={onStationPress} 
        />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          className="flex-1"
          initialRegion={{
            latitude: -37.8136,
            longitude: 144.9631,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {stations.map((station) => (
            <Marker
              key={station.id}
              coordinate={{ latitude: station.latitude, longitude: station.longitude }}
              onPress={() => onStationPress(station)}
            >
              <CustomMarker percentage={station.cleanEnergyPercentage} />
            </Marker>
          ))}
        </MapView>
      )}

      {/* Floating Controls */}
      <SafeAreaView className="absolute top-0 left-0 right-0 px-6 pt-4 flex-row justify-between pointer-events-box-none">
        <View className="flex-1 bg-white h-14 rounded-2xl shadow-lg flex-row items-center px-4 mr-4 border border-gray-100">
          <Search size={20} color="#9ca3af" />
          <TextInput 
            placeholder="Search charging stations..." 
            className="flex-1 ml-3 text-dark font-medium"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity className="bg-white w-14 h-14 rounded-2xl shadow-lg items-center justify-center border border-gray-100">
          <Filter size={24} color="#111827" />
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity 
        className="absolute bottom-40 right-6 bg-white w-14 h-14 rounded-full shadow-xl items-center justify-center border border-gray-100 z-50"
        onPress={() => {}}
      >
        <NavIcon size={24} color="#10b981" />
      </TouchableOpacity>

      {/* Bottom Sheet for Stations (Native only) */}
      {Platform.OS !== "web" && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={["35%", "85%"]}
          backgroundStyle={{ borderRadius: 40 }}
        >
          <BottomSheetView className="p-6 flex-1">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-dark">Nearby Stations</Text>
              <View className="bg-emerald-50 px-3 py-1 rounded-full">
                <Text className="text-primary text-xs font-bold">{stations.length} nearby</Text>
              </View>
            </View>

            <BottomSheetFlatList
              data={stations}
              keyExtractor={(item: ChargingStation) => item.id}
              renderItem={({ item }: { item: ChargingStation }) => (
                <TouchableOpacity 
                  onPress={() => navigation.navigate("StationDetails", { station: item })}
                  className="flex-row items-center bg-gray-50 p-4 rounded-3xl mb-4 border border-gray-100"
                >
                  <View className={`w-14 h-14 rounded-2xl items-center justify-center ${
                    item.cleanEnergyPercentage >= 90 ? "bg-emerald-100" : "bg-amber-100"
                  }`}>
                    <Zap size={24} color={item.cleanEnergyPercentage >= 90 ? "#10b981" : "#fbbf24"} />
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="font-bold text-dark text-lg">{item.name}</Text>
                    <Text className="text-gray-400 text-sm">{item.distance} km • {item.waitTime}m wait</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-primary font-bold text-lg">{item.cleanEnergyPercentage}%</Text>
                    <Text className="text-[10px] text-primary uppercase font-bold tracking-tighter">Clean Energy</Text>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </BottomSheetView>
        </BottomSheet>
      )}

      {/* Web List View fallback */}
      {Platform.OS === "web" && (
        <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-white rounded-t-[40px] shadow-2xl p-6 border-t border-gray-100">
          <Text className="text-xl font-bold text-dark mb-4">Nearby Stations</Text>
          <ScrollView>
             {stations.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  className="flex-row items-center bg-gray-50 p-4 rounded-3xl mb-4"
                >
                  <Text className="font-bold text-dark">{item.name}</Text>
                </TouchableOpacity>
             ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
