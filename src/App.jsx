import './App.css'
import ListBookComponent from "./components/ListBookComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookComponent from "./components/BookComponent.jsx";
import SearchBookComponent from "./components/SearchBookComponent.jsx";

function App() {

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
            </Routes>

        </BrowserRouter>
    </>
  )
}

export default App
