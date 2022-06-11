// const HOST_SERVER_ADDRESS = 'http://10.0.2.2:80'
const HOST_SERVER_ADDRESS = 'http://192.168.99.57:80'
const API_VERSION = 'v1'

export default ({ config }) => ({
    ...config,
    extra: {
        SERVER_API_URL: `${HOST_SERVER_ADDRESS}/api/${API_VERSION}`,
        AUTH_TOKEN_KEY: '@authToken',
        IS_DARK_THEME_KEY: '@isDarkTheme',
    },
})
