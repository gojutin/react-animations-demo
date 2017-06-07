import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  animationBox: {
    textAlign: "center",
    color: "#00C851",
    width: 100 + "%",
    minHeight: 40 + "vh",
    position: "fixed",
    background: "black",
    zIndex: 9999,
  },
  title: {
    margin: 5,
    padding: 0,
  },
  child: {
    fontSize: 8 + "em",
    paddingTop: 45 + "px", 
  },
  text: {
    fontSize: 4 + "em",
    paddingTop: 45 + "px", 
  },
  optionsBox: {
    position: "relative",
    top: 40 + "vh",
    textAlign: "center",
    padding: "15px 5%"
  },
  label: {
    padding: 10 + "px",
    marginTop: 15 + "px",
  },
  mergeToggle: {
    textDecoration: "underline",
    cursor: "pointer",
    width: 150 + "px",
    margin: "0 auto",
    padding: 0,
    marginBottom: 10 + "px",
    color: "#3E4551",
  },
  mergeButton: {
    width: "auto",
    height: 37 + "px",
    margin: 9 + "px",
    border: "1px solid #4B515D",
    borderRadius: 5 + "px",
    background: "none",
    cursor: "pointer",
    outline: "none",
    fontSize: 1.0 + "em",
    color: "#00C851",
  },
  mergeText: {
    padding: 4 + "px", 
    margin: 0,  
    color: "#3E4551"
  },
  check: {
    color: "#00C851",
    marginLeft: 8 + "px",
  },
  select: {
    display: "inline-block",
    fontSize: 1.5 + "em",
    outline: "none",
    width: 98 + "%",
    margin: 0,
    lineHeight: 1.5 + "em",
  },
  github: {
    position: "fixed",
    top: 10,
    right: 10,
    color: "#4B515D",
    zIndex: 10000
  },
  animationButton: {
    height: 25 + "px",
    paddingTop: 4 + "px",
    margin:"2px 5px",
    borderRadius: 5 + "px",
    width: 200 + "px",
    border: "1px solid lightgray",
    outline: "none",
    cursor: "pointer",
    overflow: "auto",
    display: "inline-block",
    ':hover': {
      background: "lightgray",
    }
  },
  animationButtonMerge: {
    border: "1px solid #4B515D",
    ':hover': {
      background: "lightgray",
    }
  },
  animationButtonSelected: {
    background: "#00C851",
    color: "white",
    ':hover': {
      background: "#00C851",
    }
  },
  filler: {
    height: 53 + "px",
  },
  icons: {
    padding: 5 + "px",
  }
});

export default styles;