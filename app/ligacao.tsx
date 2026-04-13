import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export default function LigacaoScreen() {
  const router = useRouter();

  const { nome, telefone, iniciais, cor } = useLocalSearchParams<{
    nome: string;
    telefone: string;
    iniciais: string;
    cor: string;
  }>();

  const [tempo, setTempo] = useState(0);
  const [mudo, setMudo] = useState(false);
  const [altoFalante, setAltoFalante] = useState(false);

  const corAvatar = cor || theme.colors.primary;
  const fotoPadrao = require('../assets/images/avatar-padrao.png');

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((valor) => valor + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  function formatarTempo(segundos: number) {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, '0');

    const seg = (segundos % 60).toString().padStart(2, '0');

    return `${min}:${seg}`;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View
          style={[
            styles.avatar,
            {
              borderColor: corAvatar + '40',
            },
          ]}
        >
          <Image source={fotoPadrao} style={styles.avatarImagem} />
        </View>

        <View style={styles.info}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.telefone}>{telefone}</Text>
          <Text style={[styles.tempo, { color: corAvatar }]}>
            {formatarTempo(tempo)}
          </Text>
        </View>

        <View style={styles.linhaBotoes}>
          <TouchableOpacity
            style={[styles.botaoAcao, mudo && styles.botaoAtivo]}
            onPress={() => setMudo(!mudo)}
          >
            <Ionicons
              name={mudo ? 'mic-off' : 'mic'}
              size={22}
              color={mudo ? '#fff' : theme.colors.text}
            />
            <Text style={[styles.textoAcao, mudo && styles.textoAcaoAtivo]}>
              Mudo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoAcao}>
            <Ionicons name="keypad" size={22} color={theme.colors.text} />
            <Text style={styles.textoAcao}>Teclado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAcao, altoFalante && styles.botaoAtivo]}
            onPress={() => setAltoFalante(!altoFalante)}
          >
            <Ionicons
              name={altoFalante ? 'volume-high' : 'volume-medium'}
              size={22}
              color={altoFalante ? '#fff' : theme.colors.text}
            />
            <Text
              style={[
                styles.textoAcao,
                altoFalante && styles.textoAcaoAtivo,
              ]}
            >
              Áudio
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.botaoEncerrar}
          onPress={() => router.back()}
        >
          <Ionicons
            name="call"
            size={28}
            color="#fff"
            style={{ transform: [{ rotate: '135deg' }] }}
          />
        </TouchableOpacity>

        <Text style={styles.textoEncerrar}>Encerrar</Text>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  topo: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
    marginBottom: 24,
  },
  botaoTopo: {
    padding: 8,
  },
  status: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  avatarImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  avatarTexto: {
    fontSize: 36,
    fontWeight: '700',
  },
  info: {
    alignItems: 'center',
    marginBottom: 40,
  },
  nome: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 6,
  },
  telefone: {
    fontSize: 15,
    color: theme.colors.textMuted,
    marginBottom: 10,
  },
  tempo: {
    fontSize: 18,
    fontWeight: '700',
  },
  linhaBotoes: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 50,
  },
  botaoAcao: {
    width: 84,
    height: 84,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoAtivo: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  textoAcao: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '600',
  },
  textoAcaoAtivo: {
    color: '#fff',
  },
  botaoEncerrar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoEncerrar: {
    marginTop: 10,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
});