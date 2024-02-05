import React from "react";
import { NavigationContainer, DefaultTheme  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Principal from "./src/Principal";
import Detalle from "./src/Detalle";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'yellow',  // Cambia el color primario de la barra de navegación
    background: 'white',  // Cambia el color de fondo de la barra de navegación
    card: 'dodgerblue',  // Cambia el color de fondo de las tarjetas de navegación
    text: 'white',  // Cambia el color del texto en la barra de navegación
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Detalle" component={Detalle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
