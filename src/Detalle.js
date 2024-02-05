import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

  const Detalle = ({ route, navigation }) => {
    const { producto } = route.params;

    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: producto.title,
      });
    }, [navigation, producto.title]);
  
    return (
      <View style={styles.container}>
        <Text style={styles.description}>{producto.description}</Text>
        <Image source={{ uri: producto.images[0] }} style={styles.image} />
        <Text style={styles.title}>{producto.title}</Text>
        
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: "center",
      backgroundColor: 'black',
    },
    image: {
      width: 350,
      height: 350,
      marginBottom: 16,
      borderWidth: 3,
      borderColor: "dodgerblue",
      borderRadius: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: 'white',
      marginBottom: 28,
    },
    description: {
      fontSize: 16,
      color: 'white',
      marginBottom: 16,
    },
  });
  
  export default Detalle;
