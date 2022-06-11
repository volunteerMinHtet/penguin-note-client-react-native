import React from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../../theme/themeSlice'
import NoteComponent from '../../components/NoteComponent'
import { fetchNotes, selectNote, setNoteListScrollDirection } from '../noteSlice'

const ItemSeparator = () => {
    return <View style={{ height: 10 }} />
}

const NoteList = () => {
    const [contentOffset, setContentOffset] = React.useState(0)
    const [scrollDirection, setScrollDirection] = React.useState('up')

    const { value, status, message } = useSelector(selectNote)
    const { theme } = useSelector(selectTheme)

    const dispatch = useDispatch()

    React.useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(fetchNotes())
        }

        return () => (mounted = false)
    }, [])

    React.useEffect(() => {
        dispatch(setNoteListScrollDirection(scrollDirection))
    }, [scrollDirection])

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

export default NoteList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        position: 'relative',
    },
})
