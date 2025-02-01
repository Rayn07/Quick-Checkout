import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles/LoginStyles";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import api from "@/api";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

const colors = {
	primary: "rgb(248,76,76)",
	gray: "#c1c1c1",
	background: "#FFFFFF",
	text: "#000000",
};

type RootStackParamList = {
	Login: undefined;
	"(tabs)": { screen: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
	const navigation = useNavigation<NavigationProp>();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			console.log("Login attempted", { email, password });

			const res = await api.post("/user/login", { email: email, password: password });
			const username = res.data.userDetails.username;
			if (res.status) {
				navigation.navigate("(tabs)", { screen: "home" });
			}
		} catch (error) {
			console.error("Error logging in:", error);
		}
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
						<Text style={styles.loginButtonText}>Login</Text>
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
