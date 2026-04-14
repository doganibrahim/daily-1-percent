import { useRouter } from 'expo-router';

import { AddHabitSheet } from '@/features/habits/components/AddHabitSheet';
import { useHabitStore } from '@/store/habitStore';

export default function AddHabitModal() {
  const addHabit = useHabitStore((s) => s.addHabit);
  const router = useRouter();

  const handleSubmit = (input: { name: string; icon: string; color: string }) => {
    addHabit(input);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <AddHabitSheet onSubmit={handleSubmit} onCancel={handleCancel} />;
}
