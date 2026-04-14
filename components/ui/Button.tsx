import { Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, { container: string; text: string; pressed: string }> = {
  primary: {
    container: 'bg-terracotta-500 rounded-2xl px-6 py-4',
    text: 'text-white text-base font-semibold text-center',
    pressed: 'bg-terracotta-600',
  },
  secondary: {
    container: 'bg-sand-200 rounded-2xl px-6 py-4',
    text: 'text-charcoal-800 text-base font-semibold text-center',
    pressed: 'bg-sand-300',
  },
  ghost: {
    container: 'rounded-2xl px-6 py-4',
    text: 'text-terracotta-500 text-base font-semibold text-center',
    pressed: 'bg-sand-100',
  },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const styles = variantClasses[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${styles.container} ${disabled ? 'opacity-50' : ''} ${className}`}
      style={({ pressed }) => ({
        opacity: pressed && !disabled ? 0.85 : disabled ? 0.5 : 1,
      })}
    >
      <Text className={styles.text}>{title}</Text>
    </Pressable>
  );
}
