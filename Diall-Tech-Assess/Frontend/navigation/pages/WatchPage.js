import * as React from 'react';
import { View, StyleSheet, FlatList, Dimensions, Share, Button} from 'react-native';
import VideoItem from './VideoItem'

export default function WatchPage({ route, navigation }) {
    const videoData = [
        {
            url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
            username: '@Alex',
            title: 'Bunny Video'
        },
        {
            url: 'https://file-examples.com/storage/fe7bb0e37864d66f29c40ee/2017/04/file_example_MP4_480_1_5MG.mp4',
            username: '@Ben',
            title: 'Earth Video'
        },
        {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            username: '@Carol',
            title: 'Joy Rides'
        },
        {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            username: 'For Scroll',
            title: 'Sample'
        },
    ];

    const [activeIndex, setActiveIndex] = React.useState(0);

    const viewabilityConfig = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 50
    };

    const renderItem = ({ item, index }) => <VideoItem videoData={item} index={index} isActive={index === activeIndex} />;

    const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
        const currentIndex = viewableItems[0]?.index;

        if (currentIndex === videoData.length-1) {
            // When the last video is viewed, scroll back to the top
            setActiveIndex(0);
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            }, 0);
        } else {
            setActiveIndex(currentIndex);
        }
    }).current;

    const flatListRef = React.useRef(null);

    const onScrollBeginDrag = (event) => {
        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
        if(direction == 'up'){
            console.log("scroll up")
        }
        // console.log(event)
    }

  return (
    <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <FlatList
            ref={flatListRef}
            data={videoData}
            renderItem={renderItem}
            pagingEnabled
            keyExtractor={item => item.url}
            decelerationRate={'fast'}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            initialNumToRender={1}
            // onScrollBeginDrag={onScrollBeginDrag}
        />
    </View>
  );
}