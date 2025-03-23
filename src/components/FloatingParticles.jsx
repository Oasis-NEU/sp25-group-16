import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const FloatingParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 30 },
            size: { value: 4 },
            color: { value: "#ffffff" },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.8 },
            shape: { type: "circle" },
          },
        }}
      />
    </div>
  );
};

export default FloatingParticles;
