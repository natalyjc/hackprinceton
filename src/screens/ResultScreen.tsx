import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useScanStore } from '../store/useScanStore';

export default function ResultScreen() {
  const router = useRouter();
  const { currentResult, saveResult, clearScan, history, updateRoomName } = useScanStore();
  const [roomName, setRoomName] = useState(currentResult?.roomName || '');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (!currentResult) {
      router.replace('/');
    }
  }, [currentResult]);

  if (!currentResult) {
    return (
      <View style={styles.container}>
        <Text>No result available</Text>
      </View>
    );
  }

  const handleSave = async () => {
    await saveResult(roomName || undefined);
    Alert.alert('Saved', 'Scan result has been saved to history.');
  };

  const handleRescan = () => {
    clearScan();
    router.replace('/');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Score Display */}
      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>Room Light Score</Text>
        <View
          style={[
            styles.scoreCircle,
            { borderColor: getScoreColor(currentResult.scores.overall) },
          ]}
        >
          <Text
            style={[
              styles.scoreValue,
              { color: getScoreColor(currentResult.scores.overall) },
            ]}
          >
            {currentResult.scores.overall}
          </Text>
        </View>
        <Text style={styles.scoreDescription}>
          {getScoreLabel(currentResult.scores.overall)}
        </Text>
        <View style={styles.subScores}>
          <View style={styles.subScore}>
            <Text style={styles.subScoreLabel}>Comfort</Text>
            <Text style={styles.subScoreValue}>
              {currentResult.scores.comfort}
            </Text>
          </View>
          <View style={styles.subScore}>
            <Text style={styles.subScoreLabel}>Circadian</Text>
            <Text style={styles.subScoreValue}>
              {currentResult.scores.circadian}
            </Text>
          </View>
        </View>
      </View>

      {/* Room Name */}
      <View style={styles.nameSection}>
        {isEditingName ? (
          <TextInput
            style={styles.nameInput}
            value={roomName}
            onChangeText={setRoomName}
            placeholder="Room name (optional)"
            onSubmitEditing={() => setIsEditingName(false)}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditingName(true)}>
            <Text style={styles.nameText}>
              {roomName || 'Tap to name this room'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights</Text>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Brightness:</Text>
          <Text style={styles.insightValue}>
            {currentResult.brightness.median.toFixed(0)} (Uniformity:{' '}
            {currentResult.brightness.uniformityScore.toFixed(0)})
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Warmth:</Text>
          <Text style={styles.insightValue}>
            {currentResult.warmth.charAt(0).toUpperCase() +
              currentResult.warmth.slice(1)}
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Daylight:</Text>
          <Text style={styles.insightValue}>
            {currentResult.daylight.charAt(0).toUpperCase() +
              currentResult.daylight.slice(1)}
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Flicker:</Text>
          <Text style={styles.insightValue}>
            {currentResult.flicker.charAt(0).toUpperCase() +
              currentResult.flicker.slice(1)}
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>Coverage:</Text>
          <Text style={styles.insightValue}>
            {currentResult.coverageDeg.toFixed(0)}°
          </Text>
        </View>
      </View>

      {/* Fixes */}
      {currentResult.fixes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {currentResult.fixes.map((fix, index) => (
            <View key={index} style={styles.fixItem}>
              <Text style={styles.fixBullet}>•</Text>
              <Text style={styles.fixText}>{fix}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rescanButton} onPress={handleRescan}>
          <Text style={styles.rescanButtonText}>Rescan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  scoreSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreDescription: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  subScores: {
    flexDirection: 'row',
    gap: 40,
  },
  subScore: {
    alignItems: 'center',
  },
  subScoreLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  subScoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  nameSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    paddingVertical: 5,
  },
  nameText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  insightLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  insightValue: {
    fontSize: 16,
    color: '#333',
  },
  fixItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  fixBullet: {
    fontSize: 20,
    color: '#007AFF',
    marginRight: 10,
    marginTop: -2,
  },
  fixText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rescanButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  rescanButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

