import { View, StyleSheet, Pressable} from "react-native";
import {fetchQuestions, setNextQuestion, setScore} from '@/features/gameSlice'
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";

type Props = {
  label: string,
  difficulty: string,
  correct: boolean,
  completed: boolean,
  setCompleted: (completed: boolean) => void,
}

export default function ResponseButton({ label, difficulty, correct, completed, setCompleted }: Props) {

  const dispatch = useAppDispatch()
  const questions = useAppSelector(state => state.game.questions)
  const questionIndex = useAppSelector(state => state.game.questionIndex)
  const category = useAppSelector(state => state.game.category)
  const gameOver = useAppSelector(state => state.game.gameOver)

  const handlePress = () => {
    setCompleted(true)
    dispatch(setScore({ difficulty, correct }))
  }

  if (completed && correct) {
    return (
      <View style={[styles.container, { borderWidth: 4, borderColor: '#ffd33d' }]}>
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
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 18
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
    fontSize: 20,
    fontWeight: '600',
  }
});