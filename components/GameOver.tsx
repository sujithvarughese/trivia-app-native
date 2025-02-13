import {View, StyleSheet, Modal} from "react-native";
import Button from "@/components/Button";
import {setNewGame, fetchQuestions} from "@/features/gameSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Text from "../components/Text";


export default function GameOver() {

  const dispatch = useAppDispatch()
  const score = useAppSelector(state => state.game.score)
  const highScore = useAppSelector(state => state.game.highScore)
  const gameOver = useAppSelector(state => state.game.gameOver)
  const category = useAppSelector(state => state.game.category)

  const handleClickNewGame = () => {
    dispatch(fetchQuestions(category))
    dispatch(setNewGame())
  }

  return (
    <Modal animationType="slide" transparent={true} visible={gameOver}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Over</Text>
        {score === highScore && <Text>NEW HIGH SCORE</Text>}
        <Text>Your Score: {score}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={handleClickNewGame}><Text>Play Again</Text></Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    width: 240,
    backgroundColor: '#25292e',
    borderRadius: 18,
    margin: 'auto',
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },
  title: {
    fontSize: 32,
  },
  buttonContainer: {

  }
})