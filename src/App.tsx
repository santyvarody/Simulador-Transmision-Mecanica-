import { useState, useCallback, useEffect } from 'react';
import { SimulationState, SystemEventLog, TransmissionMode } from './types';
import { INITIAL_SIMULATION_STATE, GEARS_DATA, MIN_GEAR, MAX_GEAR } from './constants';
import { StartView } from './components/StartView';
import { MainSimulationView } from './components/MainSimulationView';

type AppView = 'START' | 'SIMULATION';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('SIMULATION');
  const [state, setState] = useState<SimulationState>(INITIAL_SIMULATION_STATE);
  const [events, setEvents] = useState<SystemEventLog[]>([
    {
      id: 'init-0',
      timestamp: new Date().toLocaleTimeString(),
      requirementCode: 'RF-01',
      title: 'Inicialización de demostración',
      description: 'Estado inicial: Modo NORMAL, Marcha 1, Embrague LIBERADO, Caja ACOPLADA, Engranaje 1 ENGRANADO.',
    },
  ]);

  const logEvent = useCallback(
    (code: SystemEventLog['requirementCode'], title: string, description: string) => {
      const newEvent: SystemEventLog = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toLocaleTimeString(),
        requirementCode: code,
        title,
        description,
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
    },
    [],
  );

  // RF-01 & RF-02: SUBIR MARCHA
  const handleShiftUp = useCallback(() => {
    setState((prev) => {
      if (prev.currentGear >= MAX_GEAR) return prev;
      const nextGear = prev.currentGear + 1;

      const updatedGears = {
        ...prev.gearsState,
        [prev.currentGear]: 'DESENGRANADO' as const,
        [nextGear]: 'ENGRANADO' as const,
      };

      logEvent(
        'RF-02',
        'Subir marcha',
        `Marcha incrementada: ${prev.currentGear} → ${nextGear}. Engranaje ${nextGear} seleccionado.`,
      );

      return {
        ...prev,
        currentGear: nextGear,
        gearsState: updatedGears,
      };
    });
  }, [logEvent]);

  // RF-01 & RF-03: BAJAR MARCHA
  const handleShiftDown = useCallback(() => {
    setState((prev) => {
      if (prev.currentGear <= MIN_GEAR) return prev;
      const nextGear = prev.currentGear - 1;

      const updatedGears = {
        ...prev.gearsState,
        [prev.currentGear]: 'DESENGRANADO' as const,
        [nextGear]: 'ENGRANADO' as const,
      };

      logEvent(
        'RF-03',
        'Bajar marcha',
        `Marcha disminuida: ${prev.currentGear} → ${nextGear}. Engranaje ${nextGear} seleccionado.`,
      );

      return {
        ...prev,
        currentGear: nextGear,
        gearsState: updatedGears,
      };
    });
  }, [logEvent]);

  // RF-01: CAMBIO DIRECTO DE MARCHA
  const handleDirectGearSelect = useCallback(
    (targetGear: number) => {
      if (targetGear < MIN_GEAR || targetGear > MAX_GEAR) return;
      setState((prev) => {
        if (prev.currentGear === targetGear) return prev;

        const updatedGears = {
          ...prev.gearsState,
          [prev.currentGear]: 'DESENGRANADO' as const,
          [targetGear]: 'ENGRANADO' as const,
        };

        logEvent(
          'RF-01',
          'Cambio de marcha',
          `Marcha seleccionada: ${targetGear}. Engranaje ${targetGear} engranado.`,
        );

        return {
          ...prev,
          currentGear: targetGear,
          gearsState: updatedGears,
        };
      });
    },
    [logEvent],
  );

  // RF-04: CAMBIAR MODO DE FUNCIONAMIENTO
  const handleModeChange = useCallback(
    (newMode: TransmissionMode) => {
      setState((prev) => {
        if (prev.mode === newMode) return prev;

        logEvent(
          'RF-04',
          'Cambio de modo',
          `Modo de funcionamiento cambiado a ${newMode}.`,
        );

        return {
          ...prev,
          mode: newMode,
        };
      });
    },
    [logEvent],
  );

  // RF-05: GESTIONAR EL EMBRAGUE
  const handleToggleClutch = useCallback(() => {
    setState((prev) => {
      const nextClutch = prev.clutch === 'LIBERADO' ? 'ACTIVADO' : 'LIBERADO';

      logEvent(
        'RF-05',
        nextClutch === 'ACTIVADO' ? 'Activación del embrague' : 'Liberación del embrague',
        `Estado del embrague: ${nextClutch}.`,
      );

      return {
        ...prev,
        clutch: nextClutch,
      };
    });
  }, [logEvent]);

  // RF-06: GESTIONAR LA CAJA DE CAMBIOS
  const handleToggleGearbox = useCallback(() => {
    setState((prev) => {
      const nextGearbox = prev.gearbox === 'ACOPLADA' ? 'DESACOPLADA' : 'ACOPLADA';

      logEvent(
        'RF-06',
        nextGearbox === 'DESACOPLADA' ? 'Desacoplamiento de caja' : 'Acoplamiento de caja',
        `Caja de cambios: ${nextGearbox}.`,
      );

      return {
        ...prev,
        gearbox: nextGearbox,
      };
    });
  }, [logEvent]);

  // RF-07: ENGRANAR ENGRANAJE ACTUAL
  const handleEngageGear = useCallback(() => {
    setState((prev) => {
      const gear = prev.currentGear;
      if (prev.gearsState[gear] === 'ENGRANADO') return prev;

      logEvent(
        'RF-07',
        'Engranaje activado',
        `Engranaje ${gear} establecido en estado ENGRANADO.`,
      );

      return {
        ...prev,
        gearsState: {
          ...prev.gearsState,
          [gear]: 'ENGRANADO',
        },
      };
    });
  }, [logEvent]);

  // RF-07: DESENGRANAR ENGRANAJE ACTUAL
  const handleDisengageGear = useCallback(() => {
    setState((prev) => {
      const gear = prev.currentGear;
      if (prev.gearsState[gear] === 'DESENGRANADO') return prev;

      logEvent(
        'RF-07',
        'Engranaje desactivado',
        `Engranaje ${gear} establecido en estado DESENGRANADO.`,
      );

      return {
        ...prev,
        gearsState: {
          ...prev.gearsState,
          [gear]: 'DESENGRANADO',
        },
      };
    });
  }, [logEvent]);

  // Reset to initial demonstration state (Section 13)
  const handleReset = useCallback(() => {
    setState(INITIAL_SIMULATION_STATE);
    logEvent(
      'RF-01',
      'Restablecimiento de demostración',
      'Modo: NORMAL, Marcha: 1, Embrague: LIBERADO, Caja: ACOPLADA, Engranaje: 1 — ENGRANADO.',
    );
  }, [logEvent]);

  // Keyboard shortcut listener for fluent desktop testing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentView !== 'SIMULATION') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleShiftUp();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleShiftDown();
      } else if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        handleDirectGearSelect(parseInt(e.key, 10));
      } else if (e.code === 'Space') {
        e.preventDefault();
        handleToggleClutch();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handleToggleGearbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, handleShiftUp, handleShiftDown, handleDirectGearSelect, handleToggleClutch, handleToggleGearbox]);

  return (
    <div className="w-full min-h-screen bg-[#0B0F14] selection:bg-[#00B8D9]/30">
      {currentView === 'START' ? (
        <StartView onStartSimulation={() => setCurrentView('SIMULATION')} />
      ) : (
        <MainSimulationView
          state={state}
          events={events}
          onShiftUp={handleShiftUp}
          onShiftDown={handleShiftDown}
          onDirectGearSelect={handleDirectGearSelect}
          onModeChange={handleModeChange}
          onToggleClutch={handleToggleClutch}
          onToggleGearbox={handleToggleGearbox}
          onEngageGear={handleEngageGear}
          onDisengageGear={handleDisengageGear}
          onReset={handleReset}
          onGoHome={() => setCurrentView('START')}
        />
      )}
    </div>
  );
}
