import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  animationBox: {
    textAlign: "center",
    color: "#00C851",
    width: 100 + "%",
    height: 250 + "px",
    minHeight: 34 + "%",
    position: "fixed",
    background: "#2E2E2E",
    zIndex: 9999,
  },
  optionsBox: {
    position: "relative",
    top: 260 + "px",
    textAlign: "center",
    padding: "15px 5%"
  },
  title: {
    margin: 5,
    padding: 0,
  },
  child: {
    fontSize: 7 + "em",
    paddingTop: .5 + "em", 
  },
  text: {
    fontSize: 4 + "em",
    paddingTop: 45 + "px", 
  },
  github: {
    position: "fixed",
    top: 15,
    right: 15,
    color: "#bdbdbd",
    zIndex: 10000
  },
  animationButton: {
    height: 28 + "px",
    padding: "7px 5px 0px 5px",
    margin:"2px 2px",
    borderRadius: 5 + "px",
    width: 90 + "%",
    border: "1px solid #4B515D",
    outline: "none",
    cursor: "pointer",
    overflow: "auto",
    display: "inline-block",
    ':hover': {
      background: "#eeeeee",
    }
  },
  animationButtonMerge: {
    border: "1px solid #4B515D",
    // ':hover': {
    //   background: "lightgray",
    // }
  },
  mergeButton: {
    maxWidth: 90 + "%",
    overflow: "scroll",
    height: 40 + "px",
    marginTop: 40 + "px",
    border: "1px solid #4B515D",
    borderRadius: 5 + "px",
    background: "none",
    cursor: "pointer",
    outline: "none",
    fontSize: 1.0 + "em",
    color: "#00C851",
  },
  animationButtonSelected: {
    background: "#00C851",
    color: "white",
    ':hover': {
      background: "#00C851",
    }
  },
  newAnimation: {
    color: "#0277bd",
  },
  mergeToggle: {
    cursor: "pointer",
    width: 150 + "px",
    margin: "0 auto",
    padding: 10 + "px",
    marginBottom: 10 + "px",
    color: "#3E4551",
  },
});

export default styles;