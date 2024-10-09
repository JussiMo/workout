import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style/style';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout app!</Text>
      <Image source={require('../assets/workout.png')} style={styles.image} />
    </View>
  );
};

export default Home;
