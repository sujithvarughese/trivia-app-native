import { StyleSheet, Pressable} from "react-native";
import { setScore } from '@/features/gameSlice'
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

  if (completed && correct) {
    return (
      <Pressable
        style={({pressed}) => [{ backgroundColor: "green" }, styles.button]}
        onPress={() => dispatch(setScore({ difficulty, correct }))}
        disabled={completed}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    )
  }

  return (
    <Pressable
      style={({pressed}) => [{ backgroundColor: pressed ? "gray" : undefined }, styles.button]}
      onPress={() => dispatch(setScore({ difficulty, correct }))}
      disabled={completed}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 18,
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    padding: 8,
    textAlign: 'center',
  }
});