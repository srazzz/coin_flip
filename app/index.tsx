import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function Home() {
  const [result, setResult] = useState('Choose a side!');
  const [userChoice, setUserChoice] = useState(null);
  const [gameState, setGameState] = useState('choosing');
  const [score, setScore] = useState(0);
  const [animation] = useState(new Animated.Value(0));

  const resetGame = () => {
    setGameState('choosing');
    setUserChoice(null);
    setResult('Choose a side!');
    animation.setValue(0);
  };

  const chooseSide = (choice) => {
    setUserChoice(choice);
    setResult('Flip the coin!');
    setGameState('flipping');
  };

  const flipCoin = () => {
    if (!userChoice) return;

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

    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
      const didWin = userChoice === coinResult;
      
      setResult(`${coinResult}! You ${didWin ? 'Won! 🎉' : 'Lost 😢'}`);
      setScore(prev => prev + (didWin ? 1 : 0));
      setGameState('result');
    }, 300);
  };

  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Flip Game</Text>
      <Text style={styles.score}>Score: {score}</Text>
      
      <Animated.View
        style={[
          styles.coin,
          {
            transform: [{ rotateY: spin }],
            backgroundColor: gameState === 'result' 
              ? (result.includes('Won') ? '#90EE90' : '#FFB6C1')
              : '#FFD700',
          },
        ]}
      >
        <Text style={styles.result}>{result}</Text>
      </Animated.View>

      {gameState === 'choosing' && (
        <View style={styles.choiceContainer}>
          <TouchableOpacity 
            style={styles.choiceButton} 
            onPress={() => chooseSide('Heads')}
          >
            <Text style={styles.buttonText}>Choose Heads</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.choiceButton} 
            onPress={() => chooseSide('Tails')}
          >
            <Text style={styles.buttonText}>Choose Tails</Text>
          </TouchableOpacity>
        </View>
      )}

      {gameState === 'flipping' && (
        <TouchableOpacity style={styles.button} onPress={flipCoin}>
          <Text style={styles.buttonText}>Flip Coin</Text>
        </TouchableOpacity>
      )}

      {gameState === 'result' && (
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  coin: {
    width: 150,
    height: 150,
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
    textAlign: 'center',
    padding: 10,
  },
  choiceContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  choiceButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
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