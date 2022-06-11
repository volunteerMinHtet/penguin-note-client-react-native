import Echo from 'laravel-echo'
import Pusher from 'pusher-js/react-native'

let options = {
    key: 'pusher_app_key',
    wsHost: '192.168.99.57',
    wsPort: '6001',
    cluster: 'mt1',
    encrypted: false,
    enabledTransports: ['ws'],
    forceTLS: false,
    disableStats: true,
    logToConsole: true,
    // authEndpoint:  host +'/broadcasting/auth',
    // auth: {
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //     },
    // }
}

let PusherClient = new Pusher(options.key, options)

PusherClient.connection.bind('initialized', () => console.log('PusherClient::initialized'))
PusherClient.connection.bind('connecting', () => console.log('PusherClient::connecting'))
PusherClient.connection.bind('connected', () => console.log('PusherClient::connected'))
PusherClient.connection.bind('error', () => console.log('PusherClient::error'))
PusherClient.connection.bind('unavailable', () => console.log('PusherClient::unavailable'))
PusherClient.connection.bind('failed', () => console.log('PusherClient::failed'))
PusherClient.connection.bind('disconnected', () => console.log('PusherClient::disconnected'))

const echo = new Echo({
    broadcaster: 'pusher',
    client: PusherClient,
    ...options,
})

export default echo
