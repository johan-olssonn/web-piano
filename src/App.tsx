import "./App.css";
import Header from "./components/Header";
import Piano from "./components/Piano";

function App() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <Piano />
    </div>
  );
}

export default App;
