import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Fontisto, MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles/LoginStyles";
import { Link, useNavigation } from "expo-router";
import api from "@/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const colors = {
	primary: "rgb(248,76,76)",
	gray: "#c1c1c1",
	background: "#FFFFFF",
	text: "#000000",
};

type RootStackScreens = {
	Login: undefined;
	"(tabs)": { screen: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackScreens>;

const Register = () => {
	const navigation = useNavigation() as NavigationProp;

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);

	const handleRegister = async () => {
		try {
			if (password === confirmPassword) {
				const res = await api.post("/user/register", {
					name: username,
					email: email,
					password: password,
				});
				if (res.data.status) {
					navigation.navigate("(tabs)", { screen: "home" });
				}
			} else setPasswordMatch(false);
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardContainer}
			>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>Create Account</Text>
				</View>

				<View style={styles.inputContainer}>
					<View style={styles.inputWrapper}>
						<FontAwesome5
							name="user-alt"
							size={20}
							color={colors.gray}
							style={styles.icon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Username"
							placeholderTextColor={colors.gray}
							value={username}
							onChangeText={setUsername}
						/>
					</View>

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

					<View style={styles.inputWrapper}>
						<MaterialIcons
							name="lock"
							size={20}
							color={colors.gray}
							style={styles.icon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Confirm Password"
							placeholderTextColor={colors.gray}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
						/>
					</View>
				</View>

				{!passwordMatch ? (
					<View style={styles.passwordMismatchContainer}>
						<Text style={styles.passwordMismatchText}> Passwords do not match! </Text>
					</View>
				) : null}

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
						<Text style={styles.loginButtonText}>Register</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.registerLinkContainer}>
					<Text style={styles.registerText}>Already have an account? </Text>
					<TouchableOpacity>
						<Link href="/Login">
							<Text style={styles.registerLinkText}>Login</Text>
						</Link>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Register;
