import './App.css';
import ShortUrl from './components/shortUrl';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import RedirectUrl from './components/redirectUrl';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ShortUrl />} />
        {/* <Route path="/redirect" component={Home} /> */}
        <Route path=":shortUrl" element={<RedirectUrl />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
