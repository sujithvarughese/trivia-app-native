import { Stack } from "expo-router";
import {Provider, useDispatch} from "react-redux";
import {store} from "@/app/store";


export default function RootLayout() {



  return (
    <Provider store={store}>
      <Stack/>
    </Provider>
  )
}
