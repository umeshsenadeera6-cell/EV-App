import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Join the Green Revolution",
    description: "2.5k kg CO₂ saved by our community this month alone.",
    color: "#10b981",
  },
  {
    title: "Clean Energy First",
    description: "98% of our network's energy comes from renewable sources.",
    color: "#34d399",
  },
  {
    title: "Expert EV Network",
    description: "Join 10,000+ drivers making a difference for our planet.",
    color: "#059669",
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-8">
        <View 
          className="w-64 h-64 rounded-full mb-12 items-center justify-center"
          style={{ backgroundColor: slides[currentSlide].color + "20" }}
        >
          <View className="w-48 h-48 rounded-full bg-primary items-center justify-center">
            <Text className="text-white text-4xl font-bold">Eco</Text>
          </View>
        </View>
        
        <Text className="text-3xl font-bold text-dark text-center mb-4">
          {slides[currentSlide].title}
        </Text>
        <Text className="text-lg text-gray-500 text-center leading-6">
          {slides[currentSlide].description}
        </Text>

        <View className="flex-row mt-12 mb-12">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={nextSlide}
          className="bg-primary w-full py-4 rounded-2xl items-center shadow-lg shadow-emerald-200"
        >
          <Text className="text-white text-lg font-semibold">
            {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>

        {currentSlide < slides.length - 1 && (
          <TouchableOpacity 
            onPress={() => navigation.navigate("Login")}
            className="mt-6"
          >
            <Text className="text-gray-400 text-base font-medium">Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
