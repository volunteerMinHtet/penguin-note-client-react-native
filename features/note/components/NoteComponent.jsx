import { TouchableOpacity, TouchableHighlight } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ThreeVerticalDotIcon } from '../../../common/components/Icon'
import { defaultNoteColor } from '../../../utils/theme'
import { selectTheme } from '../../theme/themeSlice'

const NoteTitleRightComponent = ({ isPublic }) => {
    const { theme } = useSelector(selectTheme)

    return (
        <TouchableHighlight
            onPress={() => alert(isPublic ? 'Public Note' : 'Private Note')}
            style={styles.titleRight}
            underlayColor={theme.colors.onTouch}
        >
            <ThreeVerticalDotIcon size={13} color={theme.colors.text} />
        </TouchableHighlight>
    )
}

const NoteComponent = ({ value, firstIndex, lastIndex }) => {
    const { theme } = useSelector(selectTheme)

    return (
        <View
            style={[
                styles.container,
                {
                    marginTop: firstIndex ? 13 : 0,
                    marginBottom: lastIndex ? 13 : 0,
                    backgroundColor: value?.theme?.background || defaultNoteColor.background,
                },
            ]}
        >
            <View style={styles.titleContainer}>
                <Text style={[styles.titleText, { color: value?.theme?.text || defaultNoteColor.text }]}>
                    {value?.title}
                </Text>
                <NoteTitleRightComponent isPublic={value.is_public} />
            </View>

            <Text style={[styles.body, { color: value?.theme?.text || defaultNoteColor.text }]}>{value?.body}</Text>
        </View>
    )
}

export default NoteComponent

const styles = StyleSheet.create({
    container: {
        alignSelf: 'auto',
        padding: 20,
        marginHorizontal: 13,
        borderRadius: 5,
        elevation: 3,
        shadowOpacity: 1,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    titleText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleRight: {
        borderRadius: 20,
        padding: 3,
    },
    body: {
        textAlign: 'justify',
    },
})
