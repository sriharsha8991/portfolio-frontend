/**
 * Grain Texture Utility
 * Generates SVG noise filter for atmospheric texture overlay
 */

export const generateGrainSVG = (): string => {
  return `data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;
};

export const grainStyles = {
  light: {
    opacity: 0.015,
    backgroundImage: `url("${generateGrainSVG()}")`,
  },
  dark: {
    opacity: 0.025,
    backgroundImage: `url("${generateGrainSVG()}")`,
  },
};

/**
 * Grain Texture Component
 * Renders the grain overlay
 */
export const GrainTexture = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] grain-texture"
      style={{
        backgroundImage: `url("${generateGrainSVG()}")`,
        animation: 'grain 8s steps(10) infinite',
      }}
      aria-hidden="true"
    />
  );
};

export default GrainTexture;
