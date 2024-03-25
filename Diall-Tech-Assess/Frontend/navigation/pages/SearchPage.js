import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, FlatList, Share} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import SelectDropdown from 'react-native-select-dropdown'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
  },
  dropdown: {
    flex: 0.2,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  clearButton: {
    padding: 10,
  },
  prompt: {
    textAlign: 'center',
    color: 'gray',
    marginTop: '10%',
    fontWeight:'bold',
    padding: 20,

  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
});


const type = ["Name", "Key Words"]

export default function SearchPage({navigation}){
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState([]);
    const [selectedType, setSelectedType] = React.useState("Name"); 
    const [isSearched, setIsSearched] = React.useState(false);
    
    const onClearPress = () => {
      setInput("");         
      setIsSearched(false); 
      setResult([]);        
    }

    const onChangeText = async (text) => {
      setInput(text)
    };

    const inviteTherapist = () => {
      const linkToShare = 'https://www.diallapp.com/';
   
      Share.share({
        title: 'Invite Your Therapist',
        message: `I think you would love Diall. Here is an invite to get the app! Check out this link: ${linkToShare}`,
        // url: linkToShare
      });
    };

    const onSearchPress = async () => {
      setIsSearched(true)

      let url;
      if (selectedType === "Name") {
        url = `https://us-central1-diall-assessment-66398.cloudfunctions.net/getTherapistByName?username=${input}`;
      } else if (selectedType === "Key Words") {
        url = `https://us-central1-diall-assessment-66398.cloudfunctions.net/getTherapistByKeywords?keywords=${input}`;
      } else {
        console.log("No type selected or unknown type.");
        return;
      }

      axios.get(url)
      .then(function (response) {
        console.log(response.data);
        setResult(response.data)
        // setLoadingIcon(null)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }

    return(
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SelectDropdown
            style={styles.dropdown}
            data={type}
            defaultValue={"Name"}
            onSelect={(selectedItem, index) => {
              setSelectedType(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={input}
            placeholder="Search for therapist..."
            autoFocus
          />
          <Icon
            name="times"
            size={20}
            onPress={onClearPress}
            style={styles.clearButton}
          />
        </View>
        {!isSearched && (
          <>
            <Text style={styles.prompt}>Type in the search bar to find a therapist that's right for you</Text>
            <Button
              icon={<Icon name="search" size={15} color="white"/>}
              onPress={onSearchPress}
            />
          </>
        )}

        {(result.length !== 0) && (
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Image
                  source={{uri:item.profilepic }}
                  style={styles.resultImage}
                  resizeMode="cover"
                />
                <View style={{ flex: 2, paddingLeft: 10, paddingTop: 15 }}>
                  <Text style={{ fontWeight:'bold'}}>{item.username}</Text>
                  <View style={{flexGrow: 1, flexDirection: 'row'}}>
                    <Text style={{ fontSize: 14, fontStyle: 'italic', marginRight: 10, flex: 1, width: 1}}>
                      {item.specialties.join(",     ")}
                    </Text>
                  </View>
                </View>
                <Button
                  title="Ask"
                  buttonStyle={{ backgroundColor: 'seagreen', width: 60, height: 40}}
                  titleStyle={{ fontSize: 14, fontWeight:'bold' }}
                  onPress={() => navigation.navigate('Ask')}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {((isSearched) && result.length == 0) && (
          <>
            <Text style={styles.prompt}>Don't see your therapist?</Text>
            <Button
              title="Invite your therapist"
              buttonStyle={{ backgroundColor: 'green', marginTop: 10 }}
              titleStyle={{ fontSize: 14, fontWeight:'bold' }}
              onPress={inviteTherapist}
            />
          </>
        )}
      </View>
    )}

