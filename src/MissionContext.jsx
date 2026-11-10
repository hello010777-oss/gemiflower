import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { INITIAL_MISSIONS, STORAGE_KEY } from "./missions";

const MissionContext = createContext(undefined);

function withEmoji(saved) {
  return saved.map((mission, index) => {
    if ("emoji" in mission && mission.emoji) return mission;
    const match = INITIAL_MISSIONS.find((item) => item.flowerName === mission.flowerName);
    return {
      ...mission,
      emoji: match?.emoji || INITIAL_MISSIONS[index % INITIAL_MISSIONS.length].emoji || "🌸",
    };
  });
}

export function MissionProvider({ children }) {
  const [missions, setMissions] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setMissions(withEmoji(JSON.parse(raw)));
      } else {
        setMissions(INITIAL_MISSIONS);
      }
    } catch (error) {
      console.error("Failed to load missions from storage, using initial data.", error);
      setMissions(INITIAL_MISSIONS);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
    } catch (error) {
      console.error("Failed to save missions to storage.", error);
    }
  }, [missions, ready]);

  const updateMission = useCallback((next) => {
    setMissions((current) => current.map((mission) => (mission.id === next.id ? next : mission)));
  }, []);

  const toggleMissionSelection = useCallback((id, selected) => {
    setMissions((current) =>
      current.map((mission) => (mission.id === id ? { ...mission, selected } : mission))
    );
  }, []);

  const resetMissions = useCallback(() => {
    setMissions(INITIAL_MISSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MISSIONS));
  }, []);

  if (!ready) return null;

  return (
    <MissionContext.Provider
      value={{ missions, updateMission, toggleMissionSelection, resetMissions }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const value = useContext(MissionContext);
  if (value === undefined) {
    throw new Error("useMissions must be used within a MissionProvider");
  }
  return value;
}
