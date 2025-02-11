import {Text, View, StyleSheet, Modal} from "react-native";
import { categories } from "@/utilities/categories";
import Button from "@/components/Button";
import {Picker} from '@react-native-picker/picker';
import {fetchQuestions, setCategory, setNewGame} from "@/features/gameSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";

type Props = {
  showSettings: boolean,
  onClose: () => void,
}

export default function Settings({ showSettings, onClose }: Props) {

  const category = useAppSelector(state => state.game.category)
  const dispatch = useAppDispatch()

  const saveSettings = async () => {
      dispatch(fetchQuestions(category))
      dispatch(setNewGame())
  }

  return (
    <Modal animationType="slide" transparent={false} visible={showSettings}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.pickerContainer}>
            <Text>Select Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue: number) => dispatch(setCategory(itemValue))}
            >
              {categories.map((category) =>
                <Picker.Item key={category.value} label={category.label} value={category.value}/>
              )}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <Button label="Save" theme="primary" onPress={saveSettings}/>
            <Button label="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {

  },
  content: {

  },
  pickerContainer: {

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
    margin: 16
  }
});