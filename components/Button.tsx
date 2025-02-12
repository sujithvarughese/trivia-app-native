import {View, StyleSheet, Pressable} from "react-native";
import {useTheme} from "@react-navigation/native";
import Text from "./Text"

type Props = {
  label: string,
  theme?: string,
  onPress: () => void,
}

export default function Button({ label, theme, onPress }: Props) {

  const colors = useTheme().colors


  if (theme === 'primary') {
    return (
      <View style={[styles.container, { borderColor: '#ffd33d'}]}>
        <Pressable style={[styles.button, { backgroundColor: 'green' }]} onPress={onPress}>
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
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