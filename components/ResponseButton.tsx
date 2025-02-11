import {Text, View, StyleSheet, Pressable} from "react-native";

type Props = {
  label: string,
  theme?: 'correct' | 'incorrect',
  correct: boolean,
}

export default function ResponseButton({ label, theme, correct }: Props) {


  if (theme === 'correct') {
    return (
      <View style={[styles.container, { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: 'green' }]}>
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      </View>
    )
  } else if (theme === 'incorrect') {
    return (
      <View style={[styles.container, { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: 'red' }]}>
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    color: '#fff',
    fontSize: 16,
  }
});