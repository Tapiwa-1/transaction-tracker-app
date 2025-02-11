import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import Screen from '../components/Screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import for "X" icon
import authStorage from '../auth/authStorage'

export default function PhotosScreen() {
    const [transactions, setTransactions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // For Date Picker
    const [newTransaction, setNewTransaction] = useState({
        date: '',
        description: '',
        amount: '',
    });

    const token = authStorage.getToken() ; // Retrieve this token from local storage or auth context

    // Set default headers with the Bearer token for all axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://192.168.1.106:8000/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch transactions');
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTransactions().finally(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleAddTransaction = async () => {
        try {
            const response = await axios.post('http://192.168.1.106:8000/api/transactions', newTransaction);
            setTransactions(prev => [...prev, response.data]);
            setIsModalVisible(false);
            setNewTransaction({ date: '', description: '', amount: '' });
        } catch (error) {
            Alert.alert('Error', 'Unable to add transaction');
        }
    };

    const handleTransactionSelect = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleDeleteTransaction = async (transactionId) => {
        try {
            await axios.delete(`http://192.168.1.106:8000/api/transactions/${transactionId}`);
            setTransactions(transactions.filter((item) => item.id !== transactionId));
            setSelectedTransaction(null);
        } catch (error) {
            Alert.alert('Error', 'Unable to delete transaction');
        }
    };

    const renderTransaction = ({ item }) => (
        <TouchableOpacity
            style={styles.transactionRow}
            onPress={() => handleTransactionSelect(item)}
        >
            <Text style={styles.transactionCell}>{item.date}</Text>
            <Text style={styles.transactionCell}>{item.description}</Text>
            <Text style={styles.transactionCell}>${item.amount}</Text>
        </TouchableOpacity>
    );

    const handleDateConfirm = (date) => {
        setNewTransaction({ ...newTransaction, date: date.toISOString().split('T')[0] }); // Format to YYYY-MM-DD
        setIsDatePickerVisible(false);
    };

    return (
        <Screen style={styles.container}>
            <Text style={styles.heading}>Transactions</Text>

            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListHeaderComponent={
                    <View style={styles.tableHeaderContainer}>
                        <Text style={styles.tableHeader}>Date</Text>
                        <Text style={styles.tableHeader}>Description</Text>
                        <Text style={styles.tableHeader}>Amount</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Transaction</Text>
            </TouchableOpacity>

            {/* Modal for adding transaction */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeIcon}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>

                        <Text style={styles.modalHeading}>Add Transaction</Text>

                        <TouchableOpacity style={styles.datePicker} onPress={() => setIsDatePickerVisible(true)}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Date (YYYY-MM-DD)"
                                value={newTransaction.date}
                                editable={false}
                            />
                        </TouchableOpacity>
                
                        <TextInput
                            style={styles.inputField}
                            placeholder="Description"
                            value={newTransaction.description}
                            onChangeText={(text) => setNewTransaction({ ...newTransaction, description: text })}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Amount"
                            value={newTransaction.amount}
                            keyboardType="numeric"
                            onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
                        />

                        <View style={styles.modalButtons}>
                            <Button title="Add" onPress={handleAddTransaction} />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Date Picker Modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => setIsDatePickerVisible(false)}
            />

            {/* Transaction details view */}
            {selectedTransaction && (
                <Modal
                    visible={selectedTransaction !== null}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setSelectedTransaction(null)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => setSelectedTransaction(null)} style={styles.closeIcon}>
                                <Icon name="close" size={24} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Transaction Details</Text>
                            <Text style={styles.detailsText}>Date: {selectedTransaction.date}</Text>
                            <Text style={styles.detailsText}>Description: {selectedTransaction.description}</Text>
                            <Text style={styles.detailsText}>Amount: ${selectedTransaction.amount}</Text>

                            <View style={styles.modalButtons}>
                                <Button title="Delete" color="red" onPress={() => handleDeleteTransaction(selectedTransaction.id)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    tableHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginBottom: 10,
    },
    tableHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    transactionRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    transactionCell: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    addButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputField: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    modalButtons: {
        width: '100%',
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    datePicker: {
        width: '100%',
    },
});
