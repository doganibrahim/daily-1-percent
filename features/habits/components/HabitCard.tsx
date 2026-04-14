import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Card } from '@/components/ui/Card';
import { getDayKey, isSameDayKey } from '@/lib/date';
import { predictTomorrowTarget } from '@/lib/engine';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  onCheckIn: (habitId: string) => void;
}

const formatTarget = (value: number): string => {
  if (value === Math.floor(value)) return value.toString();
  return value.toFixed(2);
};

export function HabitCard({ habit, onCheckIn }: HabitCardProps) {
  const todayKey = getDayKey();
  const checkedInToday = isSameDayKey(habit.lastCheckInDate, todayKey);

  const tomorrowIfSuccess = predictTomorrowTarget(habit.currentValue, true);
  const tomorrowIfMiss = predictTomorrowTarget(habit.currentValue, false);

  const growthPercent = ((habit.currentValue - 1) * 100).toFixed(1);

  return (
    <Card className="mb-4">
      {/* Top: icon + name + streak badge */}
      <View className="flex-row items-center mb-5">
        <View className="bg-sage-100 rounded-2xl w-12 h-12 items-center justify-center mr-4">
          <FontAwesome
            name={(habit.icon as React.ComponentProps<typeof FontAwesome>['name']) || 'leaf'}
            size={20}
            color="#5E8A5D"
          />
        </View>

        <View className="flex-1">
          <Text className="text-charcoal-900 text-lg font-bold">
            {habit.name}
          </Text>
          <Text className="text-charcoal-400 text-xs mt-0.5">
            Current target: {formatTarget(habit.currentValue)}
          </Text>
        </View>

        {habit.streak > 0 && (
          <View className="flex-row items-center bg-terracotta-50 rounded-xl px-3 py-1.5">
            <FontAwesome name="fire" size={13} color="#C2714A" />
            <Text className="text-terracotta-600 text-sm font-bold ml-1.5">
              {habit.streak}
            </Text>
          </View>
        )}
      </View>

      {/* Growth progress bar */}
      <View className="bg-sand-100 rounded-xl p-4 mb-4">
        <View className="flex-row items-baseline justify-between mb-2">
          <Text className="text-charcoal-900 text-3xl font-bold">
            {growthPercent}%
          </Text>
          <Text className="text-charcoal-400 text-xs uppercase tracking-wider">
            Total growth
          </Text>
        </View>
        <View className="bg-sand-200 rounded-full h-2 overflow-hidden">
          <View
            className="bg-sage-500 h-2 rounded-full"
            style={{ width: `${Math.min(parseFloat(growthPercent), 100)}%` }}
          />
        </View>
      </View>

      {/* Tomorrow prediction */}
      <View className="flex-row mb-5">
        <View className="flex-1 bg-sage-50 rounded-xl p-3 mr-2">
          <Text className="text-charcoal-400 text-[10px] uppercase tracking-wider mb-1.5">
            If completed
          </Text>
          <Text className="text-sage-700 text-lg font-bold">
            {formatTarget(tomorrowIfSuccess)}
          </Text>
          <Text className="text-sage-500 text-xs mt-0.5">+1% tomorrow</Text>
        </View>

        <View className="flex-1 bg-terracotta-50 rounded-xl p-3 ml-2">
          <Text className="text-charcoal-400 text-[10px] uppercase tracking-wider mb-1.5">
            If missed
          </Text>
          <Text className="text-terracotta-500 text-lg font-bold">
            {formatTarget(tomorrowIfMiss)}
          </Text>
          <Text className="text-charcoal-400 text-xs mt-0.5">-0.5% tomorrow</Text>
        </View>
      </View>

      {/* Check-in action */}
      {checkedInToday ? (
        <View className="bg-sage-100 rounded-2xl py-4 items-center flex-row justify-center">
          <FontAwesome name="check-circle" size={20} color="#5E8A5D" />
          <Text className="text-sage-700 text-base font-semibold ml-2">
            Completed today
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={() => onCheckIn(habit.id)}
          className="bg-terracotta-500 rounded-2xl py-4 items-center flex-row justify-center"
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          <FontAwesome name="check" size={18} color="#FFFFFF" />
          <Text className="text-white text-base font-semibold ml-2">
            Mark as Done Today
          </Text>
        </Pressable>
      )}
    </Card>
  );
}
