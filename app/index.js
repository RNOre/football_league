// import {FlatList, StyleSheet, Text, View, Image, ActivityIndicator} from "react-native";
import useFetch from "./Parser/parser";
import axios from "axios";
import * as cheerio from "cheerio";
import {useEffect, useState} from "react";
import {Redirect} from "expo-router";
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerActions as navigation} from "@react-navigation/routers/src/DrawerRouter";
import players from "./coach/players";

function NotificationsScreen({ navigation }) {
    return (
        <Redirect href={'/coach'}/>
    );
}


function Home({ navigation }) {

    return (
        <Redirect href={'/home'}/>
    );
}
const Drawer = createDrawerNavigator();

export default function Page() {


    return (
        // <NavigationContainer>
            <Drawer.Navigator initialRouteName="Notification">
                <Drawer.Screen name="Подбор состава" component={players}/>
                <Drawer.Screen name="Статистика лиги" component={ Home}/>

            </Drawer.Navigator>
        // </NavigationContainer>
    )
}
