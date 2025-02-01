import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles/LoginStyles";
import { Link } from "expo-router";

const colors = {
  primary: "rgb(248,76,76)",
  gray: "#c1c1c1",
  background: "#FFFFFF",
  text: "#000000",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic
    console.log("Login attempted", { email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome Back</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="email"
              size={20}
              color={colors.gray}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.gray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock"
              size={20}
              color={colors.gray}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Link href="/(tabs)/home">
              <Text style={styles.loginButtonText}>Login</Text>
            </Link>
          </TouchableOpacity>
        </View>

        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Link href="/Register">
              <Text style={styles.registerLinkText}>Register</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
