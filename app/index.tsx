import { Text, View } from "react-native";
import {Provider} from "react-redux";
import { store } from "./store";

export default function Index() {
  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </Provider>
  );
}
