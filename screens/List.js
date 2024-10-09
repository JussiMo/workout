import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

const List = ({ route }) => {
  // Ottaa workout tiedot vastaan
  const { newWorkout } = route.params || { newWorkout: null };

  // Array jossa kaikki workoutit
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // Eritellyt workoutit
  const [runWorkouts, setRunWorkouts] = useState([]);
  const [bikeWorkouts, setBikeWorkouts] = useState([]);
  const [swimWorkouts, setSwimWorkouts] = useState([]);

  // Jos ottaa vastaan uuden workoutin, lisää sen historyyn
  useEffect(() => {
    if (newWorkout) {
      setWorkoutHistory(prevHistory => [...prevHistory, newWorkout]);
      categorizeWorkout(newWorkout); // kutsuu kans tämän funktion
    }
  }, [newWorkout]);

  // tämän kutsuu edellinen efekti
  const categorizeWorkout = (workout) => {
    const { name, distance } = workout;

    // varmistaa että distance on numero
    const distanceValue = parseFloat(distance);

    if (name === 'Run') {
      setRunWorkouts(prev => [...prev, distanceValue]);
    } else if (name === 'Cycle') {
      setBikeWorkouts(prev => [...prev, distanceValue]);
    } else if (name === 'Swim') {
      setSwimWorkouts(prev => [...prev, distanceValue]);
    }
  };

  // ikonit workouteille
  const workoutIcons = {
    Run: 'run',
    Cycle: 'bike',
    Swim: 'swim',
  };

  // tekkee workoutit näkyviin
  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutBox}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={workoutIcons[item.name]} size={30} color="#72BF78" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.workoutDetail}>Distance: {item.distance}</Text>
        <Text style={styles.workoutDetail}>Time: {item.time} mins</Text>
        <Text style={styles.workoutDetail}>Date: {item.date}</Text>
      </View>
    </View>
  );

  // laskee kokosummat eri workouteille
  const runSum = runWorkouts.reduce((acc, curr) => acc + curr, 0);
  const bikeSum = bikeWorkouts.reduce((acc, curr) => acc + curr, 0);
  const swimSum = swimWorkouts.reduce((acc, curr) => acc + curr, 0);

  return (
    <View style={styles.container}>
      
      {/* Kokonaismäärät */}
      <View style={styles.summaryContainer}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={workoutIcons.Run} size={30} color="#72BF78" />
          <Text style={styles.iconText}>{runSum}</Text>
        </View>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={workoutIcons.Cycle} size={30} color="#72BF78" />
          <Text style={styles.iconText}>{bikeSum}</Text>
        </View>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={workoutIcons.Swim} size={30} color="#72BF78" />
          <Text style={styles.iconText}>{swimSum}</Text>
        </View>
      </View>

      {/* listaa workoutit sitä mukaa kun niitä tekee */}
      <FlatList
        data={workoutHistory}
        renderItem={renderWorkoutItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default List;
