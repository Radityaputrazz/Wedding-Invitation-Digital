export interface HeroProps {
  isVisible: boolean;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownUnitProps {
  value: number;
  label: string;
}

export interface HeroCountdownProps {
  timeLeft: CountdownTime;
}

export interface HeroAnimationProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}