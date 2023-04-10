import {View, Text, Image, StyleSheet, Button} from "react-native";
import {DrawerActions as navigation} from "@react-navigation/routers/src";
import {nav} from "../index";

const primary='#eeeeee'
const secondary='#ffffff'
// const primary='#081d27'
const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Image style={styles.logo}
                       source={{
                           uri: "http://img.goalstream.org/img_r_186x186/public/gchampionship_season/ae/64/0b/b4e55_b796.png?c=fb58"
                       }}/>
            </View>
            <Text style={styles.title}>А-Лига 5x5. Высшая Лига</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 170,
        backgroundColor: primary,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:20
    },
    logo: {
        width: "90%",
        height: 50,
        resizeMode: 'contain'
    },
    logoWrapper:{
        flex:1,
        width:100,
        height:100,
        backgroundColor:secondary,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        flex:3,
        fontSize:20,
        marginLeft:20
    }
})

export default Header;