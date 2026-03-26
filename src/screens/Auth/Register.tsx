import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Mail, Lock, User, ArrowRight, ChevronLeft } from "lucide-react-native";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // TODO: Connect to Firebase and Zustand store
    console.log("Register with", name, email, password);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-8 pt-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
            <ChevronLeft size={28} color="#111827" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-4xl font-bold text-dark mb-2">Create Account</Text>
            <Text className="text-lg text-gray-500">Join the community and start saving CO₂.</Text>
          </View>

          <View className="space-y-6">
            <View>
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4">
                <User size={20} color="#9ca3af" />
                <TextInput
                  placeholder="John Doe"
                  className="flex-1 ml-3 text-dark text-base"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4">
                <Mail size={20} color="#9ca3af" />
                <TextInput
                  placeholder="name@example.com"
                  className="flex-1 ml-3 text-dark text-base"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Password</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4">
                <Lock size={20} color="#9ca3af" />
                <TextInput
                  placeholder="••••••••"
                  className="flex-1 ml-3 text-dark text-base"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            className="bg-primary w-full py-5 rounded-2xl items-center shadow-lg shadow-emerald-200 mt-10 flex-row justify-center"
          >
            <Text className="text-white text-lg font-bold mr-2">Create Account</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>

          <Text className="text-center text-gray-400 mt-8 mb-10 px-4 leading-5">
            By signing up, you agree to our <Text className="text-primary font-semibold">Terms of Service</Text> and <Text className="text-primary font-semibold">Privacy Policy</Text>.
          </Text>

          <View className="flex-row justify-center mb-10">
            <Text className="text-gray-500 text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-primary text-base font-bold">Login</Text>
            </TouchableOpacity>
          </div>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
