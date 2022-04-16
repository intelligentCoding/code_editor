import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state'
import TextEditor from './components/text-editor';

const App = () => {
    


    return <div>
        <Provider store={store}>
            <TextEditor />
        </Provider>
    </div>
}

ReactDOM.render(<App/>, document.querySelector('#root'));