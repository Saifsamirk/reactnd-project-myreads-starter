import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import { update } from "../BooksAPI";

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
        // We add a small check using the ternary operator to make the response
        // doesn't return any error
        return {
          booksList: !data || data.error ? [] : data,
        };
      });
    });
  };

  /**
   * @param shelf : the selected shelf that the user chooses
   * The request is sent to the server and the list of selected
   * books is updated accordingly
   */
  handleShelfChange = (book, event) => {
    // Get the value of the selected shelf
    let selectedShelf = event.target.value;
    update(book, selectedShelf).then((_data) => {
      // Fetch the newly updated data and set the state accordingly
      this.props.fetchBooks();
      // Move back to the home page
      this.props.history.push("/");
    });
  };

  /**
   * @param book : takes the book to use its id to filter the selected books
   * and return its shelf value accordingly
   * @returns the value of the shelf of the selected book
   */
  getShelfValue = (book) => {
    // Get the list of selected books from the props using object destructuring
    const { myBooks } = this.props;
    // Get the targeted book by comparing the id's of my selected books with the
    // list of books fetched
    const targetedBook =
      myBooks && myBooks.filter((myBook) => myBook.id === book.id)[0];
    return (targetedBook && targetedBook.shelf) || "none";
  };

  render() {
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
            {booksList &&
              booksList.map((book, index) => (
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
                          defaultValue={this.getShelfValue(book)}
                          onChange={(event) =>
                            this.handleShelfChange(book, event)
                          }
                        >
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
