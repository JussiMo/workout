import React, { useState } from 'react';
import { View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

const Workout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const isKm = route.params?.isKm ?? true;
  const setIsKm = route.params?.setIsKm || (() => {});
  
  const { colors } = useTheme();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [distance, setDistance] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const workouts = [
    { id: '1', name: 'Run', icon: 'run' },
    { id: '2', name: 'Cycle', icon: 'bike' },
    { id: '3', name: 'Swim', icon: 'swim' },
  ];

  const handleSubmit = () => {
    const selectedWorkout = workouts.find(workout => workout.id === selectedWorkoutId);

    if (!selectedWorkout || !distance || !timeTaken) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const workoutDetails = {
      name: selectedWorkout.name,
      distance: isKm ? `${distance} km` : `${distance} miles`,
      time: timeTaken,
      date: date.toLocaleDateString(),
    };

    navigation.navigate('List of workouts', { newWorkout: workoutDetails });

    setSelectedWorkoutId(null);
    setDistance('');
    setTimeTaken('');
    setDate(new Date());
    setShowDatePicker(false);
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.workoutButton,
        { backgroundColor: selectedWorkoutId === item.id ? colors.primary : colors.surface },
      ]}
      onPress={() => setSelectedWorkoutId(item.id)}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color={selectedWorkoutId === item.id ? 'white' : colors.text} />
      <Text style={{ color: selectedWorkoutId === item.id ? 'white' : colors.text, marginLeft: 8 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Workout</Text>
      <FlatList
        data={workouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.workoutList}
      />

      <TextInput
        label={`Distance (${isKm ? 'km' : 'miles'})`}
        placeholder={`Distance in ${isKm ? 'km' : 'miles'}`}
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Time Taken (mins)"
        placeholder="Minutes taken"
        value={timeTaken}
        onChangeText={setTimeTaken}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit Workout
      </Button>
    </View>
  );
};

export default Workout;
