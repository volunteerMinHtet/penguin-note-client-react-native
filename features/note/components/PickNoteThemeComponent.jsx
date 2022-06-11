import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../theme/themeSlice'

const PickNoteThemeComponent = ({ value, onChange }) => {
    const { theme } = useSelector(selectTheme)

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                {theme.noteColors.map((color, index) => {
                    if (value.name === color.name) {
                        return (
                            <TouchableOpacity
                                onPress={() => onChange(color)}
                                key={index}
                                style={[
                                    styles.selectedColorContainer,
                                    {
                                        backgroundColor: color.background,
                                        borderWidth: 1,
                                        borderColor: theme.colors.border,
                                    },
                                ]}
                            >
                                <Text style={{ color: color.text }}>Aa</Text>
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity
                                onPress={() => onChange(color)}
                                key={index}
                                style={[
                                    styles.colorContainer,
                                    {
                                        backgroundColor: color.background,
                                        borderWidth: 1,
                                        borderColor: theme.colors.border,
                                    },
                                ]}
                            >
                                <Text style={{ color: color.text }}>Aa</Text>
                            </TouchableOpacity>
                        )
                    }
                })}
            </ScrollView>
        </View>
    )
}

export default PickNoteThemeComponent

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    colorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    selectedColorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 5,
    },
})
