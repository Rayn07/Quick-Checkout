import { View, Text } from "react-native";
import React from "react";
import homestyles from "../Styles/HomeStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import profilestyles from "../Styles/ProfileStyles";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";

const profile = () => {
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
					<Link href="/Login">
						<View style={profilestyles.profileLogOut}>
							<View>
								<AntDesign size={32} name="poweroff" />
							</View>
							<View>
								<Text style={{ marginLeft: 8, fontSize: 16 }}>Log Out</Text>
							</View>
						</View>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default profile;
