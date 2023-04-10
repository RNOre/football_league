import {Tabs} from 'expo-router'
import {Ionicons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons'
import {FontAwesome5} from '@expo/vector-icons';
import {StatusBar, View} from "react-native";
import Header from "../components/Header";


export default () => {
    return (
        <Tabs screenOptions={{
            header:() =><Header/>,
            tabBarActiveTintColor: '#E9334C'}}>
            <Tabs.Screen name={'table'} options={{
                title: 'Таблица',
                tabBarIcon: () => <FontAwesome5 name="list-ol" size={24} color="#081d27"/>
                }}/>
            <Tabs.Screen name={'topScore'} options={{
                title: 'Бомбардиры',
                tabBarIcon: () => <Ionicons name="ios-football" size={24} color="#081d27"/>
            }}/>
            <Tabs.Screen name={'results'} options={{
                title: 'Результаты',
                tabBarIcon: () => <MaterialCommunityIcons name="scoreboard-outline" size={24} color="#081d27"/>
            }}/>
            <Tabs.Screen name={'calendar'} options={{
                title: 'Календарь',
                tabBarIcon: () => <AntDesign name="calendar" size={24} color="#081d27"/>
            }}/>
        </Tabs>
    )
}