import {Text as TextBase, StyleSheet, TextProps} from "react-native";

export default function Text(props: TextProps) {

  return(
    <TextBase style={[styles.style, props.style]}>
      {props.children}
    </TextBase>
  )
}

const styles = StyleSheet.create({
  style: {
    fontFamily: "Avenir Next",
    color: "#fefefe",
    fontSize: 16,
  }
})