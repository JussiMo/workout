import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/style';

const Settings = () => {
  const [isKm, setIsKm] = useState(true);
  const navigation = useNavigation();

  const goToWorkout = () => {
    navigation.navigate('Workout', { isKm, setIsKm });
  };

  return (
    <>
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>Miles</Text>
      <Switch value={isKm} onValueChange={() => setIsKm((prev) => !prev)} />
      <Text style={styles.switchText}>Kilometers</Text>
      </View>
    <View style={styles.buttonContainer}>
      <Button title="Save and go to Workout" onPress={goToWorkout} />
    </View>
    </>

  );
};

export default Settings;
