import React from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../../theme/themeSlice'
import NoteComponent from '../../components/NoteComponent'
import { fetchPublicNotes, selectPublicNote, setPublicNoteListScrollDirection } from '../publicNoteSlice'

const ItemSeparator = () => {
    return <View style={{ height: 10 }} />
}

const PublicNoteList = () => {
    const [contentOffset, setContentOffset] = React.useState(0)
    const [scrollDirection, setScrollDirection] = React.useState('up')

    const { value, status, message } = useSelector(selectPublicNote)
    const { theme } = useSelector(selectTheme)
    const dispatch = useDispatch()

    React.useEffect(() => {
        console.log('PublicNoteList::useEffect')
        let mounted = true
        if (mounted) {
            dispatch(fetchPublicNotes())
        }

        return () => (mounted = false)
    }, [])

    React.useEffect(() => {
        dispatch(setPublicNoteListScrollDirection(scrollDirection))
    }, [scrollDirection])

    // React.useEffect(() => {
    //     echo.channel('public-notes')
    //         .subscribed(() => {
    //             console.log('You are subscribed')
    //         })
    //         .listen('.note.new', (event) => {
    //             console.log(event)
    //             dispatch(pushNewPublicNote(event.noteResource))
    //         })

    //     return () => {
    //         echo.channel('public-notes').stopListening()
    //     }
    // }, [])

    const renderNote = (note, index) => {
        const firstIndex = index === 0
        const lastIndex = index === value.length - 1

        return <NoteComponent value={note} firstIndex={firstIndex} lastIndex={lastIndex} />
    }

    const renderItemSeparator = () => {
        return <ItemSeparator />
    }

    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color={theme.colors.accent} />}
            {status === 'error' && <Text>{`${message}`}</Text>}
            {status === 'idle' && (
                <FlatList
                    data={value}
                    renderItem={({ item, index }) => renderNote(item, index)}
                    keyExtractor={(item, index) => JSON.stringify(index)}
                    ItemSeparatorComponent={renderItemSeparator}
                    onScroll={(event) => {
                        let currentOffset = event.nativeEvent.contentOffset.y - 50
                        currentOffset > contentOffset ? setScrollDirection('down') : setScrollDirection('up')
                        setContentOffset(currentOffset)
                    }}
                    style={{ flex: 1, alignSelf: 'stretch' }}
                />
            )}
        </SafeAreaView>
    )
}

export default PublicNoteList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
})
