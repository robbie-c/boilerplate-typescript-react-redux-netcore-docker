// for redux devtools extension
import {ApplicationState} from '../store/index';
declare interface CustomWindow extends Window {
    initialReduxState: ApplicationState;
    devToolsExtension?(): (args?: {}) => {};
}
