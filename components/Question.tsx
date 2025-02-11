import {Text, View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import ResponseButton from "@/components/ResponseButton";
import {useState} from "react";


export default function Question() {

  const questions = useSelector(state => state.game.questions)
  const questionIndex = useSelector(state => state.game.questionIndex)
  const [completed, setCompleted] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{questions[questionIndex]?.category}</Text>
      <Text style={styles.difficulty}>{questions[questionIndex]?.difficulty}</Text>
      <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
      <View>
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

  },
  category: {

  },
  difficulty: {

  },
  question: {
  }
})