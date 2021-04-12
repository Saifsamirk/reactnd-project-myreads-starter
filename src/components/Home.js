import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { getAll } from "../BooksAPI";
import Shelves from "./Shelves";
import Create from "./Create";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBooks: [],
    };
  }

  // Create a method that will fetch all books the first time
  fetchBooks = () => {
    getAll().then((data) => {
      this.setState({ myBooks: data });
    });
  };

  /**
   Run the following function whenever the component renders 
   */
  componentDidMount() {
    /*
    Fetch all books selected by me and display them as a list here 
    within the component. When the request succeeds, the state is modified 
    and added to it, the list of selected books fetched from the API 
    */
    this.fetchBooks();
  }
  render() {
    // Extract the targeted elements from the state using object destructuring
    const { myBooks } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Shelves
                myBooks={myBooks}
                setState={(data) => this.setState(data)}
              />
            )}
          />
          <Route
            path="/create"
            render={({ history }) => {
              return (
                <Create
                  myBooks={myBooks}
                  fetchBooks={this.fetchBooks}
                  history={history}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default Home;
