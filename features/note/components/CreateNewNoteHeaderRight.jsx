import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { PinIcon, SaveIcon } from '../../../common/components/Icon'
import { selectTheme } from '../../theme/themeSlice'

const CreateNewNoteHeaderRight = ({ onPressPin, onPressSave }) => {
    const { theme } = useSelector(selectTheme)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    marginRight: 15,
                }}
                onPress={() => onPressPin}
            >
                <PinIcon size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressSave}>
                <SaveIcon size={27} color={theme.colors.text} />
            </TouchableOpacity>
        </View>
    )
}

export default CreateNewNoteHeaderRight

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
