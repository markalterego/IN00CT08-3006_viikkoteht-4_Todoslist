import { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Appbar } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Row from './components/Row';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key';

export default function App() {
    const [data, setData] = useState([]);

    const add = useCallback((name) => {
        const newItem = {
            id: uuid.v4(),
            name: name
        }
        const tempData = [...data, newItem];
        setData(tempData);
    }, [data]);

    useEffect(() => { // gets data from phone's storage
        //AsyncStorage.clear();
        getData();
    }, [])

    useEffect(() => { // stores data to phone's storage
        storeData(data)
    }, [data])

    const getData = async() => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            const json = JSON.parse(value);
            if (json === null) {
                json = [];
            }
            setData(json);
        } catch (ex) {
            console.log(ex);
        }
    }

    const storeData = async(value) => {
        try {
            const json = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, json);
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Appbar.Header>
                    <Appbar.Content title="Todo list" />
                </Appbar.Header>
                <Add add={add} />
                <FlatList
                    data={data}
                    renderItem={({item}) => (<Row item={item} />)} 
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 10,
        paddingLeft: 10
    }
});
