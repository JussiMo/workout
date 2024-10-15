import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

const List = ({ route }) => {
  const isKm = route?.params?.isKm ?? true;

  const [workoutHistory, setWorkoutHistory] = useState([]);

  const [runWorkouts, setRunWorkouts] = useState([]);
  const [bikeWorkouts, setBikeWorkouts] = useState([]);
  const [swimWorkouts, setSwimWorkouts] = useState([]);

  const { newWorkout } = route.params || { newWorkout: null };

  //Uusi workout lisätään historiaan ja kategorisoidaan
  useEffect(() => {
    if (newWorkout) {
      setWorkoutHistory((prevHistory) => [...prevHistory, newWorkout]);
      categorizeWorkout(newWorkout);
    }
  }, [newWorkout]);

  // Kategorisoidaan workout tyypin mukaan
  const categorizeWorkout = (workout) => {
    const { name, distance } = workout;

    if (name === 'Run') {
      setRunWorkouts((prev) => [...prev, distance]);
    } else if (name === 'Cycle') {
      setBikeWorkouts((prev) => [...prev, distance]);
    } else if (name === 'Swim') {
      setSwimWorkouts((prev) => [...prev, distance]);
    }
  };

  // Ikonit eri tyypeille
  const workoutIcons = {
    Run: 'run',
    Cycle: 'bike',
    Swim: 'swim',
  };

  // Workouttien renderöinti
  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutBox}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={workoutIcons[item.name]} size={30} color="#72BF78" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.workoutDetail}>
          Distance: {isKm ? item.distance : (item.distance * 0.621371).toFixed(2)} {isKm ? 'km' : 'miles'}
        </Text>
        <Text style={styles.workoutDetail}>Time: {item.time} mins</Text>
        <Text style={styles.workoutDetail}>Date: {item.date}</Text>
      </View>
    </View>
  );

  // Lasketaan yhteismatkat eri workouteille
  const runSum = runWorkouts.reduce((acc, curr) => acc + curr, 0);
  const bikeSum = bikeWorkouts.reduce((acc, curr) => acc + curr, 0);
  const swimSum = swimWorkouts.reduce((acc, curr) => acc + curr, 0);

  // Matkan muuntaminen kilometreiksi tai maileiksi
  const totalDistance = (sum) => (isKm ? sum : (sum * 0.621371).toFixed(2));

  return (

    // Ensiksi yhteenveto
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={workoutIcons.Run} size={30} color="#72BF78" />
          <Text style={styles.iconText}>{totalDistance(runSum)} {isKm ? 'km' : 'm'}</Text>
        </View>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={workoutIcons.Cycle} size={30} color="#72BF78" />
          <Text style={styles.iconText}>{totalDistance(bikeSum)} {isKm ? 'km' : 'm'}</Text>
        </View>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={workoutIcons.Swim} size={30} color="#72BF78" />
          <Text style={styles.iconText}>{totalDistance(swimSum)} {isKm ? 'km' : 'm'}</Text>
        </View>
      </View>
      {/* Sitten itse workoutit */}
      <FlatList
        data={workoutHistory}
        renderItem={renderWorkoutItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default List;
