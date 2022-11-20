import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

let cronometro = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App(){

  const [numero,setNumero] = useState(0);
  const [botao,setBotao] = useState('INICIAR');
  const [ultimo,setUltimo] = useState(null);

  function start(){

    if(cronometro != null){
      clearInterval(cronometro);
      timer = null;

      setBotao('INICIAR')
    } else {
      cronometro = setInterval(() => {
        ss++;

        if(ss == 60){
          ss = 0;
          mm++;
        }

        if(mm == 60){
          mm = 0;
          hh++;
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

        setNumero(format);

      }, 100);

      setBotao('PARAR')
    }
  }

  function finish(){

    if(cronometro != null){
      clearInterval(cronometro);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('INICIAR');
  }

  return(
    <View style={styles.container}>

      <Image source={require('./src/crono.png')}/>
    
      <Text style={styles.timer}>{numero}</Text>

      <View style={styles.btnArea}>

        <TouchableOpacity style={styles.btn} onPress={ start }>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={ finish }>
          <Text style={styles.btnTexto}> LIMPAR </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.areaFinal}>
        <Text style={styles.tempo}>{
          ultimo ? 'Tempo: ' + ultimo : ''
        }</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeeF'
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    width: 330,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  areaFinal: {
    marginTop: 40
  },
  tempo: {
    fontSize: 22,
    color: '#fff',
    fontStyle: 'italic'
  }
})