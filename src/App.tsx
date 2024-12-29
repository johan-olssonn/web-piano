import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Piano from "./components/Piano";
import { keys } from "./definitions/keys";

function App() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [numberOfLoadedKeys, setNumberOfLoadedKeys] = useState(0);

  useEffect(() => {
    setLoadingPercentage(Math.round((numberOfLoadedKeys / keys.length) * 100));
  }, [numberOfLoadedKeys]);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header loadingPercentage={loadingPercentage} />
      <Piano onKeyLoaded={() => setNumberOfLoadedKeys((prev) => prev + 1)} />
    </div>
  );
}

export default App;
