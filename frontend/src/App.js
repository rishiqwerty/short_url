import './App.css';
import ShortUrl from './components/shortUrl';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ShortUrl />} />
        {/* <Route path="/redirect" component={Home} /> */}
        <Route path=":shortUrl" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
