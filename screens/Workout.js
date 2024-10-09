import React, { useState } from 'react';
import { View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Switch, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

const Workout = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [distance, setDistance] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isKm, setIsKm] = useState(true);

  const workouts = [
    { id: '1', name: 'Run', icon: 'run' },
    { id: '2', name: 'Cycle', icon: 'bike' },
    { id: '3', name: 'Swim', icon: 'swim' },
  ];

  // Lähettää tiedot listalle
  const handleSubmit = () => {
    const selectedWorkout = workouts.find(workout => workout.id === selectedWorkoutId);

    // tarkistaa onko kaikki kentät täytetty
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

    // Lähettää käyttäjän syöttämät tiedot listalle
    navigation.navigate('List of workouts', { newWorkout: workoutDetails });

    // Resettaa inputit lähetyksen jälkeen
    setSelectedWorkoutId(null);  
    setDistance('');
    setTimeTaken('');
    setDate(new Date());
    setShowDatePicker(false);
    setIsKm(true);
  };

  // Tuo workout valinnat näkyviin
  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.workoutButton,
        {
          backgroundColor: selectedWorkoutId === item.id ? colors.primary : colors.surface,
        },
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

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Miles</Text>
        <Switch value={isKm} onValueChange={() => setIsKm(previousState => !previousState)} />
        <Text style={styles.switchText}>Kilometers</Text>
      </View>

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
