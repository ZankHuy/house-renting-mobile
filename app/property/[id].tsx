import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Property, getPostById, STATIC_URL } from '@/services/api';

const { width: screenWidth } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const propertyData = await getPostById(id!);
      setProperty(propertyData);
    } catch (error) {
      console.error('Failed to load property:', error);
      Alert.alert('Error', 'Failed to load property details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactOwner = () => {
    Alert.alert(
      'Contact Owner',
      'Contact functionality will be implemented with owner information.',
      [{ text: 'OK' }]
    );
  };

  const handleSaveFavorite = () => {
    Alert.alert(
      'Save to Favorites',
      'This property has been added to your favorites!',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading property details...</Text>
      </ThemedView>
    );
  }

  if (!property) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Text style={styles.errorText}>Property not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const images = property.images || [];
  const hasImages = images.length > 0;

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageSection}>
          {hasImages ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / screenWidth
                );
                setCurrentImageIndex(newIndex);
              }}
            >
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: `${STATIC_URL}/${image.baseUrl}` }}
                  style={styles.propertyImage}
                  contentFit="cover"
                />
              ))}
            </ScrollView>
          ) : (
            <Image
              source={{ uri: 'https://via.placeholder.com/400x250?text=No+Image' }}
              style={styles.propertyImage}
              contentFit="cover"
            />
          )}
          
          {/* Image Indicator */}
          {hasImages && images.length > 1 && (
            <View style={styles.imageIndicator}>
              <Text style={styles.imageCount}>
                {currentImageIndex + 1} / {images.length}
              </Text>
            </View>
          )}

          {/* Back Button */}
          <TouchableOpacity style={styles.backButtonOverlay} onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity style={styles.favoriteButton} onPress={handleSaveFavorite}>
            <Text style={styles.favoriteIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Property Information */}
        <View style={styles.contentSection}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <ThemedText type="title" style={styles.title}>
                {property.address}
              </ThemedText>
              <Text style={styles.location}>{property.city}, {property.state}</Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.price}>${property.price.toLocaleString()}</Text>
              <Text style={styles.priceUnit}>per month</Text>
            </View>
          </View>

          {/* Property Type */}
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{property.type}</Text>
          </View>

          {/* Property Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Property Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🛏️</Text>
                <Text style={styles.detailValue}>{property.bedrooms}</Text>
                <Text style={styles.detailLabel}>Bedrooms</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🚿</Text>
                <Text style={styles.detailValue}>{property.bathrooms}</Text>
                <Text style={styles.detailLabel}>Bathrooms</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>📐</Text>
                <Text style={styles.detailValue}>{property.area}</Text>
                <Text style={styles.detailLabel}>sq ft</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🏠</Text>
                <Text style={styles.detailValue}>{property.category?.name || 'N/A'}</Text>
                <Text style={styles.detailLabel}>Category</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          {property.content && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{property.content}</Text>
            </View>
          )}

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <TouchableOpacity style={styles.contactButton} onPress={handleContactOwner}>
              <Text style={styles.contactButtonText}>Contact Owner</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Schedule Visit</Text>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  imageSection: {
    position: 'relative',
  },
  propertyImage: {
    width: screenWidth,
    height: 300,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imageCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    color: '#fff',
    fontSize: 20,
  },
  contentSection: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
  },
  typeTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 24,
  },
  typeText: {
    color: '#fff',
    fontWeight: '600',
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  contactSection: {
    gap: 12,
    paddingTop: 8,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 