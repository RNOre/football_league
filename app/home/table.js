import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Button,
    SafeAreaView,
    StatusBar
} from "react-native";
import useFetch from "../Parser/parser";
import {Link} from "expo-router";
import axios from "axios";
import * as cheerio from "cheerio";

const table = (props) => {
    const {data, error, isLoading} = useFetch('GET-TABLE');


    return (
        <View>
            <SafeAreaView>
                <StatusBar
                barSyle='dark'/>
            </SafeAreaView>
            <View style={styles.tableTitle}>
                <Text style={styles.table__position}>#</Text>
                <Text style={styles.table__teamH}>команда</Text>
                <Text style={styles.table__played}>и</Text>
                <Text style={styles.table__goals}>г</Text>
                <Text style={styles.table__points}>о</Text>
            </View>
            {isLoading ? (<ActivityIndicator/>) : error ? (<Text> Something went wrong</Text>) : (
                <FlatList style={{height: '100%'}} data={data} renderItem={({item}) =>
                    <Link href={{
                        pathname: `../components/team/${item.team}`,
                        params: {
                            url: item.link,
                            team: item.team,
                            position: item.position
                        }
                    }} style={styles.tableItem} asChild>
                        <TouchableOpacity>
                            {/*<View style={{width:'100%'}}>*/}
                            <Text style={styles.table__position}>{item.position}</Text>
                            <View style={styles.table__team}>
                                <Image style={styles.table__teamLogo}
                                       source={{
                                           uri: item.logo
                                       }}/>
                            </View>
                            <Text style={styles.table__teamText}>{item.team}</Text>
                            <Text style={styles.table__played}>{item.played}</Text>
                            <Text style={styles.table__goals}>{item.goals}</Text>
                            <Text style={styles.table__points}>{item.points}</Text>
                        </TouchableOpacity>
                    </Link>
                }/>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    tableTitle: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        paddingLeft: 10,
    },
    tableItem: {
        flex: 1,
        alignItems: 'center',
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#EEEEEE'
    },
    table__position: {
        flex: 1,
        textAlign: 'center',
    },
    table__team: {
        flex: 1,
    },
    table__teamLogo: {
        flex: 1,
        maxHeight: 50,
        resizeMode: "contain",
        marginRight: 10
    },
    table__teamH: {
        flex: 5,
        textAlign: "center"
    },
    table__teamText: {
        flex: 4,
        flexWrap: 'wrap'
    },
    table__played: {
        flex: 1,
        textAlign: 'center',
    },
    table__goals: {
        flex: 2,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    table__points: {
        flex: 1,
        textAlign: 'center',
    },
})
export default table;