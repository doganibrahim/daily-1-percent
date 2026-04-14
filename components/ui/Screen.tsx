import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

export function Screen({ children, className = '' }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-sand-50 ${className}`}
      style={{ paddingTop: insets.top }}
    >
      {children}
    </View>
  );
}
