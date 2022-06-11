import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AccountIcon, LogoutIcon, NightIcon, NotificationBellIcon, RightGoToIcon } from '../common/components/Icon'
import { selectTheme, switchTheme } from '../features/theme/themeSlice'
import Constants from 'expo-constants'
import { logout } from '../features/auth/authSlice'

const SettingScreen = () => {
    const version = Constants.manifest.version

    const { isDark, theme } = useSelector(selectTheme)
    const dispatch = useDispatch()

    const onThemeChange = () => {
        dispatch(switchTheme())
    }

    const onLogoutClick = () => {
        dispatch(logout())
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.listItemContainer}>
                <TouchableOpacity style={styles.listItem}>
                    <View style={styles.listItemLeftIcon}>
                        <AccountIcon size={24} color={theme.colors.text} />
                    </View>
                    <Text style={[styles.listItemText, { color: theme.colors.text }]}>Account</Text>
                    <View style={styles.listItemRightIcon}>
                        <RightGoToIcon size={17} color={theme.colors.text} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                    <View style={styles.listItemLeftIcon}>
                        <NotificationBellIcon size={24} color={theme.colors.text} />
                    </View>
                    <Text style={[styles.listItemText, { color: theme.colors.text }]}>Notification</Text>
                    <View style={styles.listItemRightIcon}>
                        <RightGoToIcon size={17} color={theme.colors.text} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                    <View style={styles.listItemLeftIcon}>
                        <NightIcon size={24} color={theme.colors.text} />
                    </View>
                    <Text style={[styles.listItemText, { color: theme.colors.text }]}>Dark Theme</Text>
                    <View style={styles.listItemRightIcon}>
                        <Switch
                            value={isDark}
                            onValueChange={onThemeChange}
                            thumbColor={isDark ? theme.colors.primary : theme.colors.disabled}
                            style={{ padding: 0 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onLogoutClick} style={styles.listItem}>
                    <View style={styles.listItemLeftIcon}>
                        <LogoutIcon size={24} color={theme.colors.text} />
                    </View>
                    <Text style={[styles.listItemText, { color: theme.colors.text }]}>Log out</Text>
                    <View style={styles.listItemRightIcon}>
                        <RightGoToIcon size={17} color={theme.colors.text} />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <View style={[styles.footer, { borderColor: theme.colors.border }]}>
                <Text style={[styles.footerText, { color: theme.colors.disabled }]}>App version: {version}</Text>
            </View>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    listItemContainer: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 15,
    },
    listItemLeftIcon: {
        marginRight: 16,
    },
    listItemText: {
        flex: 1,
    },
    listItemRightIcon: {},
    footer: {
        borderTopWidth: 1,
    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        padding: 16,
    },
})
