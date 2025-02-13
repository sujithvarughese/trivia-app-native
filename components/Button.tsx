import {View, StyleSheet, Pressable, PressableProps} from "react-native";

export default function Button(props: PressableProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [{ backgroundColor: pressed ? 'gray' : undefined }, styles.button,]}
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
    borderWidth: 2,
    borderColor: '#fff',
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