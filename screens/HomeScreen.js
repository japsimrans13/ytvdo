import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { getVideoId, getVideoInfo } from '../utils/youtube';
import DownloadProgress from '../components/DownloadProgress';

const HomeScreen = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUrlSubmit = async () => {
    if (!url) {
      Alert.alert('Error', 'Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    try {
      const videoId = getVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const info = await getVideoInfo(videoId);
      setVideoInfo(info);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to get video info');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo) return;

    setDownloading(true);
    setProgress(0);

    try {
      const { title, id } = videoInfo;
      const fileUri = `${FileSystem.documentDirectory}videos/${id}.mp4`;
      
      // Create directory if it doesn't exist
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}videos`);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos`, { intermediates: true });
      }
      
      // In a real app, this would call your backend service
      // Here we're simulating download progress
      const downloadResumable = FileSystem.createDownloadResumable(
        videoInfo.downloadUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          setProgress(progress);
        }
      );

      // Simulate download since we don't have a real backend
      simulateDownload();
      
    } catch (error) {
      Alert.alert('Download Error', error.message);
      setDownloading(false);
    }
  };

  const simulateDownload = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 0.05;
      setProgress(Math.min(currentProgress, 1));
      
      if (currentProgress >= 1) {
        clearInterval(interval);
        setDownloading(false);
        
        // Save video info to local storage
        saveVideoToLibrary();
        
        Alert.alert('Success', 'Video downloaded successfully!');
      }
    }, 500);
  };

  const saveVideoToLibrary = async () => {
    // In a real app, you'd save this to AsyncStorage or another persistent storage
    console.log('Video saved to library:', videoInfo.title);
  };

  const clearForm = () => {
    setUrl('');
    setVideoInfo(null);
    setProgress(0);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>YouTube Video Downloader</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter YouTube URL"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={[styles.button, styles.searchButton]} 
            onPress={handleUrlSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Get Video</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#ff0000" />}

        {videoInfo && (
          <View style={styles.videoInfoContainer}>
            <Image
              source={{ uri: videoInfo.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <Text style={styles.videoTitle}>{videoInfo.title}</Text>
            <Text style={styles.channelTitle}>By {videoInfo.channelTitle}</Text>
            
            <DownloadProgress progress={progress} />
            
            {!downloading ? (
              <TouchableOpacity 
                style={[styles.button, styles.downloadButton]} 
                onPress={handleDownload}
              >
                <Text style={styles.buttonText}>Download Video</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.downloadingText}>Downloading... {Math.round(progress * 100)}%</Text>
            )}
            
            <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff0000',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginRight: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  searchButton: {
    backgroundColor: '#ff0000',
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    marginVertical: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  videoInfoContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  channelTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  downloadingText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    margin: 10,
  },
  clearButton: {
    marginTop: 10,
    padding: 10,
  },
  clearButtonText: {
    color: '#ff0000',
  },
});

export default HomeScreen;
