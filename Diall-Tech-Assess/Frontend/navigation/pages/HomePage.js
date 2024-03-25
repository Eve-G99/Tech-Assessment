import * as React from 'react';
import { Text, View } from 'react-native';

export default function HomePage({navigation}){
    return(
      <View style={{ flex: 1, alighItems:'center', justifyContent:'center'}}>
        <Text
            onPress={() => navigation.navigate('Home')}
            style= {{ fontSize:26, fontWeight:'bold'}}>   Home Page</Text>
      </View>
    )
}