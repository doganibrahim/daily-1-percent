import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <View className={`bg-white rounded-card px-5 py-4 border border-sand-200 ${className}`}>
      {children}
    </View>
  );
}
