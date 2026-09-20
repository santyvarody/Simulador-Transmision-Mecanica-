import React from 'react';
import { motion } from 'motion/react';
import { Play, Cog, ShieldCheck, ArrowRight } from 'lucide-react';

interface StartViewProps {
  onStartSimulation: () => void;
}

export const StartView: React.FC<StartViewProps> = ({ onStartSimulation }) => {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F5F7FA] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00B8D9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[#2A3441] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#151B23] border border-[#2A3441] flex items-center justify-center text-[#00B8D9]">
            <span className="text-base">⚙</span>
          </div>
          <span className="font-tech font-bold text-sm tracking-wider text-[#9AA6B2] uppercase">
            PROYECTO ACADÉMICO • INGENIERÍA DE SOFTWARE
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B23] border border-[#22C55E]/40 text-xs font-tech font-bold text-[#22C55E]">
          <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
          <span>PROTOTIPO FUNCIONAL RF-01 / RF-07</span>
        </div>
      </div>

      {/* Hero content */}
      <div className="max-w-4xl mx-auto w-full my-auto py-10 flex flex-col items-center text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00B8D9]/10 border border-[#00B8D9]/30 text-xs font-mono-code text-[#00B8D9] uppercase tracking-wider mb-2">
            Simulador de Ingeniería Mecánica
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-tech font-bold tracking-wider text-[#F5F7FA] uppercase">
            SIMULADOR DE TRANSMISIÓN MECÁNICA
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9AA6B2] leading-relaxed">
            Entorno interactivo de alta fidelidad para la verificación y demostración visual de los requisitos funcionales RF-01 a RF-07 del sistema de transmisión mecánica.
          </p>
        </motion.div>

        {/* Transmission Mechanical Visual Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="my-8 w-full max-w-2xl bg-[#151B23] border border-[#2A3441] rounded-2xl p-6 shadow-2xl relative"
        >
          <div className="text-[11px] font-tech text-[#9AA6B2] uppercase tracking-widest text-left mb-3 flex items-center justify-between">
            <span>DIAGRAMA ESQUEMÁTICO DE TRANSMISIÓN MECÁNICA</span>
            <span className="text-[#00B8D9] font-mono-code">6 MARCHAS DE DEMOSTRACIÓN</span>
          </div>

          {/* SVG Transmission Diagram */}
          <div className="w-full h-44 sm:h-52 bg-[#0B0F14] rounded-xl border border-[#2A3441]/60 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#2A3441_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <svg viewBox="0 0 600 200" className="w-full h-full relative z-10">
              {/* Primary shaft */}
              <line x1="40" y1="70" x2="560" y2="70" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
              <text x="50" y="55" fill="#9AA6B2" fontSize="10" fontFamily="JetBrains Mono">EJE SUPERIOR</text>

              {/* Flywheel & Clutch */}
              <rect x="70" y="30" width="14" height="80" rx="3" fill="#1C2430" stroke="#00B8D9" strokeWidth="2" />
              <rect x="88" y="35" width="10" height="70" rx="2" fill="#00B8D9" />
              <text x="65" y="125" fill="#00B8D9" fontSize="9" fontFamily="Chakra Petch">EMBRAGUE</text>

              {/* Secondary shaft */}
              <line x1="140" y1="140" x2="560" y2="140" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
              <text x="145" y="165" fill="#9AA6B2" fontSize="10" fontFamily="JetBrains Mono">EJE INFERIOR</text>

              {/* Gears 1 to 6 pairs */}
              {[
                { x: 160, r1: 34, r2: 20, num: 1 },
                { x: 230, r1: 30, r2: 24, num: 2 },
                { x: 300, r1: 26, r2: 28, num: 3 },
                { x: 370, r1: 23, r2: 31, num: 4 },
                { x: 440, r1: 20, r2: 34, num: 5 },
                { x: 510, r1: 17, r2: 37, num: 6 },
              ].map((g, idx) => (
                <g key={g.num}>
                  {/* Top gear on primary */}
                  <circle
                    cx={g.x}
                    cy="70"
                    r={g.r1}
                    fill="#151B23"
                    stroke={idx === 0 ? '#00B8D9' : '#2A3441'}
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  <circle cx={g.x} cy="70" r="6" fill={idx === 0 ? '#00B8D9' : '#64748B'} />

                  {/* Bottom gear on countershaft */}
                  <circle
                    cx={g.x}
                    cy="140"
                    r={g.r2}
                    fill="#151B23"
                    stroke={idx === 0 ? '#00B8D9' : '#2A3441'}
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  <circle cx={g.x} cy="140" r="6" fill={idx === 0 ? '#00B8D9' : '#64748B'} />

                  <text
                    x={g.x - 4}
                    y="108"
                    fill={idx === 0 ? '#00B8D9' : '#9AA6B2'}
                    fontSize="11"
                    fontFamily="Chakra Petch"
                    fontWeight="bold"
                  >
                    {g.num}
                  </text>
                </g>
              ))}

              {/* Selector Fork Indicator on Gear 1 */}
              <path d="M 155 40 L 165 40 L 165 100 L 155 100 Z" fill="#22C55E" opacity="0.8" />
              <text x="140" y="25" fill="#22C55E" fontSize="9" fontFamily="JetBrains Mono">ACTIVO (1ª)</text>
            </svg>
          </div>

          {/* Quick status preview strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-left">
            <div className="p-2.5 rounded-lg bg-[#0B0F14] border border-[#2A3441]">
              <span className="text-[10px] text-[#9AA6B2] block">MODO INICIAL</span>
              <span className="text-xs font-tech font-bold text-[#F5F7FA]">NORMAL</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B0F14] border border-[#2A3441]">
              <span className="text-[10px] text-[#9AA6B2] block">MARCHA INICIAL</span>
              <span className="text-xs font-tech font-bold text-[#00B8D9]">1 (PRIMERA)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B0F14] border border-[#2A3441]">
              <span className="text-[10px] text-[#9AA6B2] block">EMBRAGUE</span>
              <span className="text-xs font-tech font-bold text-[#22C55E]">LIBERADO</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B0F14] border border-[#2A3441]">
              <span className="text-[10px] text-[#9AA6B2] block">CAJA DE CAMBIOS</span>
              <span className="text-xs font-tech font-bold text-[#22C55E]">ACOPLADA</span>
            </div>
          </div>
        </motion.div>

        {/* Primary Action Button: INICIAR SIMULACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-3 w-full max-w-sm"
        >
          <button
            id="btn-start-simulation"
            onClick={onStartSimulation}
            className="w-full py-4 px-8 rounded-xl bg-[#00B8D9] hover:bg-[#00cce6] active:scale-98 text-[#0B0F14] font-tech font-bold text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,184,217,0.4)] hover:shadow-[0_0_40px_rgba(0,184,217,0.6)] transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>INICIAR SIMULACIÓN</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-xs text-[#9AA6B2] font-mono-code">
            Ingreso directo al panel de control de 7 requisitos funcionales
          </span>
        </motion.div>
      </div>

      {/* Functional Requirements Grid Footer */}
      <div className="max-w-6xl mx-auto w-full pt-6 border-t border-[#2A3441] mt-6">
        <div className="text-[11px] font-tech font-bold text-[#9AA6B2] uppercase tracking-wider mb-3">
          MATRIZ DE REQUISITOS IMPLEMENTADOS (RF-01 A RF-07)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-left">
          {[
            { code: 'RF-01', title: 'Cambio de Marcha', desc: 'Selector dinámico' },
            { code: 'RF-02', title: 'Subir Marcha', desc: 'Control + SUBIR' },
            { code: 'RF-03', title: 'Bajar Marcha', desc: 'Control − BAJAR' },
            { code: 'RF-04', title: 'Modo de Operación', desc: 'Normal/Sport/Manual' },
            { code: 'RF-05', title: 'Gestión Embrague', desc: 'Pedal interactivo' },
            { code: 'RF-06', title: 'Caja de Cambios', desc: 'Acoplar / Desacoplar' },
            { code: 'RF-07', title: 'Engranajes', desc: 'Gráficos de engrane' },
          ].map((rf) => (
            <div
              key={rf.code}
              className="p-2.5 rounded-lg bg-[#151B23] border border-[#2A3441] flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono-code font-bold text-[#00B8D9]">{rf.code}</span>
              <span className="text-xs font-tech font-bold text-[#F5F7FA] leading-tight my-1">
                {rf.title}
              </span>
              <span className="text-[10px] text-[#9AA6B2] truncate">{rf.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
