import {Text, View, StyleSheet} from "react-native";
import {useAppSelector} from "@/app/hooks";

export default function Score() {

  const score = useAppSelector(state => state.game.score)
  const highScore = useAppSelector(state => state.game.highScore)

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
