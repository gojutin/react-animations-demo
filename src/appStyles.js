import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  optionsBox: {
    position: "relative",
    top: 260 + "px",
    textAlign: "center",
    marginLeft: 10 + "px",
    marginRight: 10 + "px",
    padding: 10 + "px",
  },

  github: {
    position: "fixed",
    top: 15,
    right: 15,
    color: "#bdbdbd",
    zIndex: 10000
  },

  mergeToggle: {
    cursor: "pointer",
    padding: 5 + "px",
    marginBottom: 5 + "px",
    color: "#3E4551",
  },
  scrollUpIcon: {
    fontSize: 50 + "px",
    color: "#ffbb33",
    cursor: "pointer",
  }
});

export default styles;