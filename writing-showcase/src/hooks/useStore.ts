import { useState, useEffect } from "react";
import { Writing, SiteSettings } from "../types";
import { initialWritings, initialSettings } from "../data";

export const useStore = () => {
  const [writings, setWritings] = useState<Writing[]>(() => {
    const saved = localStorage.getItem("writings_v9");
    if (saved) return JSON.parse(saved);
    return initialWritings;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem("settings_v9");
    if (saved) return JSON.parse(saved);
    return initialSettings;
  });

  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem("writings_v9", JSON.stringify(writings));
  }, [writings]);

  useEffect(() => {
    localStorage.setItem("settings_v9", JSON.stringify(settings));
  }, [settings]);

  const addWriting = (writing: Omit<Writing, "id" | "createdAt">) => {
    const newWriting: Writing = {
      ...writing,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setWritings((prev) => [newWriting, ...prev]);
  };

  const updateWriting = (
    id: string,
    updates: Partial<Omit<Writing, "id" | "createdAt">>,
  ) => {
    setWritings((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    );
  };

  const deleteWriting = (id: string) => {
    setWritings((prev) => prev.filter((w) => w.id !== id));
  };

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return {
    writings,
    settings,
    isAdminAuth,
    setIsAdminAuth,
    addWriting,
    updateWriting,
    deleteWriting,
    updateSettings,
  };
};
