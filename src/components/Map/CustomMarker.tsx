import React from "react";
import { View, Platform } from "react-native";
import { Zap } from "lucide-react-native";

interface CustomMarkerProps {
  percentage: number;
  onPress?: () => void;
}

export default function CustomMarker({ percentage, onPress }: CustomMarkerProps) {
  const getMarkerColor = (p: number) => {
    if (p >= 90) return "#10b981"; // Emerald-500
    if (p >= 50) return "#fbbf24"; // Amber-400
    return "#9ca3af"; // Gray-400
  };

  return (
    <View 
      className="w-10 h-10 rounded-full items-center justify-center border-2 border-white shadow-md"
      style={{ backgroundColor: getMarkerColor(percentage) }}
    >
      <Zap size={20} color="white" />
    </View>
  );
}
