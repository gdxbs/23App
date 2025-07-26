import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants/Colors';

export default function ReservationScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [reservationData, setReservationData] = useState({
    location: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: '',
  });

  // Mock floor plan data - replace with actual floor plan component
  const tables = [
    { id: 1, x: 50, y: 100, seats: 2, available: true },
    { id: 2, x: 150, y: 100, seats: 4, available: true },
    { id: 3, x: 250, y: 100, seats: 6, available: false },
    { id: 4, x: 50, y: 200, seats: 2, available: true },
    { id: 5, x: 150, y: 200, seats: 4, available: true },
    { id: 6, x: 250, y: 200, seats: 8, available: true },
  ];

  const occasions = [
    'Birthday', 'Anniversary', 'Date Night', 'Business Meeting', 
    'Family Gathering', 'Celebration', 'Other'
  ];

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const handleTablePress = (tableId: number) => {
    const table = tables.find(t => t.id === tableId);
    if (table?.available) {
      setSelectedTable(tableId);
      setModalVisible(true);
    } else {
      Alert.alert('Table Unavailable', 'This table is currently reserved.');
    }
  };

  const handleReservation = () => {
    if (!reservationData.date || !reservationData.time) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    Alert.alert(
      'Reservation Confirmed',
      `Table ${selectedTable} reserved for ${reservationData.guests} guests on ${reservationData.date} at ${reservationData.time}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setSelectedTable(null);
            setReservationData({
              location: '',
              date: '',
              time: '',
              guests: '2',
              occasion: '',
              specialRequests: '',
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Table Reservations</Text>
        <Text style={styles.subtitle}>Select a table to make a reservation</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Floor Plan */}
        <View style={styles.floorPlanContainer}>
          <Text style={styles.sectionTitle}>Restaurant Floor Plan</Text>
          <View style={styles.floorPlan}>
            {tables.map((table) => (
              <TouchableOpacity
                key={table.id}
                style={[
                  styles.table,
                  {
                    left: table.x,
                    top: table.y,
                    backgroundColor: table.available ? Colors.green : Colors.red,
                  },
                  selectedTable === table.id && styles.selectedTable,
                ]}
                onPress={() => handleTablePress(table.id)}
              >
                <Text style={styles.tableText}>{table.id}</Text>
                <Text style={styles.tableSeats}>{table.seats} seats</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: Colors.green }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: Colors.red }]} />
              <Text style={styles.legendText}>Reserved</Text>
            </View>
          </View>
        </View>

        {/* Quick Reservation */}
        <View style={styles.quickReservation}>
          <Text style={styles.sectionTitle}>Quick Reservation</Text>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.quickButtonText}>Make Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reservation Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {selectedTable ? `Reserve Table ${selectedTable}` : 'Make Reservation'}
          </Text>
          
          <ScrollView style={styles.modalForm}>
            {/* Location */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={reservationData.location}
                onChangeText={(text) => setReservationData({...reservationData, location: text})}
                placeholder="Main dining room"
              />
            </View>

            {/* Date */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Date *</Text>
              <TextInput
                style={styles.input}
                value={reservationData.date}
                onChangeText={(text) => setReservationData({...reservationData, date: text})}
                placeholder="MM/DD/YYYY"
              />
            </View>

            {/* Time */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Time *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.timeSlots}>
                  {timeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        reservationData.time === time && styles.timeSlotSelected,
                      ]}
                      onPress={() => setReservationData({...reservationData, time})}
                    >
                      <Text
                        style={[
                          styles.timeSlotText,
                          reservationData.time === time && styles.timeSlotTextSelected,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Number of Guests */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Number of Guests</Text>
              <View style={styles.guestCounter}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => {
                    const current = parseInt(reservationData.guests);
                    if (current > 1) {
                      setReservationData({...reservationData, guests: (current - 1).toString()});
                    }
                  }}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.guestCount}>{reservationData.guests}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => {
                    const current = parseInt(reservationData.guests);
                    setReservationData({...reservationData, guests: (current + 1).toString()});
                  }}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Special Occasion */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Special Occasion</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.occasions}>
                  {occasions.map((occasion) => (
                    <TouchableOpacity
                      key={occasion}
                      style={[
                        styles.occasionChip,
                        reservationData.occasion === occasion && styles.occasionChipSelected,
                      ]}
                      onPress={() => setReservationData({...reservationData, occasion})}
                    >
                      <Text
                        style={[
                          styles.occasionChipText,
                          reservationData.occasion === occasion && styles.occasionChipTextSelected,
                        ]}
                      >
                        {occasion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Special Requests */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Special Requests</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={reservationData.specialRequests}
                onChangeText={(text) => setReservationData({...reservationData, specialRequests: text})}
                placeholder="Any dietary restrictions or special requests..."
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          {/* Modal Actions */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleReservation}
            >
              <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  floorPlanContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  floorPlan: {
    height: 300,
    backgroundColor: Colors.white,
    borderRadius: 16,
    position: 'relative',
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  table: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedTable: {
    borderWidth: 3,
    borderColor: Colors.yellow,
  },
  tableText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableSeats: {
    color: Colors.white,
    fontSize: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quickReservation: {
    padding: 24,
  },
  quickButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalForm: {
    paddingHorizontal: 24,
    maxHeight: 400,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  timeSlots: {
    flexDirection: 'row',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray,
  },
  timeSlotSelected: {
    backgroundColor: Colors.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  timeSlotTextSelected: {
    color: Colors.white,
  },
  guestCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  guestCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    minWidth: 30,
    textAlign: 'center',
  },
  occasions: {
    flexDirection: 'row',
    gap: 8,
  },
  occasionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray,
  },
  occasionChipSelected: {
    backgroundColor: Colors.yellow,
  },
  occasionChipText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  occasionChipTextSelected: {
    color: Colors.textPrimary,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.gray,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});