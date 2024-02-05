import React, { useState, useEffect} from "react";
import { View, Text, Button, TextInput, ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import CONFIG from "./config/config";
import { mockdata } from "./constants/product";

const Principal = ({ navigation }) => {
  const [datos, setDatos] = useState(null);
  const [datosFiltrados, setDatosFiltrados] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consulta, setConsulta] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (CONFIG.use_server) {
        try {
          const response = await fetch(CONFIG.server_url);
          const data = await response.json();
          setDatos(data.products);
          setDatosFiltrados(data.products);
          setError(null);
          setLoading(false);
        } catch (error) {
          setError({ description: error.message });
          setLoading(false);
        }
      } else {
        setDatos(mockdata.products);
        setDatosFiltrados(mockdata.products);
        setError(null);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const resultadosFiltrados = datos.filter((item) =>
      item.title.toLowerCase().includes(consulta.toLowerCase())
    );
    setDatosFiltrados(resultadosFiltrados);
  };

  const _renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <Button title="Ver Detalle" onPress={() => navigation.navigate("Detalle", { producto: item })} />
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.cabecera}>Catálogo de Productos</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConsulta(text)}
          value={consulta}
        />
        <Button title="Buscar" onPress={handleSearch}/>
      </View>
      {loading && (
        <View>
           <ActivityIndicator size="large" color="dodgerblue" />
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      )}
      {datosFiltrados && (
        <FlatList data={datosFiltrados} renderItem={_renderItem} />
      )}
      {error && <Text style={styles.errorText}>Ha habido un error de carga</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
    
  },
  cabecera: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: 'white',
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  
  input: {
    flex: 1,
    borderWidth: 0,
    borderColor: "white",
    borderRadius: 10,
    marginRight: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'dodgerblue',
    height: 40,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    marginBottom: 16,
  },
  productContainer: {
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "white",
    padding: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: 'white'
  },
  description: {
    color: 'white',
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 16,
  },
});

export default Principal;

