import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";

class Shelves extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * @param key : the value that the list shall be filtered upon
   * @returns a new list filtered upon the value sent from the UI
   */
  filterBooks = (key) => {
    /* Filter the books upon the value of the shelf and then set the state 
    with the new filtered array 
    */
    const filteredBooks = this.props.myBooks.filter(
      (book) => book.shelf === key
    );
    return filteredBooks || [];
  };

  /**
   * @param shelf : the selected shelf that the user chooses
   * @returns a new array of books with their modified shelves accordingly
   */
  handleShelfChange = (event, book) => {
    // Get the value of the selected shelf
    let selectedShelf = event.target.value;
    update(book, selectedShelf).then((_data) => {
      // Fetch all books again with the data updated for shelves
      getAll().then((data) => {
        // Set the state within the UI to rearrange the books upon the shelves
        this.props.setState({ myBooks: data });
      });
    });
  };

  render() {
    /* Initialize an array of different books types to loop through it and render 
    all books of each type (shelf)
    */
    const shelves = [
      { label: "Currently Reading", value: "currentlyReading" },
      { label: "Want to Read", value: "wantToRead" },
      { label: "Read", value: "read" },
    ];

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map((shelf) => (
                <div key={shelf.value} className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.label}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.filterBooks(shelf.value).map((book, index) => (
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
                                <select
                                  onChange={(event) =>
                                    this.handleShelfChange(event, book)
                                  }
                                  defaultValue={book.shelf}
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
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
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/create">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelves;
