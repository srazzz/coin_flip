import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function App() {
  const [result, setResult] = useState('Tap to flip!');
  const [animation] = useState(new Animated.Value(0));

  const flipCoin = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Generate random result
    setTimeout(() => {
      const random = Math.random();
      setResult(random < 0.5 ? 'Heads' : 'Tails');
    }, 300);
  };

  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Flip Game</Text>
      <Animated.View
        style={[
          styles.coin,
          {
            transform: [{ rotateY: spin }],
          },
        ]}
      >
        <Text style={styles.result}>{result}</Text>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={flipCoin}>
        <Text style={styles.buttonText}>Flip Coin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  coin: {
    width: 150,
    height: 150,
    backgroundColor: '#FFD700',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#DAA520',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 