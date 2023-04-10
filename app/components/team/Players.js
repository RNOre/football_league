import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native';
import useFetch from "../../Parser/parser";
import {Link} from "expo-router";
import React from "react";

const Players = ({url}) => {
    const {data} = useFetch('GET-TEAMPLAYERS', {url});
    // console.log(data)
    return (
        <View>
            <View style={styles.header}>
                <Text style={[styles.header__number, styles.item]}>№</Text>
                <Text style={[styles.header__player, styles.item]}>игрок</Text>
                <Text style={[styles.header__played, styles.item]}>и</Text>
                <Text style={[styles.header__goals, styles.item]}>г</Text>
                <Text style={[styles.header__assists, styles.item]}>а</Text>
                <Text style={[styles.header__yellowCard, styles.item]}>ЖК</Text>
                <Text style={[styles.header__redCard, styles.item]}>КК</Text>
            </View>
            <FlatList style={{height: '100%'}} data={data} renderItem={({item}) =>
                <Link href={{
                    // pathname: `../components/team/${item.team}`,
                    // params: {
                    //     url: item.link,
                    //     team: item.team,
                    //     position: item.position
                    // }
                }
                } asChild>
                    <TouchableOpacity style={styles.wrapper}>
                        {/*<View style={{width:'100%'}}>*/}
                        <Text style={[styles.number, styles.item]}>{item.number?item.number:'-'}</Text>
                        <View style={styles.player}>
                            <Text>{item.name}</Text>
                            <Text>{item.info}</Text>
                        </View>
                        <Text style={[styles.played, styles.item]}>{item.matches}</Text>
                        <Text style={[styles.goals, styles.item]}>{item.goals}</Text>
                        <Text style={[styles.assists, styles.item]}>{item.assists}</Text>
                        <Text style={[styles.yellowCard, styles.item]}>{item.yellow}</Text>
                        <Text style={[styles.redCard, styles.item]}>{item.red}</Text>
                    </TouchableOpacity>
                </Link>
            }/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    header__number:{
        flex:1,
    },
    header__player: {
        flex: 5
    },
    header__played: {
        flex: 1
    },
    header__goals: {
        flex: 1
    },
    header__assists: {
        flex: 1
    },
    header__yellowCard: {
        flex: 1,
    },
    header__redCard: {
        flex: 1,
    },
    item:{
      textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    wrapper:{
        flexDirection:'row',
        paddingVertical:10,
        backgroundColor:'#FFFFFF',
        borderBottomWidth: 2,
        borderColor: '#EEEEEE'
    },
    number:{
        flex:1,
    },
    player: {
        flex: 5
    },
    played: {
        flex: 1
    },
    goals: {
        flex: 1
    },
    assists: {
        flex: 1
    },
    yellowCard: {
        flex: 1,
    },
    redCard: {
        flex: 1,
    }
})
export default Players;