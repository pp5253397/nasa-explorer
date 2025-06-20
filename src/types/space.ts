
export interface AsteroidData {
  id: string;
  name: string;
  closeApproachDate: string;
  velocity: number;
  distance: number;
  position: import('three').Vector3;
  orbitRadius: number;
  orbitSpeed: number;
  asteroidType: 'rocky' | 'metallic' | 'icy';
}

export interface APODData {
  title: string;
  url: string;
  date: string;
  explanation: string;
  media_type: string;
}

export interface NEOData {
  id: string;
  name: string;
  closeApproachDate: string;
  velocity: number;
  distance: number;
}
