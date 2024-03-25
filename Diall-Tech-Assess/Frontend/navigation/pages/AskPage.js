import * as React from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from 'react-native-vector-icons';
import {firebase} from './firebase'

  export default function AskPage({ navigation }) {
    const [hasPermission, setHasPermission] = React.useState(null);
    const cameraRef = React.useRef(null);
    const [isRecording, setIsRecording] = React.useState(false);
    const [showInfoModal, setShowInfoModal] = React.useState(false);
    const [videoURI, setVideoURI] = React.useState("");
    const [title, setTitle] = React.useState('');
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.front);
    const [secondsElapsed, setSecondsElapsed] = React.useState(0);


    const handleRecord = async () => {
      if (cameraRef.current) {
        if (!isRecording) {
          setIsRecording(true);
          setSecondsElapsed(0);
          const interval = setInterval(() => {
            setSecondsElapsed(prev => prev + 1);
       }, 1000);
          const video = await cameraRef.current.recordAsync({
            maxDuration: 15,
          });
          clearInterval(interval);
          setIsRecording(false);
          setVideoURI(video.uri)
          console.log(video.uri);
          
        } else {
          cameraRef.current.stopRecording();
        }
      }
    };

    React.useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
  
        setHasPermission(cameraPermission.status === 'granted' && microphonePermission.status === 'granted');
      })();
    }, []);

    const deleteRecording = () => {
      setVideoURI("");
      setTitle('');
    };

    const toggleCameraType = () => {
      setCameraType(
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    };
  
    const onSendPress = async () => {
      const filename = `testUser-${title}-${Date.now()}.mov`; // Change the extension if it's not a .mov file
      const storageRef = firebase.storage().ref().child((`UserVideo/${filename}`));
    
      // Convert the file into a blob
      const response = await fetch(videoURI);
      const blob = await response.blob();
    
      return new Promise((resolve, reject) => {
        storageRef.put(blob).on(
          "state_changed",
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          error => {
            reject(error);
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            // Send finished.
            // Navigate + play with the return url
            console.log(url)
            resolve(url)
            navigation.navigate('Watch', 
              {
                url: url,
                username: 'testUser',
                title: title,
              }
            )
          },
        );
      });   
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1, width: '100%' }} type={cameraType} ref={cameraRef}>

          {isRecording && (
            <Text style={{ position: 'absolute', bottom: 50, left: 20, color: 'white' }}>
              {15 - secondsElapsed} sec
            </Text>
          )}

          <TouchableOpacity style={{ position: 'absolute', top: 15, right:15, zIndex: 2, }} onPress={toggleCameraType}>
          <Text style={{ fontSize: 18, color: 'white' }}>Flip</Text>
          </TouchableOpacity>

          {/* Info Icon */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setShowInfoModal(true)}>
              <Ionicons name="information-circle-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
  
          {/* Info Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showInfoModal}
            onRequestClose={() => {
              setShowInfoModal(false);
            }}
          >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setShowInfoModal(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>This is not a substitute for diagnosis or treatment, but if you have a question, you can ask a therapist.If you're in crisis, please call 988.</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </Camera>
      
      {videoURI.length != 0 && (
          <TouchableOpacity style={styles.deleteButton} onPress={deleteRecording}>
            <Text>X</Text>
          </TouchableOpacity>
          )}

      {videoURI.length != 0 && (
        <View style={styles.bottomContainer}>
          <TextInput 
            style={styles.titleInput} 
            placeholder="Enter Title" 
            value={title} 
            onChangeText={setTitle} 
            maxLength={40} 
          />
          <Button 
            title="Send"
            onPress={onSendPress}
            disabled={!title}
          />
        </View>
      )}

      <Button 
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={handleRecord}
      />
      </View>
  );
}
    const styles = StyleSheet.create({
      iconContainer: {
        position: 'absolute',
        right: 15,
        top: 45,
        zIndex: 2,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
      },
      modalText: {
        textAlign: 'center',
        lineHeight: 24,
      },
      deleteButton: {
        position: 'absolute',
        left: 15,
        top: 45,
        zIndex: 2,
      },
      bottomContainer: {
        padding: 10,
        alignItems: 'center',
      },
      titleInput: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
    });