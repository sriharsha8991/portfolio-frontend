declare module 'vanilla-tilt' {
  interface TiltOptions {
    max?: number;
    speed?: number;
    glare?: boolean;
    'max-glare'?: number;
    scale?: number;
    perspective?: number;
    reverse?: boolean;
    reset?: boolean;
    easing?: string;
    transition?: boolean;
    axis?: 'x' | 'y' | null;
    'reset-to-start'?: boolean;
    'full-page-listening'?: boolean;
    'mouse-event-element'?: string | HTMLElement;
    gyroscope?: boolean;
    gyroscopeMinAngleX?: number;
    gyroscopeMaxAngleX?: number;
    gyroscopeMinAngleY?: number;
    gyroscopeMaxAngleY?: number;
  }

  interface TiltElement extends HTMLElement {
    vanillaTilt?: {
      destroy: () => void;
      getValues: () => { tiltX: number; tiltY: number; percentageX: number; percentageY: number };
      reset: () => void;
    };
  }

  const VanillaTilt: {
    init: (element: HTMLElement, options?: TiltOptions) => void;
  };

  export default VanillaTilt;
}
