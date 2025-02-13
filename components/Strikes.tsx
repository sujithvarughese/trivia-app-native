import {View, StyleSheet} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";

export default function Strikes() {

  const strikes = useAppSelector(state => state.game.strikes)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Strikes: </Text>
      {strikes >= 1 && <FontAwesome name="close" size={24} color="red" />}
      {strikes >= 2 && <FontAwesome name="close" size={24} color="red" />}
      {strikes >= 3 && <FontAwesome name="close" size={24} color="red" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
  }
})