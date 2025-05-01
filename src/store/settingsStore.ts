
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SiteSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  currencyCode: string;
  primaryColor: string;
  enableMpesa: boolean;
  enablePaystack: boolean;
  enableGuestCheckout: boolean;
  deliveryFee: number;
  logo?: string;
}

interface SettingsStore {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: SiteSettings = {
  storeName: 'Sweet Stack Cakes',
  storeEmail: 'contact@sweetstackcakes.com',
  storePhone: '+234 123 456 7890',
  currencyCode: 'NGN',
  primaryColor: '#f59e0b',
  enableMpesa: true,
  enablePaystack: true,
  enableGuestCheckout: true,
  deliveryFee: 1500,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'sweet-stack-settings',
    }
  )
);
