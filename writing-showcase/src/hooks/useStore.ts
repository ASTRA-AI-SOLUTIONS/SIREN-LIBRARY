import { useState, useEffect } from "react";
import { Writing, SiteSettings } from "../types";
import { initialWritings, initialSettings } from "../data";
import { db } from "../lib/firebase";
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";

export const useStore = () => {
  const [writings, setWritings] = useState<Writing[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load and sync from Firestore
  useEffect(() => {
    const unsubWritings = onSnapshot(collection(db, "writings"), (snapshot) => {
      if (snapshot.empty && !isInitialized) {
        // Seed initial data if empty
        const batch = writeBatch(db);
        initialWritings.forEach(w => {
          batch.set(doc(db, "writings", w.id), w);
        });
        batch.commit();
      } else {
        const data = snapshot.docs.map(d => d.data() as Writing);
        // Sort by createdAt descending
        data.sort((a, b) => b.createdAt - a.createdAt);
        setWritings(data);
      }
      setIsInitialized(true);
    }, (error) => {
        console.error("Firestore read error (writings):", error);
        setWritings(initialWritings);
        setIsInitialized(true);
    });

    const unsubSettings = onSnapshot(doc(db, "settings", "main"), (docSnap) => {
      if (!docSnap.exists()) {
        setDoc(doc(db, "settings", "main"), initialSettings);
      } else {
        setSettings(docSnap.data() as SiteSettings);
      }
    }, (error) => {
      console.error("Firestore read error (settings):", error);
      setSettings(initialSettings);
    });

    return () => {
      unsubWritings();
      unsubSettings();
    };
  }, []);

  const addWriting = async (writing: Omit<Writing, "id" | "createdAt">) => {
    const newId = Date.now().toString();
    const newWriting: Writing = {
      ...writing,
      id: newId,
      createdAt: Date.now(),
    };
    await setDoc(doc(db, "writings", newId), newWriting);
  };

  const updateWriting = async (
    id: string,
    updates: Partial<Omit<Writing, "id" | "createdAt">>,
  ) => {
    await updateDoc(doc(db, "writings", id), updates);
  };

  const deleteWriting = async (id: string) => {
    await deleteDoc(doc(db, "writings", id));
  };

  const updateSettings = async (updates: Partial<SiteSettings>) => {
    await updateDoc(doc(db, "settings", "main"), updates);
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