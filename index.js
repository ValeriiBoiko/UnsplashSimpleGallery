import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import RootNavigator from './navigation/RootNavigator';

AppRegistry.registerComponent(appName, () => RootNavigator);
