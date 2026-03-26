import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Modal } from "react-native";
import { useSessionStore } from "../../store/useSessionStore";
import { Zap, Clock, Leaf, DollarSign, X } from "lucide-react-native";
import { formatDistanceToNow } from "date-fns";

export default function ActiveSessionScreen() {
  const { activeSession, updateSession, endSession } = useSessionStore();
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!activeSession || activeSession.status !== "active") return;

    const interval = setInterval(() => {
      // Simulate charging progress
      const addedEnergy = 0.05; // 0.05 kWh every 2 seconds
      const addedCost = addedEnergy * 0.25;
      const addedCO2 = addedEnergy * 0.45; // 0.45 kg per kWh saved

      updateSession({
        energyDelivered: (activeSession.energyDelivered || 0) + addedEnergy,
        cost: (activeSession.cost || 0) + addedCost,
        co2Saved: (activeSession.co2Saved || 0) + addedCO2,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeSession?.status]);

  if (!activeSession) return null;

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 px-8 pt-12 items-center">
        <View className="bg-white/20 p-4 rounded-full mb-8">
          <Zap size={48} color="white" />
        </View>
        
        <Text className="text-white/80 font-bold mb-2 uppercase tracking-widest">Active Charging Session</Text>
        <Text className="text-white text-4xl font-bold mb-12">EcoCharge Hub</Text>

        {/* Live Metrics Ring (Simplified as a Box for now) */}
        <View className="w-64 h-64 rounded-full border-8 border-white/20 items-center justify-center mb-12">
          <View className="items-center">
            <Text className="text-white text-6xl font-black">{activeSession.energyDelivered.toFixed(2)}</Text>
            <Text className="text-white/60 font-bold text-lg">kWh</Text>
          </View>
        </View>

        <View className="flex-row gap-6 mb-12">
          <View className="items-center flex-1">
            <Leaf size={24} color="white" />
            <Text className="text-white font-bold text-xl mt-1">{activeSession.co2Saved.toFixed(2)}kg</Text>
            <Text className="text-white/60 text-xs text-center">CO₂ Saved</Text>
          </View>
          <View className="items-center flex-1">
            <DollarSign size={24} color="white" />
            <Text className="text-white font-bold text-xl mt-1">${activeSession.cost.toFixed(2)}</Text>
            <Text className="text-white/60 text-xs text-center">Current Cost</Text>
          </View>
          <View className="items-center flex-1">
            <Clock size={24} color="white" />
            <Text className="text-white font-bold text-xl mt-1">
              {formatDistanceToNow(activeSession.startTime, { addSuffix: false })}
            </Text>
            <Text className="text-white/60 text-xs text-center">Elapsed</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => {
            endSession();
            setShowSummary(true);
          }}
          className="bg-white/10 w-full py-5 rounded-3xl items-center border border-white/20 mt-auto mb-10"
        >
          <Text className="text-white text-xl font-bold">End Session</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Modal */}
      <Modal visible={showSummary} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[40px] p-8">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-3xl font-bold text-dark">Session Summary</Text>
              <TouchableOpacity onPress={() => setShowSummary(false)}>
                <X size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <View className="bg-emerald-50 rounded-3xl p-6 items-center mb-8">
              <View className="bg-primary p-3 rounded-full mb-4">
                <Leaf size={32} color="white" />
              </View>
              <Text className="text-primary text-4xl font-black mb-1">+{activeSession.co2Saved.toFixed(2)} kg</Text>
              <Text className="text-primary/70 font-bold">Total CO₂ Saved</Text>
            </View>

            <View className="space-y-4 mb-8">
              <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
                <Text className="text-gray-500 font-medium">Energy Delivered</Text>
                <Text className="text-dark font-bold text-lg">{activeSession.energyDelivered.toFixed(2)} kWh</Text>
              </View>
              <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
                <Text className="text-gray-500 font-medium">Session Cost</Text>
                <Text className="text-dark font-bold text-lg">${activeSession.cost.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between items-center py-4">
                <Text className="text-gray-500 font-medium">Duration</Text>
                <Text className="text-dark font-bold text-lg">24 mins</Text>
              </View>
            </View>

            <TouchableOpacity 
              className="bg-primary w-full py-5 rounded-2xl items-center mb-4"
              onPress={() => setShowSummary(false)}
            >
              <Text className="text-white text-lg font-bold">Share My Impact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
