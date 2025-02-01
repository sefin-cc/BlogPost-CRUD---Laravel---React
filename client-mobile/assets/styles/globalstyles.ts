import { StatusBar, StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
 container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f5f5f5",
    margin: "5%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 5,
  },

  // Post
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
    color: "#666666",
  },
  postContainer: {
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    minHeight: 200,
    gap: 5
  },

  //form
  inputContainer: {
    marginVertical: 10,
    gap: 15,
    justifyContent: "center"
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    fontSize: 16
  },
  errorText: {
    color: "#bf3d44",
    fontSize: 16,
    textAlign: "left",
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
  },
 
});

export default globalStyles;
