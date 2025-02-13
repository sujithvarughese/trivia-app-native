import {View, StyleSheet, Modal} from 'react-native';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";
import Button from "@/components/Button";
import {closeAiResponse} from "@/features/gameSlice";

export default function AiResponse() {

  const aiResponse = useAppSelector(state => state.game.aiResponse)
  const questions = useAppSelector(state => state.game.questions)
  const questionIndex = useAppSelector(state=> state.game.questionIndex)
  const dispatch = useAppDispatch()

  return (
    <Modal animationType="slide" transparent={true} visible={!!aiResponse} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
        <Text style={styles.aiResponse}>{aiResponse}</Text>

        <View>
          <Button onPress={() => dispatch(closeAiResponse())}><Text>Close</Text></Button>
        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#25292e',
    padding: 36,
    borderRadius: 18,
    marginVertical: 124,
    marginHorizontal: 24,
    gap: 24,

  },
  title: {

  },
  question: {
    fontWeight: 600,
    textAlign: 'center',

  },
  aiResponse: {
    lineHeight: 28
  }
})