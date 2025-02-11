import {Text, View, StyleSheet, Modal} from "react-native";
import Button from "@/components/Button";
import {useDispatch} from "react-redux";
import {unsetGameOver} from "@/features/gameSlice";


export default function GameOver() {

  const dispatch = useDispatch()

  return (
    <Modal animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text>Game Over</Text>
        <Button label="Close" onPress={() => dispatch(unsetGameOver())} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '50%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  content: {

  }
})