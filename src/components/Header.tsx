import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

interface HeaderProps {
  onGoHome?: () => void;
  onReset?: () => void;
  showHomeButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, onReset, showHomeButton = false }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2A3441] bg-[#0B0F14]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Title & icon */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#151B23] border border-[#2A3441] text-[#00B8D9] shrink-0 shadow-inner">
            <span className="text-lg leading-none" role="img" aria-label="engranaje">⚙</span>
          </div>
          <div className="truncate">
            <h1 className="text-base sm:text-lg font-bold tracking-wider text-[#F5F7FA] font-tech uppercase truncate">
              SIMULADOR DE TRANSMISIÓN MECÁNICA
            </h1>
            <p className="text-xs text-[#9AA6B2] hidden sm:block">
              Prototipo de Validación de Requisitos RF-01 a RF-07
            </p>
          </div>
        </div>

        {/* Right: System status indicator & actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {showHomeButton && onGoHome && (
            <button
              id="btn-nav-home"
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151B23] hover:bg-[#1C2430] border border-[#2A3441] text-xs font-semibold text-[#9AA6B2] hover:text-[#F5F7FA] transition-colors"
              title="Volver a la vista inicial"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Inicio</span>
            </button>
          )}

          {onReset && (
            <button
              id="btn-reset-simulation"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151B23] hover:bg-[#1C2430] border border-[#2A3441] text-xs font-semibold text-[#9AA6B2] hover:text-[#00B8D9] transition-colors"
              title="Restablecer estado inicial de demostración"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Restablecer</span>
            </button>
          )}

          {/* Indicator: SISTEMA ACTIVO */}
          <div
            id="status-system-active"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151B23] border border-[#22C55E]/40 shadow-[0_0_12px_rgba(34,197,94,0.15)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
            </span>
            <span className="text-xs font-tech font-bold tracking-wider text-[#22C55E] uppercase whitespace-nowrap">
              ● SISTEMA ACTIVO
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
