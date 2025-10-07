/**
 * Утилиты для принудительного применения стилей доступности
 */

export const applyAccessibilityStyles = (
  mode: "high" | "inverted" | "normal"
) => {
  if (mode === "normal") {
    resetAccessibilityStyles();
    return;
  }

  const isHighContrast = mode === "high";
  const textColor = isHighContrast ? "#000000" : "#ffffff";
  const bgColor = isHighContrast ? "#ffffff" : "#000000";

  // Применяем стили ко всем элементам
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    const el = element as HTMLElement;

    // Применяем базовые цвета
    if (mode === "high") {
      el.style.backgroundColor = "#ffffff";
      el.style.color = "#000000";
    } else if (mode === "inverted") {
      el.style.backgroundColor = "#000000";
      el.style.color = "#ffffff";
    }

    // Обрабатываем специальные классы
    if (el.classList.contains("bg-abu_primary")) {
      el.style.backgroundColor = textColor;
    }

    if (el.classList.contains("text-abu_primary")) {
      el.style.color = textColor;
    }

    // Обрабатываем inline стили
    if (
      el.style.backgroundColor &&
      !el.style.backgroundColor.includes("var(")
    ) {
      el.style.backgroundColor = bgColor;
    }

    if (el.style.color && !el.style.color.includes("var(")) {
      el.style.color = textColor;
    }

    // Обрабатываем градиенты и изображения
    if (el.style.backgroundImage) {
      if (mode === "high") {
        el.style.backgroundImage = "none";
        el.style.backgroundColor = "#ffffff";
      } else if (mode === "inverted") {
        el.style.backgroundImage = "none";
        el.style.backgroundColor = "#000000";
      }
    }
  });

  // Специальная обработка для изображений
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (mode === "high") {
      img.style.filter = "contrast(1000%) brightness(0)";
    } else if (mode === "inverted") {
      img.style.filter = "contrast(1000%) brightness(0) invert(1)";
    } else {
      img.style.filter = "none";
    }
  });

  // Обработка для SVG иконок
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg) => {
    if (mode === "high") {
      svg.style.filter = "brightness(0)";
    } else if (mode === "inverted") {
      svg.style.filter = "brightness(0) invert(1)";
    } else {
      svg.style.filter = "none";
    }
  });

  // Применяем стили к body
  document.body.style.color = textColor;
  document.body.style.backgroundColor = bgColor;

  // Применяем стили к html
  document.documentElement.style.color = textColor;
  document.documentElement.style.backgroundColor = bgColor;
};

export const resetAccessibilityStyles = () => {
  // Удаляем все установленные стили
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    const el = element as HTMLElement;

    // Удаляем принудительно установленные стили
    el.style.removeProperty("background-color");
    el.style.removeProperty("color");
    el.style.removeProperty("background-image");
    el.style.removeProperty("filter");
  });

  // Сбрасываем стили body и html
  document.body.style.removeProperty("color");
  document.body.style.removeProperty("background-color");
  document.documentElement.style.removeProperty("color");
  document.documentElement.style.removeProperty("background-color");
};

export const applyThemeStyles = (theme: "light" | "dark" | "auto") => {
  const root = document.documentElement;

  // Удаляем существующие классы темы
  root.classList.remove("light", "dark");

  if (theme === "light") {
    root.classList.add("light");
  } else if (theme === "dark") {
    root.classList.add("dark");
  }
  // Для 'auto' не добавляем классы, используем системные настройки
};

export const createAccessibilityObserver = () => {
  // Создаем наблюдатель за изменениями в DOM для автоматического применения стилей
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        // Новые элементы добавлены, применяем стили доступности
        const currentContrast = document.documentElement.style.getPropertyValue(
          "--accessibility-contrast"
        );
        if (currentContrast && currentContrast !== "normal") {
          applyAccessibilityStyles(currentContrast as "high" | "inverted");
        }
      }
    });
  });

  // Начинаем наблюдение
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
};

export const getAccessibilitySettings = () => {
  const saved = localStorage.getItem("accessibility-settings");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};

export const saveAccessibilitySettings = (settings: any) => {
  localStorage.setItem("accessibility-settings", JSON.stringify(settings));
};
