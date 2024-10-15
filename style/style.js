import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0D683',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
  workoutList: {
    paddingVertical: 10,
  },
  workoutButton: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    height: 50,
    width: 95,
  },
  dateButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#72BF78',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  switchText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  workoutBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    width: 250,
   },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  switchText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
  },
  iconBox: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 16,
  },
  switchContainer: {  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
    marginTop: '50%',
  },
  buttonContainer: {
    width: '50%',
    marginTop: 20,
    marginLeft: '25%',
    justifyContent: 'center',
  },
});
