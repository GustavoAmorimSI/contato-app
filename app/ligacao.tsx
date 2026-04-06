import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Ligacao() {
  const router = useRouter();

  const { nome, telefone, foto } = useLocalSearchParams<{
    nome: string;
    telefone: string;
    foto: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Chamando...</Text>

      <Image source={{ uri: foto }} style={styles.foto} />

      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.telefone}>{telefone}</Text>

      <TouchableOpacity
        style={styles.botaoEncerrar}
        onPress={() => router.back()}
      >
        <Ionicons
          name="call"
          size={30}
          color="#fff"
          style={{ transform: [{ rotate: "135deg" }] }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2d3d",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  status: {
    color: "#ccc",
    fontSize: 18,
    marginBottom: 25,
  },
  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  nome: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  telefone: {
    color: "#ddd",
    fontSize: 18,
    marginTop: 8,
    marginBottom: 40,
  },
  botaoEncerrar: {
    backgroundColor: "red",
    width: 75,
    height: 75,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});