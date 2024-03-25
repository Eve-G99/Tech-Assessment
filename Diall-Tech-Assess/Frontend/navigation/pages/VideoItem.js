import * as React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: 340,
        height: 680,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pausedOverlay: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
  });

  const shareTheVideo = () => {
    const linkToShare = 'https://www.diallapp.com/';
 
    Share.share({
      title: 'Share this Video!',
      message: `I think you would love Diall. Here is an invite to get the app! Check out this link: ${linkToShare}`,
      // url: linkToShare
    });
  };

export default function VideoItem({videoData, index, isActive}) {
    const videoRef = React.useRef(null);
    const [isPaused, setIsPaused] = React.useState(!isActive);
    
    React.useEffect(() => {
        async function controlVideoPlayback() {
          if (videoRef.current) {
            if (isActive) {
              await videoRef.current.playAsync();
              setIsPaused(false);
            } else {
              await videoRef.current.pauseAsync();
              setIsPaused(true);
            }
          }
        }
        controlVideoPlayback();
      }, [isActive]);

    const handleVideoPress = async () => {
        if (videoRef.current) {
            if (isPaused) {
                await videoRef.current.playAsync();
            } else {
                await videoRef.current.pauseAsync();
            }
            setIsPaused(!isPaused);
        }
    };
    return (
        <View style={[{ flex: 1, height: Dimensions.get('window').height - 170, backgroundColor: 'rgba(52, 52, 52, 0.8)'}]}>
            <TouchableOpacity onPress={handleVideoPress} style={{ flex: 1 }}>
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{ uri: videoData.url }}
                    useNativeControls={isPaused}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={isActive}
                    isLooping
                />
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{videoData.username}</Text>
                    <Text style={{ color: 'white', fontSize: 14 }}>{videoData.title}</Text>
                </View>
                {/* <Button
                    title="Share"
                    style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'white' }}
                    onPress={shareTheVideo}
                /> */}
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 10, right: 15, zIndex: 2, backgroundColor: 'red', padding: 10  }}
                    onPress={shareTheVideo}
                >
                    <Text style={{color:'white'}}> Share </Text>
                </TouchableOpacity>
                {isPaused && (
                    <View style={styles.pausedOverlay}>
                        <Ionicons name="pause-outline" size={30} color="white"/>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}