// for redux devtools extension
import {ApplicationState} from '../store/types';
declare interface CustomWindow extends Window {
    initialReduxState: ApplicationState;
    devToolsExtension?(): (args?: {}) => {};
}
