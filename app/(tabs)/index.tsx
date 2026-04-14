import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Screen } from '@/components/ui/Screen';
import { EmptyState } from '@/features/habits/components/EmptyState';
import { HabitCard } from '@/features/habits/components/HabitCard';
import { useHabitStore } from '@/store/habitStore';

export default function HabitsScreen() {
  const habits = useHabitStore((s) => s.habits);
  const checkInHabit = useHabitStore((s) => s.checkInHabit);
  const error = useHabitStore((s) => s.error);
  const resetError = useHabitStore((s) => s.resetError);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(resetError, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, resetError]);

  const handleAddHabit = () => {
    router.push('/modal');
  };

  if (habits.length === 0) {
    return (
      <Screen>
        <EmptyState onAddHabit={handleAddHabit} />
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Error toast */}
      {error && (
        <Pressable
          onPress={resetError}
          className="bg-terracotta-500 mx-5 mt-2 rounded-xl px-4 py-3 flex-row items-center"
        >
          <FontAwesome name="exclamation-circle" size={16} color="#FFFFFF" />
          <Text className="text-white text-sm ml-2 flex-1">{error}</Text>
          <FontAwesome name="times" size={14} color="#FFFFFF" />
        </Pressable>
      )}

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-charcoal-400 text-xs uppercase tracking-widest mb-1">
            Daily Progress
          </Text>
          <Text className="text-charcoal-900 text-3xl font-bold">
            {habits.length} {habits.length === 1 ? 'habit' : 'habits'}
          </Text>
        </View>

        {/* Habit cards */}
        <View className="px-5">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onCheckIn={checkInHabit}
            />
          ))}
        </View>

        {/* Add habit button */}
        <View className="px-5 mt-4">
          <Pressable
            onPress={handleAddHabit}
            className="border-2 border-dashed border-sand-300 rounded-2xl py-5 items-center flex-row justify-center"
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <FontAwesome name="plus" size={16} color="#A89778" />
            <Text className="text-sand-600 text-base font-semibold ml-2">
              Add Habit
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
