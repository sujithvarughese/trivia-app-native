import {Text, View, StyleSheet, Modal} from "react-native";
import Button from "@/components/Button";
import {useDispatch} from "react-redux";
import {unsetGameOver} from "@/features/gameSlice";
import {useAppSelector} from "@/app/hooks";


export default function GameOver() {

  const dispatch = useDispatch()
  const score = useAppSelector(state => state.game.score)
  const highScore = useAppSelector(state => state.game.highScore)

  return (
    <Modal animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Over</Text>
        {score > highScore && <Text>NEW HIGH SCORE</Text>}
        <Text>Your Score: {score}</Text>
        <Button label="Play Again" onPress={() => dispatch(unsetGameOver())} />
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
    left: 0,
    right: 0,
    margin: 'auto',
    padding: 24
  },
  title: {

  },

})