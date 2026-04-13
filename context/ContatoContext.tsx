import { createContext, ReactNode, useContext, useState } from 'react';

export interface Contato {
  id: string;
  nome: string;
  telefone: string;
  iniciais: string;
  cor: string;
  foto?: any;
}

interface ContatoContextType {
  contatos: Contato[];
  adicionarContato: (nome: string, telefone: string) => void;
}

const ContatoContext = createContext<ContatoContextType | undefined>(undefined);

const CORES = [
  '#E85D75', '#5D9EE8', '#5DE8A0', '#E8A05D',
  '#A05DE8', '#5DE8D8', '#E8D85D', '#E8755D',
];

function getIniciais(nome: string): string {
  return nome
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const FOTO_PADRAO = require('../assets/images/avatar-padrao.png');

const contatosMock: Contato[] = [
  { nome: 'Ana Beatriz', telefone: '(85) 99812-3456' },
  { nome: 'Carlos Henrique', telefone: '(85) 98734-5678' },
  { nome: 'Daniela Souza', telefone: '(11) 97654-3210' },
  { nome: 'Felipe Martins', telefone: '(21) 98123-4567' },
  { nome: 'Gabriela Lima', telefone: '(85) 99234-8765' },
  { nome: 'Hugo Oliveira', telefone: '(31) 97890-1234' },
  { nome: 'Isabela Costa', telefone: '(85) 98456-7890' },
  { nome: 'João Pedro', telefone: '(11) 99345-6789' },
  { nome: 'Karen Alves', telefone: '(85) 97123-4567' },
  { nome: 'Lucas Ferreira', telefone: '(21) 98765-4321' },
  { nome: 'Mariana Rocha', telefone: '(85) 99876-5432' },
  { nome: 'Nicolas Santos', telefone: '(31) 98234-5678' },
].map((c, i) => ({
  id: `mock-${i}`,
  nome: c.nome,
  telefone: c.telefone,
  iniciais: getIniciais(c.nome),
  cor: CORES[i % CORES.length],
  foto: FOTO_PADRAO,
}));

export function ContatoProvider({ children }: { children: ReactNode }) {
  const [contatos, setContatos] = useState<Contato[]>(contatosMock);

  function adicionarContato(nome: string, telefone: string) {
    const novoContato: Contato = {
      id: `user-${Date.now()}`,
      nome,
      telefone,
      iniciais: getIniciais(nome),
      cor: CORES[contatos.length % CORES.length],
      foto: FOTO_PADRAO,
    };

    setContatos((prev) =>
      [...prev, novoContato].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    );
  }

  return (
    <ContatoContext.Provider value={{ contatos, adicionarContato }}>
      {children}
    </ContatoContext.Provider>
  );
}

export function useContato() {
  const ctx = useContext(ContatoContext);
  if (!ctx) throw new Error('useContato deve ser usado dentro de ContatoProvider');
  return ctx;
}