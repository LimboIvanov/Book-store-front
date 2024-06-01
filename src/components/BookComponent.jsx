import React, {useState} from "react";
import {createBook} from "../sevices/BookService.js";
import { useNavigate } from "react-router-dom";

const BookComponent = () => {

        const[title, setTitle] = useState('')
        const[author, setAuthor] = useState('')
        const[genre, setGenre] = useState('')
        const[isbn, setIsbn] = useState('')
        const[price, setPrice] = useState('')
        const[description, setDescription] = useState('')
        const[imageUrl, setImageUrl] = useState('')
        const[rating, setRating] = useState('')
        const[inventoryCount, setInventoryCount] = useState('')

        const navigator = useNavigate();

        function handleTitle(e) {
            setTitle(e.target.value);
        }

        function handleAuthor(e) {
            setAuthor(e.target.value);
        }

        function handleGenre(e) {
            setGenre(e.target.value);
        }

        function handleIsbn(e) {
            setIsbn(e.target.value);
        }

        function handlePrice(e) {
            setPrice(e.target.value);
        }

        function handleDescription(e) {
            setDescription(e.target.value);
        }

        function handleImageUrl(e) {
            setImageUrl(e.target.value);
        }

        function handleRating(e) {
            setRating(e.target.value);
        }

        function handleInventoryCount(e) {
            setInventoryCount(e.target.value);
        }

        function saveBook(e) {
            e.preventDefault();

            const book = {title, author, genre, isbn, price, description, imageUrl, rating,  inventoryCount}
            console.log(book)

            createBook(book).then((response) => {
                console.log(response.data);
                navigator('/books')
            })
        }

        return(
            <div className='container'>
                <br/> <br/>
                <div className='card offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Add Book</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Title'
                                    name='title'
                                    value={title}
                                    className='form-control'
                                    onChange={handleTitle}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Author'
                                    name='author'
                                    value={author}
                                    className='form-control'
                                    onChange={handleAuthor}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Genre'
                                    name='genre'
                                    value={genre}
                                    className='form-control'
                                    onChange={handleGenre}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Isbn'
                                    name='isbn'
                                    value={isbn}
                                    className='form-control'
                                    onChange={handleIsbn}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Price'
                                    name='price'
                                    value={price}
                                    className='form-control'
                                    onChange={handlePrice}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Description'
                                    name='description'
                                    value={description}
                                    className='form-control'
                                    onChange={handleDescription}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book ImageUrl'
                                    name='imageUrl'
                                    value={imageUrl}
                                    className='form-control'
                                    onChange={handleImageUrl}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book Rating'
                                    name='rating'
                                    value={rating}
                                    className='form-control'
                                    onChange={handleRating}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <lable className='form-label'></lable>
                                <input
                                    type='text'
                                    placeholder='Enter Book InventoryCount'
                                    name='inventoryCount'
                                    value={inventoryCount}
                                    className='form-control'
                                    onChange={handleInventoryCount}
                                >
                                </input>
                            </div>

                            <button className='btn btn-success' onClick={saveBook}>Submit</button>
                        </form>
                    </div>

                </div>
                BookComponent
            </div>
        )
    }

export default BookComponent