import {Text as TextBase, StyleSheet, TextProps} from "react-native";
import {useTheme} from "@react-navigation/native";


export default function Text(props: TextProps) {

  const colors = useTheme().colors

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