import { StyleSheet } from "react-native";

const colors = {
    primary: 'rgb(248,76,76)',
    gray: '#c1c1c1',
    background: '#FFFFFF',
    text: '#000000'
  };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	keyboardContainer: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	headerContainer: {
		alignItems: "center",
		marginBottom: 30,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.text,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: colors.gray,
		marginBottom: 15,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		height: 40,
		color: colors.text,
	},
	forgotPasswordContainer: {
		alignSelf: "flex-end",
	},
	forgotPasswordText: {
		color: colors.primary,
		fontSize: 12,
	},
	buttonContainer: {
		marginTop: 20,
	},
	loginLink: {
		backgroundColor: colors.primary,
		padding: 15,
		borderRadius: 25,
		textAlign: "center",
	},
	loginButtonText: {
		color: colors.background,
		fontSize: 16,
		fontWeight: "bold",
	},
	registerLinkContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 15,
	},
	registerText: {
		color: colors.text,
	},
	registerLinkText: {
		color: colors.primary,
		fontWeight: "bold",
	},
	passwordMismatchContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	passwordMismatchText: {
		color: "red",
	},
});

  export default styles;