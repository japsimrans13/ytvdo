/**
 * Extracts the YouTube video ID from a URL
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The video ID or null if not found
 */
export const getVideoId = (url) => {
  const regex = /(?:\?v=|\/embed\/|\/watch\?v=|\/\w+\/\w+\/|youtu\.be\/|\/v\/|^v=)([^#\&\?\n/<>]*)/;
  const match = url.match(regex);
  return match && match[1].length === 11 ? match[1] : null;
};

/**
 * Fetches video information from YouTube
 * Note: In a real app, this would call your backend API
 * as direct YouTube API calls require API keys
 * 
 * @param {string} videoId - The YouTube video ID
 * @returns {Promise<Object>} - Promise resolving to video info
 */
export const getVideoInfo = async (videoId) => {
  // In a real app, this would be an API call to your backend
  // which would use YouTube Data API or a third-party service
  
  // For demo purposes, simulate API call with timeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Hardcoded responses for demo videos
      if (videoId === 'dQw4w9WgXcQ') {
        resolve({
          id: 'dQw4w9WgXcQ',
          title: 'Rick Astley - Never Gonna Give You Up',
          description: 'The official video for "Never Gonna Give You Up"',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          channelTitle: 'Rick Astley',
          duration: '3:33',
          downloadUrl: 'https://example.com/download/dQw4w9WgXcQ', // Not a real URL
        });
      } else {
        // Generate mock data for any other video ID
        resolve({
          id: videoId,
          title: `Video ${videoId.substring(0, 6)}`,
          description: 'Video description would appear here',
          thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          channelTitle: 'YouTube Channel',
          duration: '5:23',
          downloadUrl: `https://example.com/download/${videoId}`, // Not a real URL
        });
      }
    }, 1000);
  });
};

/**
 * In a real app, we would implement this function to call 
 * our backend service that handles YouTube downloads
 */
export const downloadVideo = async (videoId, progressCallback) => {
  // This would be implemented with a real API service
  throw new Error('Not implemented in demo');
};
