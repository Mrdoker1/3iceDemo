'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MenuSettings {
  schedule: boolean;
  watch: boolean;
  ticketing: boolean;
  shop: boolean;
}

interface MenuSettingsContextType {
  settings: MenuSettings;
  toggleSetting: (key: keyof MenuSettings) => void;
}

const defaultSettings: MenuSettings = {
  schedule: true,    // Всегда видно
  watch: false,      // Скрыто по умолчанию
  ticketing: false,  // Скрыто по умолчанию
  shop: true,        // Всегда видно
};

const MenuSettingsContext = createContext<MenuSettingsContextType | null>(null);

export function MenuSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<MenuSettings>(defaultSettings);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('menuSettings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load menu settings:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('menuSettings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof MenuSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MenuSettingsContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </MenuSettingsContext.Provider>
  );
}

export function useMenuSettings() {
  const context = useContext(MenuSettingsContext);
  if (!context) {
    throw new Error('useMenuSettings must be used within MenuSettingsProvider');
  }
  return context;
}
