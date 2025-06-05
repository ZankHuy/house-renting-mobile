import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { Property, STATIC_URL } from '@/services/api';

interface PropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
  const {
    images,
    price,
    address,
    city,
    state,
    bedrooms,
    bathrooms,
    area,
    type,
  } = property;

  const handlePress = () => {
    onPress?.(property);
  };

  const imageUrl = images?.[0]?.baseUrl 
    ? `${STATIC_URL}/${images[0].baseUrl}`
    : 'https://via.placeholder.com/400x250?text=House+Image';

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.card}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
          <View style={styles.photoCount}>
            <Text style={styles.photoCountText}>{images?.length || 1} Photos</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.locationPrice}>
            <View style={styles.location}>
              <Text style={styles.address} numberOfLines={1}>{address}</Text>
              <Text style={styles.cityState} numberOfLines={1}>{city}, {state}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${price.toLocaleString()}</Text>
              <Text style={styles.priceUnit}>per month</Text>
            </View>
          </View>

          {/* Property Details */}
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🛏️</Text>
              <Text style={styles.detailText}>{bedrooms} Beds</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🚿</Text>
              <Text style={styles.detailText}>{bathrooms} Baths</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📐</Text>
              <Text style={styles.detailText}>{area} sqft</Text>
            </View>
          </View>

          {/* View Details Button */}
          <TouchableOpacity style={styles.viewButton} onPress={handlePress}>
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  photoCount: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  photoCountText: {
    color: '#fff',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  locationPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  location: {
    flex: 1,
    marginRight: 8,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cityState: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 12,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 