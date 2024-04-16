import './index.css';
import GameComponent from "./components/game/game.component";
import { Provider } from 'react-redux';
import './styles/main.scss';
import { configureStore } from '@reduxjs/toolkit';
import reducerGame from './redux/reducers/gameSlice';

function App() {
  const store = configureStore({
    reducer: {
      gameElement: reducerGame
    },
  });

  return (
    <Provider store={store}>
      <GameComponent />
    </Provider>
  );
}

export default App;
