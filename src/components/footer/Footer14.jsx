import AppFooter from "./AppFooter";

// Backwards-compatible alias while older public pages are migrated.
// All routes now render the same app-wide footer implementation.
export default function Footer14() {
  return <AppFooter />;
}
