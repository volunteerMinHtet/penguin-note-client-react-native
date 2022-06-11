import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth, selectAuth } from '../features/auth/authSlice'
import { initializeTheme, selectTheme } from '../features/theme/themeSlice'
import AddNoteScreen from '../screens/AddNoteScreen'
import CreateAccountScreen from '../screens/CreateAccountScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SettingScreen from '../screens/SettingScreen'
import { SettingIconBtn } from './components/Button'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AuthenticatedScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false,
                headerRightContainerStyle: {
                    paddingHorizontal: 13,
                },
                headerRight: ({ tintColor, pressColor, pressOpacity }) => (
                    <SettingIconBtn tintColor={tintColor} pressColor={pressColor} pressOpacity={pressOpacity} />
                ),
                tabBarShowLabel: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                // options={{
                //     tabBarIcon: HomeIcon,
                // }}
            />
            <Stack.Screen
                name="CreateNote"
                component={AddNoteScreen}
                options={{
                    // tabBarIcon: AddNoteIcon,
                    title: 'Add Note',
                }}
            />
            <Stack.Screen
                name="Setting"
                component={SettingScreen}
                options={
                    {
                        // tabBarIcon: SettingIcon
                    }
                }
            />
        </Stack.Navigator>
    )
}

const MainLayout = () => {
    const [appIsReady, setAppIsReady] = React.useState(false)

    const themeState = useSelector(selectTheme)
    const authState = useSelector(selectAuth)

    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync()

                if (!themeState.isInitialized) dispatch(initializeTheme())
                if (!authState.isInitialized) dispatch(initializeAuth())

                // await new Promise((resolve) => setTimeout(resolve, 2000))
            } catch (e) {
                console.warn(e)
            } finally {
                // Tell the application to render
                if (themeState.isInitialized && authState.isInitialized) {
                    setAppIsReady(true)
                }
            }
        }

        prepare()
    }, [themeState.isInitialized, authState.isInitialized])

    const onLayoutRootView = React.useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync()
        }
    }, [appIsReady])

    if (!appIsReady) {
        return null
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar
                animated={false}
                backgroundColor={themeState.theme.colors.card}
                barStyle={themeState.isDark ? 'light-content' : 'dark-content'}
            />

            <NavigationContainer theme={themeState.theme} fallback={<ActivityIndicator />}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {!authState.isAuthenticated ? (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
                            <Stack.Screen
                                name="CreateAccount"
                                component={CreateAccountScreen}
                                options={{ title: 'Create New Account' }}
                            />
                        </>
                    ) : (
                        <Stack.Screen name="AuthenticatedScreens" component={AuthenticatedScreens} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'center',
        // marginTop: statusBarHeight,
    },
})
