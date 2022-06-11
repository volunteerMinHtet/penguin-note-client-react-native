import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../auth/authSlice'
import { selectTheme } from '../../theme/themeSlice'
import CreateNewNoteHeaderRight from '../components/CreateNewNoteHeaderRight'
import { createNewNote } from '../private/noteSlice'
import { createNewPublicNote } from '../public/publicNoteSlice'
import PickNoteThemeComponent from '../components/PickNoteThemeComponent'
import { defaultNoteColor } from '../../../utils/theme'

const initialCreateNoteData = {
    title: '',
    body: '',
    image: '',
    isPublic: false,
    theme: {
        name: '',
        background: '',
        text: '',
    },
}

const CreateNewNote = () => {
    const navigation = useNavigation()

    const { isDark, theme } = useSelector(selectTheme)
    const { token } = useSelector(selectAuth)

    const dispatch = useDispatch()

    const [data, setData] = React.useState(initialCreateNoteData)

    // inputs' reference
    const titleInputRef = React.useRef(null)
    const bodyInputRef = React.useRef(null)

    const aref = React.useRef(null)
    const bref = React.useRef(null)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CreateNewNoteHeaderRight
                    onPressPin={() => console.log('Clicked Pin Icon')}
                    onPressSave={() => handleCreateNote()}
                />
            ),
        })
    }, [navigation, data, token])

    // Initialize inputs' data and clean up when unmounting (e.g. when user navigates away from this screen)
    useFocusEffect(
        React.useCallback(() => {
            setData({
                ...initialCreateNoteData,
                theme: defaultNoteColor,
            })

            // titleInputRef.current.focus()

            return () => {
                setData(initialCreateNoteData)
            }
        }, [])
    )

    const onChangeNoteTheme = (value) => {
        setData({ ...data, theme: { name: value.name, background: value.background, text: value.text } })
    }

    const handleCreateNote = () => {
        data.isPublic
            ? dispatch(
                  createNewPublicNote({
                      note: data,
                      authToken: token,
                  })
              )
            : dispatch(
                  createNewNote({
                      note: data,
                      authToken: token,
                  })
              )
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10 }}>
                <PickNoteThemeComponent value={data.theme} onChange={onChangeNoteTheme} />
            </View>
            <View
                style={[
                    styles.formInputsContainer,
                    { backgroundColor: data.theme.background || theme.colors.background },
                ]}
            >
                <View style={{ marginBottom: 10 }}>
                    <TextInput
                        placeholder="Title"
                        value={data.title}
                        onChangeText={(text) => setData({ ...data, title: text })}
                        placeholderTextColor={theme.colors.placeholder}
                        selectionColor={theme.colors.primary}
                        keyboardAppearance={isDark ? 'dark' : 'light'}
                        returnKeyType="next"
                        returnKeyLabel="Next"
                        autoFocus={true}
                        ref={titleInputRef}
                        onSubmitEditing={() => bodyInputRef.current.focus()}
                        style={{
                            borderWidth: 1,
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderColor: theme.colors.border,
                            borderRadius: 5,
                            color: data.theme.text || theme.colors.text,
                        }}
                    />
                </View>

                <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                    <TextInput
                        placeholder="Note"
                        value={data.body}
                        onChangeText={(text) => setData({ ...data, body: text })}
                        multiline={true}
                        placeholderTextColor={theme.colors.placeholder}
                        selectionColor={theme.colors.primary}
                        keyboardAppearance={isDark ? 'dark' : 'light'}
                        ref={bodyInputRef}
                        style={{
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderColor: theme.colors.border,
                            borderRadius: 5,
                            color: data.theme.text || theme.colors.text,
                        }}
                    />
                </ScrollView>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                }}
            >
                <Checkbox value={data.isPublic} onValueChange={(value) => setData({ ...data, isPublic: value })} />
                <Text style={{ color: theme.colors.text }}>Add to public</Text>
            </View>
        </View>
    )
}

export default CreateNewNote

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
    },
    formInputsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
})
