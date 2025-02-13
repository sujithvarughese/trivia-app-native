import { View, StyleSheet, Pressable} from "react-native";
import {fetchQuestions, setNextQuestion, setScore} from '@/features/gameSlice'
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";

type Props = {
  label: string,
  difficulty: string,
  correct: boolean,
}

export default function ResponseButton({ label, difficulty, correct }: Props) {

  const dispatch = useAppDispatch()
  const completed = useAppSelector(state => state.game.completed)

  return (
    <View style={[completed && correct && { borderWidth: 4, borderColor: '#ffd33d' }, styles.container]}>
      <Pressable
        style={({pressed}) => [{ backgroundColor: completed && correct && "green" }, styles.button]}
        onPress={() => dispatch(setScore({ difficulty, correct }))}
        disabled={completed}
      >
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