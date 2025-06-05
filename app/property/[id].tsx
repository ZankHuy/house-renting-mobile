import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Linking,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getPostById } from '@/services/api';
import type { Property } from '@/services/api';

const { width: screenWidth } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const loadProperty = useCallback(async () => {
    try {
      setLoading(true);
      const propertyData = await getPostById(id as string);
      setProperty(propertyData);
    } catch (error) {
      console.error('Error loading property:', error);
      Alert.alert('Error', 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProperty();
  }, [loadProperty]);

  const handleCall = () => {
    const phoneNumber = '0386690123'; // Default phone number from web
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      Alert.alert('Empty Comment', 'Please write a comment before submitting.');
      return;
    }

    setSubmittingComment(true);
    try {
      // Simulate API call for comment submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Comment Submitted', 'Thank you for your comment!');
      setComment('');
    } catch {
      Alert.alert('Error', 'Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.centerContent, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading property details...</Text>
      </ThemedView>
    );
  }

  if (!property) {
    return (
      <ThemedView style={[styles.container, styles.centerContent, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>Property not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const images = property.images?.length > 0 ? property.images : [{ baseUrl: 'https://via.placeholder.com/400x300' }];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBackButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property Details</Text>
        </View>

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentImageIndex(index);
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: `http://192.168.1.101:3000${image.baseUrl}` }}
                style={styles.propertyImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Image pagination dots */}
          {images.length > 1 && (
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentImageIndex === index && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Property Information */}
        <View style={styles.contentContainer}>
          {/* Title and Address */}
          <View style={styles.titleSection}>
            <ThemedText type="title" style={styles.propertyTitle}>
              {property.address}
            </ThemedText>
            <Text style={styles.propertyType}>
              {property.category?.name || property.type}, street-facing house
            </Text>
          </View>

          {/* Price and Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${property.price.toLocaleString()} / month</Text>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{property.bedrooms}</Text>
                <Text style={styles.statLabel}>Bedrooms</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{property.area}</Text>
                <Text style={styles.statLabel}>Area (m²)</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statusAvailable}>Available</Text>
                <Text style={styles.statLabel}>Status</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {property.content || `A cozy property in the heart of ${property.city}, close to local markets.`}
            </Text>
          </View>

          {/* Contact Owner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Owner</Text>
            <Text style={styles.contactSubtitle}>
              Reach out to the property owner directly for inquiries.
            </Text>
            
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.callButtonText}>Call: 0386690123</Text>
            </TouchableOpacity>
          </View>

          {/* Map Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="location" size={48} color="#007AFF" />
              <Text style={styles.mapText}>{property.address}</Text>
              <Text style={styles.mapSubtext}>{property.city}, {property.state}</Text>
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => {
                  const query = encodeURIComponent(`${property.address}, ${property.city}`);
                  Linking.openURL(`https://maps.google.com/maps?q=${query}`);
                }}
              >
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments & Ratings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comments & Ratings</Text>
            
            {/* Star Rating Display */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star-outline"
                  size={24}
                  color="#ddd"
                  style={styles.star}
                />
              ))}
            </View>

            {/* Comment Input */}
            <TextInput
              style={styles.commentInput}
              placeholder="Write your comment here..."
              placeholderTextColor="#999"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!submittingComment}
            />

            <TouchableOpacity
              style={[styles.submitCommentButton, submittingComment && styles.buttonDisabled]}
              onPress={handleSubmitComment}
              disabled={submittingComment || !comment.trim()}
            >
              {submittingComment ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitCommentButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerBackButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  propertyImage: {
    width: screenWidth,
    height: 300,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  propertyType: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priceContainer: {
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#20c997',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusAvailable: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    backgroundColor: '#d4edda',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  callButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mapPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  mapButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 4,
  },
  star: {
    marginRight: 4,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 100,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  submitCommentButton: {
    backgroundColor: '#20c997',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitCommentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 