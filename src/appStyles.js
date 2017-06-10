import { StyleSheet } from 'aphrodite';
import { tada } from 'react-animations';

const styles = StyleSheet.create({
  tada: {
    animationName: tada,
    animationDuration: '2s',
  },
  optionsBox: {
    position: "absolute",
    top: 250 + "px",
    textAlign: "center",
    marginLeft: 10 + "px",
    marginRight: 10 + "px",
    padding: 10 + "px",
    maxWidth: 95 + "%",
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