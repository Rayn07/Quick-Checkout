import { StyleSheet } from "react-native";

const homestyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: "auto",
    backgroundColor: "white",
  },

  homeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "auto",
    width: "auto",
    backgroundColor: "white",
  },

  homeTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    height: "20%",
    padding: 24,
    backgroundColor: "rgb(248,76,76)",
  },

  topBarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "semibold",
  },

  rewardNotifContainer: {
    flexDirection: "row",
    height: 36,
  },

  getRewardContainer: {
    borderRadius: 50,
    backgroundColor: "white",
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },

  getRewardText: {
    color: "rgb(248,76,76)",
    fontWeight: "bold",
  },

  notificationContainer: {
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
    backgroundColor: "white",
    width: 36,
    height: 36,
    padding: 8,
    marginLeft: 16,
    paddingLeft: 9,
  },

  searchBarArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    height: 72,
    padding: 8,
    paddingTop: 12,
    paddingLeft: 32,
    paddingRight: 32,
  },

  searchIcon: {
    width: 40,
    height: 48,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#c1c1c1",
  },

  searchBarContainer: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#c1c1c1",
  },

  searchBarText: {
    color: "black",
    fontSize: 14,
    backgroundColor: "white",
    height: 48,
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c1c1c1",
  },

  text: {
    color: "black",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default homestyles;
