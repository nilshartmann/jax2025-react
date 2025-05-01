import AppTitle from "./AppTitle.tsx";

export default function AppHeader() {
  return <header
    className={
      "relative flex h-20 items-center justify-between bg-white px-8 py-8"
    }
  >
      <AppTitle />
  </header>
}