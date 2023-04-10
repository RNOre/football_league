import {View, Text, Image, Button, StyleSheet} from 'react-native';
import {useRouter, useSearchParams, Stack} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import useFetch from "../../Parser/parser";
import {Entypo} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Players from "./Players";

const team = () => {
    const router = useRouter();

    const {url, team, position} = useSearchParams();
    const {str, data, obj} = useFetch('test', {url, position});
    return (
        <View style={{backgroundColor:'#EEEEEE'}}>
            <Stack.Screen
                options=
                    {{
                        title: team,
                        headerRight: () => (
                            <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: 10,}}>
                                <Image
                                    source={{
                                        uri: str ? str : 'https://gplatom.com/wp-content/uploads/image-placeholder.png'
                                    }}
                                    style={{
                                        resizeMode: 'contain',
                                        borderRadius: 10,
                                        width: 40,
                                        height: 40
                                    }}
                                />
                            </View>
                        )
                    }}
            />

            <View style={styles.teamInfo}>
                <View style={styles.itemWrapper}>
                    <Entypo style={styles.infoIcon} name="location" size={24} color="black"/>
                    <Text style={[styles.location, styles.text]}>{obj.location}</Text>
                </View>
                <View style={styles.itemWrapper}>
                    <MaterialCommunityIcons style={styles.infoIcon} name="stadium" size={24} color="black" />
                    <Text style={[styles.stadium, styles.text]}>{obj.stadium}</Text>
                </View>
                <View style={styles.itemWrapper}>
                    <MaterialIcons style={styles.infoIcon} name="sports-soccer" size={24} color="black" />
                    <Text style={[styles.fullName, styles.text]}>{obj.fullName}</Text>
                </View>
                <View style={[styles.itemWrapper, styles.mostKnownPlayers]}>
                    <Text style={[styles.mostKnownPlayers, styles.text]}>{obj.mostKnownPlayers}</Text>
                </View>
                <View style={styles.itemWrapper}>
                    <Text style={[styles.legends, styles.text]}>{obj.legends}</Text>
                </View>
            </View>
            <Players url={url}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#081d27'
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        color: 'white'
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoIcon: {
        flex: 1
    },
    teamInfo: {
        margin: 15,
        padding:10,
        backgroundColor: '#FFFFFF',
        borderRadius:10
    },
    text: {
        flex: 8,
        fontSize: 16,
    },
    mostKnownPlayers:{
        marginTop:20
    }
})
export default team;