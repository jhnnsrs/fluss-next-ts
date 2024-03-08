import { useState } from "react";
import "./App.css";
import {
  FaktsProvider,
  FaktsGuard,
  useFakts,
  WellKnownDiscovery,
} from "@jhnnsrs/fakts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Callback } from "./contrib/Callback";
import { NoHerre } from "./NoHerre";
import { HerreGuard, HerreProvider, useHerre } from "@jhnnsrs/herre";
import { FlussGuard, FlussProvider, withFluss } from "./fluss";
import { FlussAutoConfigure } from "./contrib/FlussAutoConfigure";
import { FaktsLogin } from "./contrib/FaktsLogin";

export const Log = () => {
  const fakts = useFakts();
  const herre = useHerre();

  return (
    <button
      onClick={() => {
        herre.logout();
        fakts.setFakts(null);
      }}
    >
      ssss
    </button>
  );
};

export const ProtectedApp = () => {
  return (
    <HerreGuard fallback={<NoHerre />}>
      <FlussProvider>
            <Log />
            <FlussAutoConfigure />
      </FlussProvider>
    </HerreGuard>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FaktsProvider>
        <WellKnownDiscovery endpoints={["http://localhost:8030"]} />
        <FaktsGuard fallback={<FaktsLogin />}>
          <HerreProvider>
            <Router>
              <Routes>
                <Route path="/" element={<ProtectedApp />} />
                <Route path="/callback" element={<Callback />} />
              </Routes>
            </Router>
          </HerreProvider>
        </FaktsGuard>
      </FaktsProvider>
    </div>
  );
}

export default App;
