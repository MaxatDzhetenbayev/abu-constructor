"use client";

import React, { useState } from "react";
import { Eye, Type, Contrast, Sun, Moon, Plus, Minus } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Slider } from "./slider";
import { Switch } from "./switch";
import { Label } from "./label";
import { useAccessibilityContext } from "@/shared/providers/accessibility-provider";

export const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = useAccessibilityContext();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full hover:bg-accent"
          aria-label="Настройки доступности"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Настройки доступности
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Размер шрифта */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Размер шрифта
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSetting("fontSize", Math.max(50, settings.fontSize - 10))}
                  aria-label="Уменьшить размер шрифта"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="min-w-[3rem] text-center">{settings.fontSize}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSetting("fontSize", Math.min(200, settings.fontSize + 10))}
                  aria-label="Увеличить размер шрифта"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting("fontSize", value)}
              min={50}
              max={200}
              step={10}
              className="w-full"
            />
          </div>

          {/* Контрастность */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Contrast className="h-4 w-4" />
              Контрастность
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "normal" as const, label: "Обычная" },
                { value: "high" as const, label: "Высокая" },
                { value: "inverted" as const, label: "Инвертированная" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.contrast === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("contrast", option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Тема */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              {settings.theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              Тема
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "auto" as const, label: "Авто" },
                { value: "light" as const, label: "Светлая" },
                { value: "dark" as const, label: "Темная" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.theme === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("theme", option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Межстрочный интервал */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Межстрочный интервал</Label>
              <span className="text-sm text-muted-foreground">{settings.lineHeight.toFixed(1)}</span>
            </div>
            <Slider
              value={[settings.lineHeight]}
              onValueChange={([value]) => updateSetting("lineHeight", value)}
              min={1.2}
              max={2.5}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Межбуквенный интервал */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Межбуквенный интервал</Label>
              <span className="text-sm text-muted-foreground">{settings.letterSpacing}px</span>
            </div>
            <Slider
              value={[settings.letterSpacing]}
              onValueChange={([value]) => updateSetting("letterSpacing", value)}
              min={0}
              max={5}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Дополнительные настройки */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="reduce-motion">Уменьшить анимацию</Label>
              <Switch
                id="reduce-motion"
                checked={settings.reduceMotion}
                onCheckedChange={(checked) => updateSetting("reduceMotion", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-indicator">Индикатор фокуса</Label>
              <Switch
                id="focus-indicator"
                checked={settings.focusIndicator}
                onCheckedChange={(checked) => updateSetting("focusIndicator", checked)}
              />
            </div>
          </div>

          {/* Кнопки управления */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="flex-1"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
