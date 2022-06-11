import { useNavigation } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectNoteMeta } from '../../features/note/private/noteSlice'
import { selectPublicNoteMeta } from '../../features/note/public/publicNoteSlice'
import { selectTheme } from '../../features/theme/themeSlice'
import { AddIcon, SettingIcon } from './Icon'

export const SettingIconBtn = ({ tintColor, pressColor, pressOpacity }) => {
    const navigate = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigate.navigate('Setting')}>
            <SettingIcon size={20} color={tintColor} />
        </TouchableOpacity>
    )
}

export const AddNoteCircleBtn = () => {
    const { theme } = useSelector(selectTheme)
    const privateNoteScrollDirection = useSelector(selectNoteMeta).scroll.direction
    const publicNoteScrollDirection = useSelector(selectPublicNoteMeta).scroll.direction

    const navigation = useNavigation()

    if (privateNoteScrollDirection === 'down' || publicNoteScrollDirection === 'down') {
        return null
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('CreateNote')}
            style={[styles.addNoteCircle, { backgroundColor: theme.colors.primary }]}
        >
            <AddIcon size={24} color={theme.colors.white} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addNoteCircle: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
