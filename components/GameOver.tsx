import {View, StyleSheet, Modal} from "react-native";
import Button from "@/components/Button";
import {useDispatch} from "react-redux";
import {setNewGame, unsetGameOver} from "@/features/gameSlice";
import {useAppSelector} from "@/app/hooks";
import Text from "../components/Text";


export default function GameOver() {

  const dispatch = useDispatch()
  const score = useAppSelector(state => state.game.score)
  const highScore = useAppSelector(state => state.game.highScore)
  const gameOver = useAppSelector(state => state.game.gameOver)


  return (
    <Modal animationType="slide" transparent={true} visible={gameOver}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Over</Text>
        {score > highScore && <Text>NEW HIGH SCORE</Text>}
        <Text>Your Score: {score}</Text>
        <Button label="Play Again" onPress={() => dispatch(setNewGame())} />
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
    alignItems: "center"
  },
  title: {
    fontSize: 32,
  },

})