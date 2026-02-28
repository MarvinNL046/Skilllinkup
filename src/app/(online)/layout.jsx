import { WorldProvider } from "@/context/WorldContext";
import WorldHeader from "@/components/header/WorldHeader";
import Footer14 from "@/components/footer/Footer14";

export default function OnlineLayout({ children }) {
  return (
    <WorldProvider world="online">
      <div className="wrapper ovh">
        <WorldHeader />
        <div className="body_content">
          {children}
        </div>
        <Footer14 />
      </div>
    </WorldProvider>
  );
}
