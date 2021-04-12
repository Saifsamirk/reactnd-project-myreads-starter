import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
    };
  }

  /* Create a method that takes the search key word, calls an API and return 
  the corresponding data and display it in the page  
  */
  onSearch = (event) => {
    /*
     Call the function that will fetch the books matching the inserted 
     keyword 
    */
    search(event.target.value).then((data) => {
      // Set the current state and add the fetched data to it
      this.setState((_prevState) => {
        return {
          booksList: data,
        };
      });
    });
  };

  render() {
    console.log("this.state", this.state);
    // Extract the targeted elements from the state using object destructuring
    const { booksList } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksList.map((book, index) => (
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks &&
                          book.imageLinks["thumbnail"]})`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors && book.authors[0]}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Create;
