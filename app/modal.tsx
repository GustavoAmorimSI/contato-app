import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export default function ModalScreen() {
  const router = useRouter();

  const { nome, telefone, iniciais, cor } = useLocalSearchParams<{
    nome: string;
    telefone: string;
    iniciais: string;
    cor: string;
  }>();

  const corAvatar = cor || theme.colors.primary;

  function abrirLigacao() {
    router.push({
      pathname: '/ligacao',
      params: { nome, telefone, iniciais, cor },
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.fundo} onPress={() => router.back()} />

        <View style={styles.box}>
          <View style={styles.linha} />

          <View
            style={[
              styles.avatar,
              {
                backgroundColor: corAvatar + '20',
                borderColor: corAvatar + '40',
              },
            ]}
          >
            <Text style={[styles.iniciais, { color: corAvatar }]}>
              {iniciais}
            </Text>
          </View>

          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.telefone}>{telefone}</Text>

          <View style={styles.botoes}>
            <TouchableOpacity
              style={[styles.botaoPrincipal, { backgroundColor: corAvatar }]}
              onPress={abrirLigacao}
            >
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.textoPrincipal}>Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => router.back()}
            >
              <Ionicons
                name="close"
                size={20}
                color={theme.colors.textMuted}
              />
              <Text style={styles.textoSecundario}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fundo: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000088',
  },
  box: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  linha: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    marginBottom: 18,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iniciais: {
    fontSize: 30,
    fontWeight: '700',
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },
  telefone: {
    fontSize: 15,
    color: theme.colors.textMuted,
    marginTop: 4,
    marginBottom: 18,
  },
  botoes: {
    width: '100%',
    gap: 10,
    marginTop: 6,
  },
  botaoPrincipal: {
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  textoPrincipal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  botaoSecundario: {
    height: 52,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  textoSecundario: {
    color: theme.colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
});