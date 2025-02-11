import {Text, View, StyleSheet} from "react-native";
import ResponseButton from "@/components/ResponseButton";
import { useState } from "react";
import {useAppSelector} from "@/app/hooks";


export default function Question() {

  const questions = useAppSelector(state => state.game.questions)
  const questionIndex = useAppSelector(state => state.game.questionIndex)
  const [completed, setCompleted] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{questions[questionIndex]?.category} - {questions[questionIndex]?.difficulty}</Text>
      <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
      <View style={styles.responseContainer}>
        {questions[questionIndex]?.choices.map((choice: any, index: number) =>
          <ResponseButton
            key={index}
            label={choice.response}
            difficulty={questions[questionIndex]?.difficulty}
            correct={choice.correct}
            completed={completed}
            setCompleted={setCompleted}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    gap: 24,
  },
  category: {
    color: "#fff"
  },
  question: {
    color: "#fff",
    fontSize: 20,
  },
  responseContainer: {
    gap: 12
  }
})