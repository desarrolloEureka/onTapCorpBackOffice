declare module 'react-web-vector-icons' {
  export function Icon({ name, size, color, font }: icon): any;
  export function FontAwesome({ name, size, color, font }: FontAwesome): any;
}
interface icon {
  name: string;
  size?: number;
  color?: string;
  font?: string;
}

interface FontAwesome {
  name: string;
  size?: number;
  color?: string;
  font?: string;
}
