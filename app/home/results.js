import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import useFetch from "../Parser/parser";
import {Link} from "expo-router";
import React, {useState} from "react";

const results = () => {

    // const [data, setData]=useState([]);
    // setObj(()=>useFetch('GET-PLAYERS'));
    // console.log(obj);

    const {obj} = useFetch('GET-PLAYERS')
    // setData(obj);
    const playerFilter=(position)=>{
        alert('position');
    }
    return (
        <View>
            <View style={styles.header}>
                <Text style={[styles.header__number, styles.item]}>№</Text>
                <Text style={[styles.header__player, styles.item]}>игрок</Text>
                <Text style={[styles.header__team, styles.item]}>команда</Text>
            </View>
            <View>
                <Text onPress={()=>
                {
                    // let arr=[];
                    // arr=obj.filter(i=>i.info.contain('нападающий'));
                    // setData(arr);
                }}>
                    нападающие
                </Text>
            </View>
            <FlatList style={{height: '100%'}} data={obj} renderItem={({item}) =>
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
                        <Text style={[styles.number, styles.item]}>{item.number ? item.number : '-'}</Text>
                        <View style={styles.player}>
                            <Image style={styles.image}
                                   source={{
                                       uri: item.photoUrl.replace('26x26', '186x186')
                                   }}
                            />
                            <View>
                                <Text>{item.name}</Text>
                                <Text>{item.info}</Text>
                            </View>
                        </View>
                        <Text style={[styles.team, styles.item]}>{item.clubs}</Text>
                    </TouchableOpacity>
                </Link>
            }/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 10
    },
    item: {
        textAlign: 'center'
    },
    header__number: {
        flex: 1
    },
    header__player: {
        flex: 6
    },
    header__team: {
        flex: 3
    },
    wrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderColor: '#EEEEEE'
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 10,
        marginRight:20
    },
    number: {
        flex: 1
    },
    player: {
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    team: {
        flex: 3
    }
});

export default results;