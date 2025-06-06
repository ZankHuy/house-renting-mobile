import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  const teamMembers = [
    {
      name: 'Nguyễn Quang Anh',
      email: 'anh.nq213564@sis.hust.edu.vn',
      id: '20213564',
    },
    {
      name: 'Nguyễn Danh Huy',
      email: 'huy.nd213571@sis.hust.edu.vn',
      id: '20213571',
    },
    {
      name: 'Nguyễn Đỗ Hoàng Minh',
      email: 'minh.ndh210591@sis.hust.edu.vn',
      id: '20210591',
    },
    {
      name: 'Nguyễn Hữu Phong',
      email: 'phong.nh210668@sis.hust.edu.vn',
      id: '20210668',
    },
  ];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.title}>
            About Us
          </ThemedText>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          <Text style={styles.description}>
            We are <Text style={styles.highlight}>Group 6</Text> from the Web and App Programming course at{' '}
            <Text style={styles.highlight}>HUST</Text>. Meet our team:
          </Text>

          {/* Team Members */}
          <View style={styles.teamSection}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.memberCard}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberEmail}>{member.email}</Text>
                </View>
                <Text style={styles.memberId}>{member.id}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2dd4bf',
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  highlight: {
    fontWeight: '600',
    color: '#333',
  },
  teamSection: {
    marginBottom: 40,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 14,
    color: '#2dd4bf',
  },
  memberId: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
}); 