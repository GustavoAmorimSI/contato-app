import React, { createContext, useContext, useState } from "react";

// tipo do contato
export type Contato = {
  id: string;
  nome: string;
  telefone: string;
  foto: string;
};

// tipo do contexto
type ContatoContextType = {
  contatos: Contato[];
  adicionarContato: (nome: string, telefone: string) => void;
};

// cria o contexto
const ContatoContext = createContext<ContatoContextType | undefined>(undefined);

// foto padrão
const FOTO_PADRAO =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// contatos iniciais
const contatosIniciais: Contato[] = [
  {
    id: "1",
    nome: "Maria Silva",
    telefone: "(88) 99999-1111",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    nome: "João Pereira",
    telefone: "(88) 98888-2222",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    nome: "Ana Souza",
    telefone: "(88) 97777-3333",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export function ContatoProvider({ children }: { children: React.ReactNode }) {
  const [contatos, setContatos] = useState<Contato[]>(contatosIniciais);

  function adicionarContato(nome: string, telefone: string) {
    const novoContato: Contato = {
      id: Date.now().toString(),
      nome,
      telefone,
      foto: FOTO_PADRAO,
    };

    setContatos((listaAnterior) => [...listaAnterior, novoContato]);
  }

  return (
    <ContatoContext.Provider value={{ contatos, adicionarContato }}>
      {children}
    </ContatoContext.Provider>
  );
}

export function useContatos() {
  const context = useContext(ContatoContext);

  if (!context) {
    throw new Error("useContatos deve ser usado dentro de ContatoProvider");
  }

  return context;
}