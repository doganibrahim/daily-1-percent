import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Button } from '@/components/ui/Button';

type FAIconName = React.ComponentProps<typeof FontAwesome>['name'];

interface AddHabitSheetProps {
  onSubmit: (input: { name: string; icon: string; color: string }) => void;
  onCancel: () => void;
}

const COLOR_OPTIONS = [
  { label: 'Sage', value: 'bg-sage-500', bg: '#E5ECE5', fg: '#5E8A5D' },
  { label: 'Terracotta', value: 'bg-terracotta-500', bg: '#FAEADE', fg: '#C2714A' },
  { label: 'Sand', value: 'bg-sand-500', bg: '#F5EDE0', fg: '#A89778' },
  { label: 'Charcoal', value: 'bg-charcoal-500', bg: '#E8E8E8', fg: '#5C5C5C' },
] as const;

const ICON_OPTIONS: { label: string; name: FAIconName }[] = [
  { label: 'Leaf', name: 'leaf' },
  { label: 'Book', name: 'book' },
  { label: 'Heart', name: 'heart' },
  { label: 'Star', name: 'star' },
  { label: 'Music', name: 'music' },
  { label: 'Bolt', name: 'bolt' },
  { label: 'Moon', name: 'moon-o' },
  { label: 'Bicycle', name: 'bicycle' },
  { label: 'Coffee', name: 'coffee' },
  { label: 'Pencil', name: 'pencil' },
  { label: 'Trophy', name: 'trophy' },
  { label: 'Smile', name: 'smile-o' },
];

const getColorMeta = (colorValue: string) => {
  return COLOR_OPTIONS.find((c) => c.value === colorValue) ?? COLOR_OPTIONS[0];
};

export function AddHabitSheet({ onSubmit, onCancel }: AddHabitSheetProps) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].value);
  const [selectedIcon, setSelectedIcon] = useState<string>(ICON_OPTIONS[0].name);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filteredIcons = iconSearch.trim()
    ? ICON_OPTIONS.filter((i) => i.label.toLowerCase().includes(iconSearch.trim().toLowerCase()))
    : ICON_OPTIONS;

  const colorMeta = getColorMeta(selectedColor);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a habit name.');
      return;
    }
    if (trimmed.length < 2) {
      setError('Habit name must be at least 2 characters.');
      return;
    }

    setError(null);
    onSubmit({ name: trimmed, icon: selectedIcon, color: selectedColor });
  };

  return (
    <View className="flex-1 bg-sand-50">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Pressable onPress={onCancel} hitSlop={12}>
            <Text className="text-charcoal-400 text-base">Cancel</Text>
          </Pressable>
          <Text className="text-charcoal-900 text-lg font-bold">New Habit</Text>
          <View className="w-14" />
        </View>

        {/* Preview */}
        <View className="items-center mb-8">
          <View
            className="w-20 h-20 rounded-3xl items-center justify-center mb-3"
            style={{ backgroundColor: colorMeta.bg }}
          >
            <FontAwesome
              name={selectedIcon as FAIconName}
              size={32}
              color={colorMeta.fg}
            />
          </View>
          <Text className="text-charcoal-300 text-xs">
            {name.trim() || 'Your new habit'}
          </Text>
        </View>

        {/* Habit name input */}
        <View className="mb-6">
          <Text className="text-charcoal-500 text-xs uppercase tracking-widest mb-2">
            Habit Name
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (error) setError(null);
            }}
            placeholder="e.g. Morning Run"
            placeholderTextColor="#ABABAB"
            className="bg-sand-100 rounded-2xl px-5 py-4 text-charcoal-900 text-base border border-sand-200"
            maxLength={50}
            autoFocus
          />
          {error && (
            <Text className="text-terracotta-500 text-sm mt-2 ml-1">{error}</Text>
          )}
        </View>

        {/* Icon & Color – side by side */}
        <View className="mb-8">
          <Text className="text-charcoal-500 text-xs uppercase tracking-widest mb-3">
            Icon & Color
          </Text>
          <View className="flex-row items-start">
            {/* Icon selector button */}
            <Pressable
              onPress={() => setIconPickerOpen(true)}
              className="bg-sand-100 rounded-2xl px-4 py-3 border border-sand-200 flex-row items-center mr-3"
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: colorMeta.bg }}
              >
                <FontAwesome name={selectedIcon as FAIconName} size={18} color={colorMeta.fg} />
              </View>
              <FontAwesome name="chevron-down" size={10} color="#7F7F7F" className="ml-2" />
            </Pressable>

            {/* Color dots */}
            <View className="flex-row items-center bg-sand-100 rounded-2xl px-3 py-3 border border-sand-200">
              {COLOR_OPTIONS.map((option) => {
                const isSelected = selectedColor === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setSelectedColor(option.value)}
                    className={`w-10 h-10 rounded-full items-center justify-center mx-0.5 ${
                      isSelected ? 'border-2 border-charcoal-400' : ''
                    }`}
                  >
                    <View
                      className={`rounded-full ${isSelected ? 'w-6 h-6' : 'w-7 h-7'}`}
                      style={{ backgroundColor: option.fg }}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Growth method info */}
        <View className="bg-sand-100 rounded-2xl p-4 mb-8 flex-row items-center">
          <FontAwesome name="line-chart" size={18} color="#C2714A" />
          <View className="ml-3 flex-1">
            <Text className="text-charcoal-800 text-sm font-semibold">
              1% Daily Growth
            </Text>
            <Text className="text-charcoal-400 text-xs mt-0.5">
              Each check-in increases your target by 1%. Missed days decrease by 0.5%.
            </Text>
          </View>
        </View>

        {/* Submit */}
        <Button title="Create Habit" onPress={handleSubmit} className="w-full" />
      </ScrollView>

      {/* Icon picker bottom sheet */}
      <Modal
        visible={iconPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIconPickerOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => { setIconPickerOpen(false); setIconSearch(''); }}
        >
          <Pressable
            className="bg-sand-50 rounded-t-3xl pt-6 px-6"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <View className="items-center mb-4">
              <View className="w-10 h-1 rounded-full bg-sand-300" />
            </View>
            <Text className="text-charcoal-900 text-lg font-bold mb-4 text-center">
              Choose an Icon
            </Text>
            <TextInput
              value={iconSearch}
              onChangeText={setIconSearch}
              placeholder="Search icons..."
              placeholderTextColor="#ABABAB"
              className="bg-sand-100 rounded-xl px-4 py-3 text-charcoal-900 text-sm border border-sand-200 mb-4"
            />
            <View className="flex-row flex-wrap justify-center">
              {filteredIcons.map((option) => {
                const isSelected = selectedIcon === option.name;
                return (
                  <Pressable
                    key={option.name}
                    onPress={() => {
                      setSelectedIcon(option.name);
                      setIconPickerOpen(false);
                      setIconSearch('');
                    }}
                    className="items-center m-2"
                  >
                    <View
                      className={`w-14 h-14 rounded-2xl items-center justify-center ${
                        isSelected ? 'border-2 border-sage-400' : 'border border-sand-200'
                      }`}
                      style={{ backgroundColor: isSelected ? colorMeta.bg : '#FBF7F1' }}
                    >
                      <FontAwesome
                        name={option.name}
                        size={22}
                        color={isSelected ? colorMeta.fg : '#7F7F7F'}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
