import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import VideoCard from '../components/VideoCard';

// In a real app, this would be loaded from storage
const mockDownloadedVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    channelTitle: 'Rick Astley',
    downloadDate: new Date().toISOString(),
    fileUri: `${FileSystem.documentDirectory}videos/dQw4w9WgXcQ.mp4`,
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    channelTitle: 'Luis Fonsi',
    downloadDate: new Date().toISOString(),
    fileUri: `${FileSystem.documentDirectory}videos/kJQP7kiw5Fk.mp4`,
  },
];

const LibraryScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd load this from AsyncStorage or a database
    setVideos(mockDownloadedVideos);
    setLoading(false);
  }, []);

  const handleDeleteVideo = (id) => {
    Alert.alert(
      'Delete Video',
      'Are you sure you want to delete this video?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, we'd actually delete the file
            setVideos(videos.filter(video => video.id !== id));
          },
        },
      ]
    );
  };

  const handlePlayVideo = (video) => {
    // In a real app, this would open the video player
    Alert.alert('Playing video', `Now playing: ${video.title}`);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="videocam-off-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>No videos downloaded yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Downloaded Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onDelete={() => handleDeleteVideo(item.id)}
            onPlay={() => handlePlayVideo(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 15,
    color: '#333',
  },
  listContent: {
    padding: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LibraryScreen;
