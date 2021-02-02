import React,{Component} from 'react';
import { StyleSheet ,View , Image} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";


export default class Loader extends Component {
    render() {
      return (
        <View style={styles.lottiew}>
            <Image
            style={{width: '60%', height: 50,marginTop:'auto',marginBottom:'auto'}}
            source={{uri: 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}}
    />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    lottiew: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      flex: 1,
      backgroundColor:'white',
      alignItems:'center'
    }
  });