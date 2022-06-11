import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StyleSheet, View } from 'react-native'
import { AddNoteCircleBtn } from '../common/components/Button'
import NoteList from '../features/note/private/containers/NoteList'
import PublicNoteList from '../features/note/public/containers/PublicNoteList'

const Tab = createMaterialTopTabNavigator()

const HomeTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Note" component={NoteList} />
            <Tab.Screen name="PublicNote" component={PublicNoteList} />
        </Tab.Navigator>
    )
}

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <HomeTabs />
            <AddNoteCircleBtn />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
