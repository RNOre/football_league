import {Stack, useRouter} from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default ()=>{
    const router = useRouter();
    return(
        <Stack screenOptions={{
            headerStyle:{
                backgroundColor:'#081d27'
            },
            headerTintColor: 'white',
            headerLeft:()=>(
                <Ionicons onPress={()=>router.back()} name="arrow-back" size={24} color="white" />
            )
        }}>

        </Stack>
    )
}