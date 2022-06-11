import { RootSiblingParent } from 'react-native-root-siblings'
import { Provider } from 'react-redux'
import { store } from './app/store'
import MainLayout from './common/MainLayout'

export default function App() {
    return (
        <RootSiblingParent>
            <Provider store={store}>
                <MainLayout />
            </Provider>
        </RootSiblingParent>
    )
}
