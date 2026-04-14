import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  onAddHabit: () => void;
}

export function EmptyState({ onAddHabit }: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center px-8">
      {/* Illustration area */}
      <View className="items-center mb-10">
        <View className="bg-sand-100 rounded-full w-28 h-28 items-center justify-center mb-8">
          <FontAwesome name="plus-circle" size={44} color="#C2714A" />
        </View>

        <Text className="text-charcoal-900 text-3xl font-bold text-center mb-3">
          Start your journey
        </Text>

        <Text className="text-charcoal-400 text-base text-center leading-6 px-2">
          Add your first habit and watch it{'\n'}
          grow 1% stronger every day.
        </Text>
      </View>

      {/* CTA */}
      <Button
        title="Add Your First Habit"
        onPress={onAddHabit}
        className="w-full"
      />

      {/* Subtle footer hint */}
      <Text className="text-charcoal-300 text-xs text-center mt-3">
        1% daily progress, nearly <Text className="font-bold">38x</Text> in a year.
      </Text>
    </View>
  );
}
