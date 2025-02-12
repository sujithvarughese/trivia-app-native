import {View, StyleSheet} from "react-native";
import {useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";

export default function Score() {

  const score = useAppSelector(state => state.game.score)
  const highScore = useAppSelector(state => state.game.highScore)

    return (
      <View style={styles.container}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.highScore}>High Score: {highScore}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 12,
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontWeight: 700,
  },
  highScore: {


  }
})
