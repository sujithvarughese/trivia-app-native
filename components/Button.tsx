import {View, StyleSheet, Pressable, PressableProps} from "react-native";

export default function Button(props: PressableProps) {
  return (
    <View style={styles.container}>
      <Pressable
        {...props}
        style={({pressed}) => [styles.button, { backgroundColor: pressed ? 'gray' : undefined }, props.style as object]}
      >
        {props.children}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 18,
    width: '100%',
    flexDirection: 'row',
  },
  label: {

  }
});