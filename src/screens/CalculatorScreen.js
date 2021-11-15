import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {useState} from 'react';

export default function CalculatorScreen() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [ 
      1, 2, '-', '+', 
      3, 4, '/', '*', 
      5, 6, '%','=', 
      7, 8, 9, 0
    ]

  function calculator() {
    
    let history = currentNumber[currentNumber.length-1];
    
    if(history === '-' || history === '+' || history === '/' || history === '*' || history === '%') {
      setCurrentNumber(currentNumber)
      return
    }
    else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result)
      return
    }
  }

  function handleInput(buttonPressed) {
    if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      setCurrentNumber(currentNumber + buttonPressed)
      return
    }
    else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 ) {
    }
    switch(buttonPressed) {
      case '=':
        setLastNumber(currentNumber + '=')
        calculator()
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  return(
    <View style={{backgroundColor: "#FFA0A0", paddingHorizontal: 16, height: "100%"}}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFA0A0" translucent = {true}/>
      <Text style={{marginTop: 10, marginLeft: 15, fontSize: 18, color: "white", fontWeight: "bold"}}>Display</Text>
      <TouchableOpacity onPress={() => (setCurrentNumber(""),setLastNumber(""))} style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '+' || button === '*' || button === '=' || button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? '#FF5757' : '#930707', marginRight: 0}]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === '-' || button === '/' || button === '%' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#930707'}]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={styles.button} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  results: {
    backgroundColor: '#f5f5f5',
    maxWidth: '100%',
    minHeight: '20%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 8,
    marginTop: 10
  },
  resultText: {
    maxHeight: 45,
    color: '#00b9d6',
    margin: 15,
    fontSize: 35,
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  themeButton: {
    alignSelf: 'flex-start',
    bottom: '5%',
    margin: 15,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttons: {
    marginTop: 25,
    width: '100%',
    height: '45%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: "#FF5757",
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '17%',
    minHeight: '30%',
    flex: 1,
    borderRadius: 7,
    marginBottom: 10,
    marginRight: 15
  },
  textButton: {
    color:'white',
    fontSize: 28,
    fontWeight: 'bold'
  }
})