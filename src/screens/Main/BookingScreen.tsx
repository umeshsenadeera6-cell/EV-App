import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import { ChevronLeft, Calendar as CalendarIcon, Clock, Zap, CheckCircle2 } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChargingStation, useStationStore } from "../../store/useStationStore";
import { bookingService } from "../../services/booking";
import { useAuthStore } from "../../store/useAuthStore";

export default function BookingScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { station } = route.params as { station: ChargingStation };
  const user = useAuthStore(state => state.user);
  const setActiveReservation = useStationStore(state => state.setActiveReservation);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedPortIndex, setSelectedPortIndex] = useState(0);

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleConfirmBooking = async () => {
    if (!selectedTimeSlot) {
      Alert.alert("Error", "Please select a time slot.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "You must be logged in to book.");
      return;
    }

    const reservation = {
      stationId: station.id,
      userId: user.uid,
      startTime: new Date(), // In a real app, combine selectedDate and selectedTimeSlot
      endTime: new Date(Date.now() + 3600000), // 1 hour later
      status: 'confirmed' as const,
      portIndex: selectedPortIndex,
    };

    try {
      const id = await bookingService.createReservation(reservation);
      setActiveReservation({ id, ...reservation });
      Alert.alert("Success", "Your charging spot has been reserved!", [
        { text: "View Dashboard", onPress: () => navigation.navigate("MainTabs", { screen: "Impact" }) }
      ]);
    } catch (error) {
      console.error("Booking failed:", error);
      Alert.alert("Error", "Failed to confirm booking. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 flex-row items-center border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <ChevronLeft size={28} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-dark ml-2">Review & Book</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Station Summary */}
        <View className="bg-gray-50 p-5 rounded-3xl mb-8 flex-row items-center border border-gray-100">
          <View className="bg-emerald-100 w-14 h-14 rounded-2xl items-center justify-center">
            <Zap size={28} color="#10b981" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-dark">{station.name}</Text>
            <Text className="text-gray-500 text-sm">{station.address}</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <CalendarIcon size={20} color="#10b981" />
            <Text className="text-lg font-bold text-dark ml-2">Select Date</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {[0, 1, 2, 3, 4].map((i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const isSelected = selectedDate.getDate() === date.getDate();
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDate(date)}
                  className={`mr-3 px-5 py-3 rounded-2xl border ${
                    isSelected ? "bg-primary border-primary" : "bg-white border-gray-100"
                  }`}
                >
                  <Text className={`text-xs font-bold uppercase ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text className={`text-lg font-bold ${isSelected ? "text-white" : "text-dark"}`}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Clock size={20} color="#10b981" />
            <Text className="text-lg font-bold text-dark ml-2">Available Slots</Text>
          </View>
          <View className="flex-row flex-wrap">
            {timeSlots.map((time) => {
              const isSelected = selectedTimeSlot === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTimeSlot(time)}
                  className={`w-[48%] mb-3 mr-[2%] px-4 py-3 rounded-2xl border items-center ${
                    isSelected ? "bg-primary border-primary" : "bg-white border-gray-100"
                  }`}
                >
                  <Text className={`font-bold ${isSelected ? "text-white" : "text-dark"}`}>{time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Port Selection */}
        <View className="mb-10">
          <Text className="text-lg font-bold text-dark mb-4">Select Port</Text>
          {station.ports.map((port, index) => (
            <TouchableOpacity
              key={port.id}
              onPress={() => setSelectedPortIndex(index)}
              className={`flex-row items-center p-4 rounded-2xl border mb-3 ${
                selectedPortIndex === index ? "border-primary bg-emerald-50/30" : "border-gray-100 bg-white"
              }`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center ${
                selectedPortIndex === index ? "bg-primary" : "bg-gray-100"
              }`}>
                <Zap size={18} color={selectedPortIndex === index ? "white" : "#9ca3af"} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-bold text-dark">{port.type} - {port.power}</Text>
                <Text className="text-gray-500 text-xs">Port ID: {port.id}</Text>
              </View>
              {selectedPortIndex === index && <CheckCircle2 size={24} color="#10b981" />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer / Confirm Button */}
      <View className="p-6 border-t border-gray-100 bg-white shadow-2xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Pricing</Text>
            <Text className="text-2xl font-bold text-dark">${station.pricing.sessionFee.toFixed(2)} + kWh</Text>
          </View>
          <View className="bg-emerald-50 px-3 py-1 rounded-full">
            <Text className="text-primary font-bold text-xs">Free for Premium</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleConfirmBooking}
          className="bg-primary w-full py-5 rounded-2xl items-center shadow-lg shadow-emerald-200"
        >
          <Text className="text-white text-xl font-bold">Confirm Reservation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
