import Constants from 'expo-constants'
import { getBooleanData, storeBooleanData } from '../../utils/localStorage'

const { IS_DARK_THEME_KEY } = Constants.manifest.extra

export const getLastChangedThemeFromStorage = async () => {
    return await getBooleanData(IS_DARK_THEME_KEY ?? '@isDarkTheme')
}

export const storeChangedThemeInStorage = async (isDark) => {
    return await storeBooleanData(IS_DARK_THEME_KEY ?? '@isDarkTheme', isDark)
}
