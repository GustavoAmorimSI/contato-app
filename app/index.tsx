import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView, StatusBar,
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
      <TouchableOpacity style={styles.contatoRow} onPress={() => abrirLigacao(item)} activeOpacity={0.7}>
        <View style={[styles.avatar, { backgroundColor: item.cor + '22', borderColor: item.cor + '55' }]}>
          <Text style={[styles.avatarTexto, { color: item.cor }]}>{item.iniciais}</Text>
        </View>
        <View style={styles.contatoInfo}>
          <Text style={styles.contatoNome}>{item.nome}</Text>
          <Text style={styles.contatoTelefone}>{item.telefone}</Text>
        </View>
        <View style={[styles.callBtn, { borderColor: item.cor + '55' }]}>
          <Ionicons name="call-outline" size={18} color={item.cor} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitulo}>Contatos</Text>
            <Text style={styles.headerSub}>{contatos.length} salvos</Text>
          </View>
          <TouchableOpacity style={styles.btnAdicionar} onPress={() => router.push('/adicionar')} activeOpacity={0.8}>
            <Ionicons name="person-add-outline" size={20} color={theme.colors.background} />
          </TouchableOpacity>
        </View>

        {/* Busca */}
        <View style={styles.buscaContainer}>
          <Ionicons name="search-outline" size={18} color={theme.colors.textMuted} style={styles.buscaIcon} />
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar contato..."
            placeholderTextColor={theme.colors.textDim}
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Lista */}
        {listaData.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons name="person-outline" size={48} color={theme.colors.textDim} />
            <Text style={styles.vazioTexto}>Nenhum contato encontrado</Text>
          </View>
        ) : (
          <FlatList
            data={listaData}
            keyExtractor={(item, i) => ('secao' in item ? `secao-${item.secao}` : item.id)}
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
  safe: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
  headerTitulo: { fontSize: 32, fontWeight: '800', color: theme.colors.text, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: theme.colors.textMuted, marginTop: 2, fontWeight: '500' },
  btnAdicionar: { backgroundColor: theme.colors.primary, width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  buscaContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, marginHorizontal: 24, marginBottom: 16, borderRadius: 14, paddingHorizontal: 14, borderWidth: 1, borderColor: theme.colors.border, height: 48 },
  buscaIcon: { marginRight: 10 },
  buscaInput: { flex: 1, color: theme.colors.text, fontSize: 15 },
  lista: { paddingHorizontal: 24, paddingBottom: 32 },
  secaoHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 8 },
  secaoLetra: { fontSize: 12, fontWeight: '700', color: theme.colors.primary, letterSpacing: 1.5, marginRight: 10, width: 16 },
  secaoLinha: { flex: 1, height: 1, backgroundColor: '#1A1A22' },
  contatoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 14 },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontSize: 18, fontWeight: '700', letterSpacing: 1 },
  contatoInfo: { flex: 1 },
  contatoNome: { fontSize: 16, fontWeight: '600', color: theme.colors.text, letterSpacing: -0.2 },
  contatoTelefone: { fontSize: 13, color: theme.colors.textMuted, marginTop: 2 },
  callBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  vazioTexto: { color: theme.colors.textMuted, fontSize: 15, fontWeight: '500' },
});