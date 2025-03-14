import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoCard = ({ video, onDelete, onPlay }) => {
  const formattedDate = new Date(video.downloadDate).toLocaleDateString();

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={onPlay}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
          <Text style={styles.channel}>{video.channelTitle}</Text>
          <Text style={styles.date}>Downloaded on {formattedDate}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={onPlay}>
          <Ionicons name="play-circle" size={24} color="#4CAF50" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={22} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  channel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  controls: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
  },
  controlButton: {
    padding: 8,
    marginLeft: 16,
  },
});

export default VideoCard;
