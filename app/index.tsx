import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
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
import { Contato, useContato } from '../context/ContatoContext';

export default function HomeScreen() {
  const { contatos } = useContato();
  const [busca, setBusca] = useState('');
  const router = useRouter();

  const filtrados = useMemo(() => {
    if (!busca.trim()) return contatos;
    const q = busca.toLowerCase();
    return contatos.filter(
      (c) => c.nome.toLowerCase().includes(q) || c.telefone.includes(q)
    );
  }, [contatos, busca]);

  const agrupados = useMemo(() => {
    const map: { [key: string]: Contato[] } = {};
    filtrados.forEach((c) => {
      const letra = c.nome[0].toUpperCase();
      if (!map[letra]) map[letra] = [];
      map[letra].push(c);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b, 'pt-BR'));
  }, [filtrados]);

  const listaData: (Contato | { secao: string })[] = [];
  agrupados.forEach(([letra, items]) => {
    listaData.push({ secao: letra });
    items.forEach((item) => listaData.push(item));
  });

  function abrirLigacao(contato: Contato) {
    router.push({
      pathname: '/ligacao',
      params: {
        id: contato.id,
        nome: contato.nome,
        telefone: contato.telefone,
        iniciais: contato.iniciais,
        cor: contato.cor,
      },
    });
  }

  function renderItem({ item }: { item: Contato | { secao: string } }) {
    if ('secao' in item) {
      return (
        <View style={styles.secaoHeader}>
          <Text style={styles.secaoLetra}>{item.secao}</Text>
          <View style={styles.secaoLinha} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.contatoCard}
        onPress={() => abrirLigacao(item)}
        activeOpacity={0.8}
      >
        <Image source={item.foto} style={styles.avatarImagem} />

        <View style={styles.contatoInfo}>
          <Text style={styles.contatoNome}>{item.nome}</Text>
          <Text style={styles.contatoTelefone}>{item.telefone}</Text>
        </View>

        <TouchableOpacity
          style={[styles.callBtn, { backgroundColor: item.cor }]}
          onPress={() => abrirLigacao(item)}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={18} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitulo}>Contatos</Text>
            <Text style={styles.headerSub}>{contatos.length} salvos</Text>
          </View>

          <TouchableOpacity
            style={styles.btnAdicionar}
            onPress={() => router.push('/adicionar')}
            activeOpacity={0.85}
          >
            <Ionicons name="person-add-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.buscaContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color={theme.colors.textMuted}
            style={styles.buscaIcon}
          />
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar contato..."
            placeholderTextColor={theme.colors.textMuted}
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={theme.colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>

        {listaData.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons
              name="person-outline"
              size={52}
              color={theme.colors.textMuted}
            />
            <Text style={styles.vazioTexto}>Nenhum contato encontrado</Text>
          </View>
        ) : (
          <FlatList
            data={listaData}
            keyExtractor={(item) =>
              'secao' in item ? `secao-${item.secao}` : item.id
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.lista}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
  },

  headerTitulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.6,
  },

  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },

  btnAdicionar: {
    backgroundColor: '#FF4D7A',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4D7A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },

  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162033',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#24324A',
    height: 50,
  },

  buscaIcon: {
    marginRight: 10,
  },

  buscaInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
  },

  lista: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  secaoLetra: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF4D7A',
    letterSpacing: 1.5,
    marginRight: 10,
    width: 16,
  },

  secaoLinha: {
    flex: 1,
    height: 1,
    backgroundColor: '#24324A',
  },

  contatoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111C2E',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1F2A40',
  },

  avatarImagem: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#24324A',
  },

  contatoInfo: {
    flex: 1,
    marginLeft: 12,
  },

  contatoNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    letterSpacing: -0.2,
  },

  contatoTelefone: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },

  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },

  vazioTexto: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '500',
  },
});