import React from 'react';
import { SimulationState, SystemEventLog, TransmissionMode } from '../types';
import { Header } from './Header';
import { GearIndicator } from './GearIndicator';
import { ModeSelector } from './ModeSelector';
import { ClutchPanel } from './ClutchPanel';
import { GearboxPanel } from './GearboxPanel';
import { GearsVisualizer } from './GearsVisualizer';
import { ControlUnitTelemetry } from './ControlUnitTelemetry';

interface MainSimulationViewProps {
  state: SimulationState;
  events: SystemEventLog[];
  onShiftUp: () => void;
  onShiftDown: () => void;
  onDirectGearSelect: (gear: number) => void;
  onModeChange: (mode: TransmissionMode) => void;
  onToggleClutch: () => void;
  onToggleGearbox: () => void;
  onEngageGear: () => void;
  onDisengageGear: () => void;
  onReset: () => void;
  onGoHome: () => void;
}

export const MainSimulationView: React.FC<MainSimulationViewProps> = ({
  state,
  events,
  onShiftUp,
  onShiftDown,
  onDirectGearSelect,
  onModeChange,
  onToggleClutch,
  onToggleGearbox,
  onEngageGear,
  onDisengageGear,
  onReset,
  onGoHome,
}) => {
  const currentGearMesh = state.gearsState[state.currentGear] || 'ENGRANADO';
  const isPowerFlowing =
    state.clutch === 'LIBERADO' &&
    state.gearbox === 'ACOPLADA' &&
    currentGearMesh === 'ENGRANADO';

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F5F7FA] flex flex-col">
      {/* 1. Encabezado */}
      <Header onGoHome={onGoHome} onReset={onReset} showHomeButton={true} />

      {/* Main dashboard content container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Grid: Primary Driving & Mode Controls (Columns on desktop/tablet, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left / Center Column: RF-01, RF-02, RF-03 Gear Indicator & Shift Controls */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col">
            <GearIndicator
              currentGear={state.currentGear}
              onShiftUp={onShiftUp}
              onShiftDown={onShiftDown}
              onDirectGearSelect={onDirectGearSelect}
            />
          </div>

          {/* Right Column: Mode selector & Clutch + Gearbox panels */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-6 justify-between">
            {/* 2. Indicador de modo de funcionamiento (RF-04) */}
            <ModeSelector currentMode={state.mode} onModeChange={onModeChange} />

            {/* Mechanics Row: RF-05 Clutch Panel & RF-06 Gearbox Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* 5. Panel de embrague (RF-05) */}
              <ClutchPanel
                clutchState={state.clutch}
                onToggleClutch={onToggleClutch}
              />

              {/* 6. Panel de caja de cambios (RF-06) */}
              <GearboxPanel
                gearboxState={state.gearbox}
                onToggleGearbox={onToggleGearbox}
              />
            </div>
          </div>
        </div>

        {/* Bottom Grid: RF-07 Gears Visualizer & Conceptual Control Unit Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 7. Representación visual de engranajes (RF-07) */}
          <div className="lg:col-span-7 flex flex-col">
            <GearsVisualizer
              currentGear={state.currentGear}
              currentGearMeshState={currentGearMesh}
              gearsMeshMap={state.gearsState}
              onEngageGear={onEngageGear}
              onDisengageGear={onDisengageGear}
              onSelectGear={onDirectGearSelect}
              isPowerFlowing={isPowerFlowing}
            />
          </div>

          {/* 8. Indicador general del estado del sistema (Unidad de Control) */}
          <div className="lg:col-span-5 flex flex-col">
            <ControlUnitTelemetry state={state} events={events} />
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-[#2A3441] bg-[#0B0F14] py-3 px-4 sm:px-8 text-center text-xs text-[#9AA6B2]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Simulador de Transmisión Mecánica • Demostración Académica RF-01 a RF-07
          </span>
          <span className="font-mono-code text-[11px] text-[#64748B]">
            Interacción 100% en tiempo real • Estado reactivo en memoria
          </span>
        </div>
      </footer>
    </div>
  );
};
