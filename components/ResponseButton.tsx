import {Text, View, StyleSheet, Pressable} from "react-native";
import { setGameOver, setScore } from '../features/gameSlice'
import {useDispatch} from "react-redux";

type Props = {
  label: string,
  difficulty: string,
  correct: boolean,
  completed: boolean,
  setCompleted: (completed: boolean) => void,
}

export default function ResponseButton({ label, difficulty, correct, completed, setCompleted }: Props) {

  const dispatch = useDispatch()
  const handlePress = () => {
    setCompleted(true)
    dispatch(setScore({ difficulty, correct }))
    setTimeout(() => {
      setCompleted(false)
    }, 1000)
  }

  if (completed && correct) {
    return (
      <View style={[styles.container, { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: 'green' }]} onPress={handlePress} disabled={completed}>
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress} disabled={completed}>
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
    fontSize: 16,
  }
});