import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignUp from './components/sign-up-form/sign-up-form.component';


const Shop = () => {
  return (
    <h1>Shop Page</h1>
  );
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignUp />} />
      </Route>

    </Routes>
  );
}

export default App;