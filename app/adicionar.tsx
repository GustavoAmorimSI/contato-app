import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../constants/theme';
import { useContato } from '../context/ContatoContext';

export default function AdicionarScreen() {
  const router = useRouter();
  const { adicionarContato } = useContato();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [focoNome, setFocoNome] = useState(false);
  const [focoTelefone, setFocoTelefone] = useState(false);

  function formatarTelefone(valor: string) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  function salvar() {
    if (!nome.trim()) {
      Alert.alert('Aviso', 'Digite o nome do contato.');
      return;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      Alert.alert('Aviso', 'Digite um telefone válido.');
      return;
    }

    adicionarContato(nome.trim(), telefone.trim());
    router.back();
  }

  const podeSalvar =
    nome.trim().length > 0 && telefone.replace(/\D/g, '').length >= 10;

  const iniciais = nome
    .trim()
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.topo}>
            <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
            </TouchableOpacity>

            <Text style={styles.titulo}>Novo Contato</Text>

            <View style={{ width: 40 }} />
          </View>

          <View style={styles.areaAvatar}>
            <View style={styles.avatar}>
              {iniciais ? (
                <Text style={styles.avatarTexto}>{iniciais}</Text>
              ) : (
                <Ionicons
                  name="person-outline"
                  size={38}
                  color={theme.colors.textDim}
                />
              )}
            </View>

            <Text style={styles.textoAvatar}>Contato sem foto</Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Nome</Text>
              <View style={[styles.inputArea, focoNome && styles.inputAtivo]}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={focoNome ? theme.colors.primary : theme.colors.textDim}
                  style={styles.icone}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  placeholderTextColor={theme.colors.textDim}
                  value={nome}
                  onChangeText={setNome}
                  onFocus={() => setFocoNome(true)}
                  onBlur={() => setFocoNome(false)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Telefone</Text>
              <View style={[styles.inputArea, focoTelefone && styles.inputAtivo]}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={
                    focoTelefone ? theme.colors.primary : theme.colors.textDim
                  }
                  style={styles.icone}
                />
                <TextInput
                  style={styles.input}
                  placeholder="(00) 00000-0000"
                  placeholderTextColor={theme.colors.textDim}
                  value={telefone}
                  onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                  onFocus={() => setFocoTelefone(true)}
                  onBlur={() => setFocoTelefone(false)}
                  keyboardType="phone-pad"
                  onSubmitEditing={salvar}
                />
              </View>
            </View>
          </View>

          <View style={styles.rodape}>
            <TouchableOpacity
              style={[
                styles.botaoSalvar,
                !podeSalvar && styles.botaoSalvarDesativado,
              ]}
              onPress={salvar}
              disabled={!podeSalvar}
            >
              <Ionicons
                name="checkmark"
                size={22}
                color={podeSalvar ? theme.colors.background : theme.colors.textDim}
              />
              <Text
                style={[
                  styles.textoSalvar,
                  !podeSalvar && styles.textoSalvarDesativado,
                ]}
              >
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  areaAvatar: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.primary + '22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarTexto: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  textoAvatar: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  form: {
    paddingHorizontal: 24,
    gap: 18,
  },
  label: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 6,
    fontWeight: '600',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
  },
  inputAtivo: {
    borderColor: theme.colors.primary + '66',
  },
  icone: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  rodape: {
    marginTop: 'auto',
    padding: 24,
  },
  botaoSalvar: {
    height: 54,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoSalvarDesativado: {
    backgroundColor: theme.colors.surface,
  },
  textoSalvar: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.background,
  },
  textoSalvarDesativado: {
    color: theme.colors.textDim,
  },
});