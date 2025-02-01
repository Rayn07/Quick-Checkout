import { StyleSheet } from "react-native";

const profilestyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "auto",
    width: "auto",
    backgroundColor: "white",
  },
  profileTopBar: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgb(248,76,76)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  profileArea: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 72,
    width: 72,
  },

  profileDetailsArea: {
    height: 72,
    width: 196,
    marginLeft: 24,
    flexDirection: "column",
  },

  profileUserName: { color: "white", fontWeight: "semibold", fontSize: 20 },
  profileNumber: { color: "white", fontSize: 16 },
  profileMail: { color: "white", fontSize: 16 },

  profileOptionsContainer: {
    height: "100%",
    width: "100%",
    padding: 24,
  },

  profileOptionsArea: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },

  titleText1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  profileOptionLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.25,
    marginBottom: 12,
    height: 42,
  },

  profileOptionLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  profileOptionText: {
    fontSize: 20,
    marginLeft: 8,
  },

  profileLogOut: {
    height: 64,
    width: 128,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default profilestyles;
