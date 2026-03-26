import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Mail, Lock, Globe, ArrowRight, Github } from "lucide-react-native"; 

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Connect to Firebase and Zustand store
    console.log("Login with", email, password);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-8 pt-12">
          <View className="mb-12">
            <Text className="text-4xl font-bold text-dark mb-2">Welcome Back</Text>
            <Text className="text-lg text-gray-500">Sign in to continue your eco-journey.</Text>
          </View>

          <View className="space-y-6">
            <View>
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
              <TouchableOpacity className="mt-2 self-end">
                <Text className="text-primary font-semibold">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primary w-full py-5 rounded-2xl items-center shadow-lg shadow-emerald-200 mt-10 flex-row justify-center"
          >
            <Text className="text-white text-lg font-bold mr-2">Login</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[1px] bg-gray-100" />
            <Text className="mx-4 text-gray-400 font-medium">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-100" />
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-white border border-gray-200 py-4 rounded-2xl mb-10"
          >
            <Globe size={20} color="#111827" className="mr-2" />
            <Text className="text-dark text-base font-semibold">Continue with Google</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mb-10">
            <Text className="text-gray-500 text-base">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-primary text-base font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
