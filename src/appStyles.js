import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  optionsBox: {
    position: "absolute",
    top: 300 + "px",
    textAlign: "center",
    padding: 20 + "px",
    width: 100 + "%",
    background: "#f4f4f4"
  },
  github: {
    position: "fixed",
    top: 12,
    right: 12,
    color: "#bdbdbd",
    zIndex: 10000
  },

  mergeToggle: {
    cursor: "pointer",
    paddingBottom: 5 + "px",
    color: "#3E4551",
  },
  scrollUpIcon: {
    fontSize: 40 + "px",
    color: "#00C851",
    cursor: "pointer",
    opacity: 0.5,
  }
});

export default styles;