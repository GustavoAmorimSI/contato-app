import { Stack } from "expo-router";
import { ContatoProvider } from "../context/context/ContatoContext";

export default function Layout() {
  return (
    <ContatoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ContatoProvider>
  );
}