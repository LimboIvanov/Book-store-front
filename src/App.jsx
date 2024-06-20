import './App.css'
import ListBookComponent from "./components/ListBookComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookComponent from "./components/BookComponent.jsx";
import SearchBookComponent from "./components/SearchBookComponent.jsx";
import BookDetailComponent from "./components/BookDetailComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import {setupAxiosInterceptors} from "./services/AxiosInterceptor.js";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        setupAxiosInterceptors(); // Setup axios interceptors when the app loads
    }, []);

  return (
    <>
        <BrowserRouter>
            <Routes>
                {/*// http://localhost:3000 */}
                <Route path='/' element={ <ListBookComponent />}></Route>
                {/*// http://localhost:3000/books */}
                <Route path='/books' element = { <ListBookComponent /> }> </Route>
                {/*// http://localhost:3000/books/add-book */}
                <Route path='/books/add-book' element = { <BookComponent />}></Route>
                {/*// http://localhost:3000/books/sort */}
                <Route path='/books/sort' element={ <SearchBookComponent/>}></Route>
                {/*// http://localhost:3000/books/:id */}
                <Route path='/books/:id' element={ <BookDetailComponent/>}></Route>
                {/*!// http://localhost:3000/login */}
                <Route path='/login' element={<LoginComponent/>}></Route>
            </Routes>

        </BrowserRouter>
    </>
  )
}

export default App