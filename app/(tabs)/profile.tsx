import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profilestyles from "../Styles/ProfileStyles";
import api from "@/api";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { NavigationProp } from "@/types";
import {
	AntDesign,
	Feather,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";

const profile = () => {
	const navigation = useNavigation() as NavigationProp;
	const handleLogOut = async () => {
		try {
			const res = await api.get("/user/logout");
			console.log(res.data);
			if (res.data.status) {
				navigation.navigate("Login");
			}
		} catch (error: any) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<SafeAreaView style={profilestyles.profileContainer}>
			<View style={profilestyles.profileTopBar}>
				<View style={profilestyles.profileArea}>
					<View style={profilestyles.profileIcon}></View>
					<View style={profilestyles.profileDetailsArea}>
						<View>
							<Text style={profilestyles.profileUserName}>Username</Text>
						</View>
						<View>
							<Text style={profilestyles.profileMail}>mailid@gmail.com</Text>
						</View>
						<View>
							<Text style={profilestyles.profileNumber}>+91xxxxxxxxxx</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={profilestyles.profileOptionsContainer}>
				<View style={profilestyles.profileOptionsArea}>
					<View>
						<Text style={profilestyles.titleText1}>Account & Security</Text>
					</View>
					<View>
						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<FontAwesome size={20} name="gears" />
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											Account Settings
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>

						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<Feather size={20} name="users" />
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											Referral
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>

						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<MaterialCommunityIcons
											size={20}
											name="hand-coin-outline"
										/>
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											Coin & Reward
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>

						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<MaterialCommunityIcons
											size={20}
											name="ticket-percent-outline"
										/>
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											My Voucher
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>
					</View>
					<View>
						<Text style={profilestyles.titleText1}>General</Text>
					</View>
					<View>
						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<Ionicons size={20} name="document-text-outline" />
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											Terms & Conditions
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>

						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<FontAwesome size={20} name="user-o" />
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											Privacy Policy
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>

						<View style={profilestyles.profileOptionLayout}>
							<View>
								<View style={profilestyles.profileOptionLogo}>
									<View>
										<Feather size={20} name="headphones" />
									</View>
									<View>
										<Text style={profilestyles.profileOptionText}>
											Customer Services
										</Text>
									</View>
								</View>
							</View>
							<View style={{ marginTop: 4 }}>
								<SimpleLineIcons size={20} name="arrow-right" />
							</View>
						</View>
					</View>
					<TouchableOpacity style={profilestyles.profileLogOut} onPress={handleLogOut}>
						<View>
							<AntDesign size={24} name="poweroff" />
						</View>
						<View>
							<Text style={{ marginLeft: 8, fontSize: 16, fontWeight: "bold" }}>
								Log Out
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default profile;
