import {Text, View, StyleSheet} from "react-native";

type Props = {
  category: string,
  difficulty: string,
  question: string,
}

export default function Question({ category, difficulty, question }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>Category</Text>
      <Text style={styles.difficulty}>Difficulty</Text>
      <Text style={styles.question}>Question</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  category: {

  },
  difficulty: {

  },
  question: {
  }
})