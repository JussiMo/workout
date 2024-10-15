import React, { useState } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/style';

const Settings = () => {
  const [isKm, setIsKm] = useState(true); // Defaulttina kilometrit
  const navigation = useNavigation();

  // Tallentaa kumman mittayksikön käyttäjä on valinnut
  const saveSettings = () => {
    // käyttää navigationia puskemaan uuden asetuksen ja jää nykyiseen näkymään
    navigation.navigate('List of workouts', { isKm })
    navigation.navigate('Workout', { isKm });
    navigation.navigate('Settings')
      ;
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Miles</Text>
        <Switch value={isKm} onValueChange={() => setIsKm((prev) => !prev)} />
        <Text style={styles.switchText}>Kilometers</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveSettings} />
      </View>
    </View>
  );
};

export default Settings;
