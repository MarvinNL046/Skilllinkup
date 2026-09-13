import { WorldProvider } from "@/context/WorldContext";

export default function ServicesLayout({ children }) {
  return <WorldProvider world="online">{children}</WorldProvider>;
}
