import {createRoot} from 'react-dom/client';
import Library from './library';
import './style.css';
createRoot(document.getElementById('root')!).render(<Library initialBooks={[]}/>);
