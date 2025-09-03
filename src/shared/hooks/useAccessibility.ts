import { useEffect, useState } from "react";
import {
  applyAccessibilityStyles,
  resetAccessibilityStyles,
  applyThemeStyles,
  createAccessibilityObserver,
} from "@/shared/lib/accessibility-utils";

export interface AccessibilitySettings {
  fontSize: number;
  contrast: "normal" | "high" | "inverted";
  theme: "light" | "dark" | "auto";
  lineHeight: number;
  letterSpacing: number;
  reduceMotion: boolean;
  focusIndicator: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  contrast: "normal",
  theme: "auto",
  lineHeight: 1.5,
  letterSpacing: 0,
  reduceMotion: false,
  focusIndicator: true,
};

export const useAccessibility = () => {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Загружаем сохраненные настройки из localStorage
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.warn("Failed to parse accessibility settings:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Применяем настройки к документу
    applySettings(settings);
  }, [settings, isInitialized]);

  useEffect(() => {
    // Создаем наблюдатель за изменениями в DOM
    const observer = createAccessibilityObserver();

    return () => {
      observer.disconnect();
    };
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Размер шрифта
    root.style.setProperty(
      "--accessibility-font-size",
      `${newSettings.fontSize}%`
    );

    // Контрастность
    if (newSettings.contrast === "high") {
      root.style.setProperty("--accessibility-contrast", "high");
      // Применяем высокую контрастность ко всем элементам
      applyAccessibilityStyles("high");
    } else if (newSettings.contrast === "inverted") {
      root.style.setProperty("--accessibility-contrast", "inverted");
      // Применяем инвертированную контрастность ко всем элементам
      applyAccessibilityStyles("inverted");
    } else {
      root.style.setProperty("--accessibility-contrast", "normal");
      // Возвращаем нормальную контрастность
      resetAccessibilityStyles();
    }

    // Тема
    applyThemeStyles(newSettings.theme);

    // Межстрочный интервал
    root.style.setProperty(
      "--accessibility-line-height",
      newSettings.lineHeight.toString()
    );

    // Межбуквенный интервал
    root.style.setProperty(
      "--accessibility-letter-spacing",
      `${newSettings.letterSpacing}px`
    );

    // Уменьшение анимации
    if (newSettings.reduceMotion) {
      root.style.setProperty("--accessibility-reduce-motion", "reduce");
    } else {
      root.style.setProperty("--accessibility-reduce-motion", "no-preference");
    }

    // Индикатор фокуса
    if (newSettings.focusIndicator) {
      root.style.setProperty("--accessibility-focus-indicator", "visible");
    } else {
      root.style.setProperty("--accessibility-focus-indicator", "hidden");
    }

    // Сохраняем настройки
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    isInitialized,
  };
};
