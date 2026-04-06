import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useContatos } from "../context/context/ContatoContext";

export default function AdicionarContato() {
  const router = useRouter();
  const { adicionarContato } = useContatos();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  function salvarContato() {
    if (nome.trim() === "" || telefone.trim() === "") {
      Alert.alert("Atenção", "Preencha nome e telefone");
      return;
    }

    adicionarContato(nome, telefone);
    Alert.alert("Sucesso", "Contato cadastrado!");
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Adicionar Contato</Text>
        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarContato}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#007bff",
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});