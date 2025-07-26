import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemWidth?: number;
  spacing?: number;
  showIndicators?: boolean;
  style?: ViewStyle;
}

const { width: screenWidth } = Dimensions.get('window');

export default function Carousel({
  data,
  renderItem,
  itemWidth = screenWidth * 0.8,
  spacing = 16,
  showIndicators = true,
  style,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (itemWidth + spacing));
    setCurrentIndex(index);
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: (screenWidth - itemWidth) / 2 }
        ]}
        snapToInterval={itemWidth + spacing}
        decelerationRate="fast"
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              { width: itemWidth, marginRight: index < data.length - 1 ? spacing : 0 }
            ]}
          >
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>
      
      {showIndicators && data.length > 1 && (
        <View style={styles.indicatorContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentIndex ? Colors.primary : Colors.grayMedium,
                }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});