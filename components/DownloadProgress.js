import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DownloadProgress = ({ progress }) => {
  const percentage = Math.round(progress * 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
});

export default DownloadProgress;
