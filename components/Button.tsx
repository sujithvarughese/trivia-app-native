import {View, StyleSheet, Pressable, ButtonProps, PressableProps} from "react-native";

export default function Button(props: PressableProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [{ backgroundColor: pressed && 'gray' }, styles.button,]}
        {...props}
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
    borderWidth: 4,
    borderRadius: 18
  },
  button: {
    borderRadius: 18,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {

  }
});