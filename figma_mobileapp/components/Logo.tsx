import logoImage from 'figma:asset/059c068e980a36c0f05f5204a34c3e776641d74c.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 'medium' }: LogoProps) {
  const heights = {
    small: 24,
    medium: 32,
    large: 48,
  };

  return (
    <img 
      src={logoImage} 
      alt="MoMent - The Caring Cloud for Modern Families" 
      style={{ height: `${heights[size]}px`, width: 'auto' }}
      className="object-contain"
    />
  );
}
