import {Text, View, StyleSheet} from "react-native";
import { useSelector } from 'react-redux'

export default function Score() {

  const score = useSelector(state => state.game.score)
  const highScore = useSelector(state => state.game.highScore)

    return (
      <View style={styles.container}>
        <Text style={styles.score}>Score: {score}</Text>
        {highScore > 0 && <Text style={styles.highScore}>High Score: {highScore}</Text>}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    borderRadius: 4,
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 12,
    gap: 4
  },
  score: {
    color: "#fff",
    textAlign: 'right'
  },
  highScore: {
    color: "#fff",
    textAlign: 'right'
  }
})
