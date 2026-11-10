import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MissionProvider } from "./MissionContext";
import { ToastProvider } from "./toast";
import { GamePage } from "./pages/GamePage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <MissionProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </MissionProvider>
  );
}
