import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from "react-native";
import useFetch from "../Parser/parser";

const topScore = () => {
    const {scData, isLoading,error} = useFetch('GET-SCORETABLE');
    const scoreTable = scData;

    return (
        <View>
            <View style={styles.tableScore__Title}>
                <Text style={styles.tableScore__position}>#</Text>
                <Text style={styles.tableScore__playerH}>игрок</Text>
                <Text style={styles.tableScore__gaols}>г</Text>
                <Text style={styles.tableScore__assists}>а</Text>
                <Text style={styles.tableScore__ga}>г+а</Text>
            </View>
            {isLoading?(<ActivityIndicator/>):error?(<Text> Something went wrong</Text>):(
                <FlatList style={{height: '100%'}} data={scoreTable} renderItem={({item}) =>
                    <View style={styles.tableScore__Item}>
                        <Text style={styles.tableScore__position}>{item.position}</Text>
                        <View style={styles.tableScore__player}>
                            <Text style={styles.tableScore__playerName}>{item.name}</Text>
                            <View style={styles.tableScore__playerTeam}>
                                <View style={styles.tableScore__teamLogoWrapper}>
                                    <Image style={styles.tableScore__teamLogo}
                                           source={{
                                               uri: item.logo
                                           }}/>

                                </View>
                                <Text style={styles.tableScore__playerTeamTitle}>{item.team}</Text>
                            </View>
                        </View>
                        <Text style={styles.tableScore__gaols}>{item.goals}</Text>
                        <Text style={styles.tableScore__assists}>{item.assist}</Text>
                        <Text style={styles.tableScore__ga}>{item.ga}</Text>
                    </View>}/>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        height: '100%',
    },
    header: {
        height: 150,
        width: '100%',
        backgroundColor: '#EEEEEE',
    },
    headerLogoWrapper: {
        flex: 1,
        marginRight: 20,
    },
    headerLogo: {
        flex: 1,
        maxWidth: 100,
        resizeMode: "contain",
    },
    headerTitle: {
        height: 85,
        backgroundColor: '#081d27',
        width: "100%",
        textAlign: "left",
        justifyContent: 'flex-end',
        paddingBottom: 15
    },
    headerTitleText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
    table: {
        paddingHorizontal: 10
    },
    tableTab: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingLeft: 10
    },
    tableTab__item: {
        // height: 30,

        paddingVertical: 6,
        paddingHorizontal: 10,
        // borderRadius: 5,
        fontSize: 14,
        textTransform: 'uppercase',
        color: '#EEEEEE',
        textAlign: 'center',
        // backgroundColor: '#E9334C'
    },
    tableTab__itemWrapper: {
        borderRadius: 5,
        backgroundColor: '#E9334C',
        height: 30,
        textAlign: 'center',
        marginRight: 10,
    },
    tableTitle: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        paddingLeft: 10,
    },
    tableItem: {
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
    title: {
        fontSize: 64,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
    },

    tableScore__Title: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        paddingLeft: 10,
    },
    tableScore__position: {
        flex: 1,
        textAlign: 'center',
    },
    tableScore__playerH: {
        flex: 4,
        textAlign: 'center',
    },
    tableScore__gaols: {
        flex: 1,
        textAlign: 'center',
    },
    tableScore__assists: {
        flex: 1,
        textAlign: 'center',
    },
    tableScore__ga: {
        flex: 1,
        textAlign: 'center',
    },
    tableScore__Item: {
        alignItems: 'center',
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#EEEEEE'
    },
    tableScore__player: {
        flex: 4,
        textAlign: 'center',
    },
    tableScore__playerTeam: {

        flexDirection: 'row'
    },
    tableScore__playerName: {
        fontWeight: "bold",
    },
    tableScore__teamLogoWrapper: {
        flex: 1
    },
    tableScore__teamLogo: {
        flex: 1,
        maxHeight: 30,
        resizeMode: "contain",
        marginRight: 10
    },
    tableScore__playerTeamTitle: {
        color: "#757b7d",
        flex: 5
    }

})
export default topScore;