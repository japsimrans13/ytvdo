import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

// Add an error boundary class component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, info) {
    console.log("Error in application:", error);
    console.log("Component stack:", info.componentStack);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Something went wrong!
          </Text>
          <Text style={{ color: 'red' }}>
            {this.state.error?.toString()}
          </Text>
        </View>
      );
    }
    
    return this.props.children;
  }
}

export default function App(props) {
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        {props.children}
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
