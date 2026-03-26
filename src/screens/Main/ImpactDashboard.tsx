import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Leaf, Zap, Users, Trophy, ChevronRight, Share2 } from "lucide-react-native";

export default function ImpactDashboardScreen() {
  const stats = [
    { label: "CO₂ Saved", value: "124.5 kg", icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Clean Energy", value: "94%", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Sessions", value: "18", icon: Zap, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-500 font-medium">Your Impact</Text>
            <Text className="text-3xl font-bold text-dark">Hello, Driver!</Text>
          </View>
          <TouchableOpacity className="bg-gray-50 p-3 rounded-2xl">
            <Share2 size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Hero Stats Card */}
        <View className="bg-primary rounded-[32px] p-8 mb-8 shadow-xl shadow-emerald-200">
          <View className="flex-row items-center mb-4">
            <Leaf size={24} color="white" />
            <Text className="text-white/80 font-bold ml-2 uppercase tracking-wider">Lifetime Impact</Text>
          </View>
          <Text className="text-white text-5xl font-bold mb-2">2.5k kg</Text>
          <Text className="text-white/80 text-lg mb-6">Total CO₂ emissions saved</Text>
          <View className="h-[1px] bg-white/20 mb-6" />
          <View className="flex-row items-center">
            <View className="bg-white/20 p-2 rounded-lg mr-3">
              <Text className="text-white text-2xl">🌲</Text>
            </View>
            <Text className="text-white font-semibold text-lg">Equivalent to 125 trees planted</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-4 mb-8">
          {stats.map((stat, index) => (
            <View key={index} className={`flex-1 ${stat.bg} p-4 rounded-3xl items-center`}>
              <stat.icon size={20} className={stat.color} />
              <Text className="text-dark font-bold text-lg mt-2">{stat.value}</Text>
              <Text className="text-gray-500 text-xs text-center">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-dark">Recent Badges</Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold">View All</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row gap-4 mb-8">
          {["Solar Champion", "100kg Saver", "Early Bird"].map((badge, i) => (
            <View key={i} className="bg-gray-50 p-4 rounded-3xl items-center flex-1 border border-gray-100">
              <View className="w-12 h-12 bg-white rounded-2xl shadow-sm items-center justify-center mb-2">
                <Trophy size={24} color={i === 0 ? "#f59e0b" : "#9ca3af"} />
              </View>
              <Text className="text-dark font-bold text-xs text-center">{badge}</Text>
            </View>
          ))}
        </View>

        {/* Leaderboard Preview */}
        <View className="bg-dark rounded-[32px] p-6 mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <Trophy size={20} color="#f59e0b" />
              <Text className="text-white font-bold ml-2">Regional Leaderboard</Text>
            </View>
            <ChevronRight size={20} color="white" />
          </View>
          
          {[1, 2, 3].map((rank) => (
            <View key={rank} className="flex-row items-center justify-between mb-4 last:mb-0">
              <View className="flex-row items-center">
                <Text className="text-white/40 font-bold w-6">{rank}</Text>
                <View className="w-10 h-10 bg-white/10 rounded-full mr-3" />
                <Text className="text-white font-medium">User {rank * 123}</Text>
              </View>
              <Text className="text-primary font-bold">{450 - rank * 20}kg</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
