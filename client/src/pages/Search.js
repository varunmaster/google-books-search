import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Container from '../components/Container';
import Row from '../components/Row';
import Column from '../components/Column';
import Card from '../components/Card';
import { searchGoogleBooks, saveBook, getSavedBooks } from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '', //the book to search
    bookList: [], //the result from api call
    savedBookIds: [], //id of books that are saved, to prevent the user from saving the same book multiple times
    error: null
  };

  handleInputChange = event => { //this is boilerplate stuff and can be reused 
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.searchTerm === '') {
      return this.setState({ error: 'Please put in a title.' });
    }

    searchGoogleBooks(this.state.searchTerm)
      .then(res => {
        const { items } = res.data; //after we make the call to google, the result of the call will be in res.data (its res.data bc we are using axios) and then we are pulling out 'items' from the response
        this.setState({ error: null }); //resetting the error back kto null

        const bookListCleaned = items.map(book => { //we are getting a lot of info back from google api but we only want certain info which is defined in the model and we are creating a new object with just that info using the map() function
          return {
            bookId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : '' //if book.volumeInfo.imageLinks exists then we are setting the image property as the thumbnail otherwise it will be ''
          };
        });

        return this.setState({ bookList: bookListCleaned, searchTerm: '' }); //after we call the api and clean up the list, we are going to set the state property bookList as bookListCleaned and then reset the searchTerm to empty
      })
      .then(this.retrieveSavedBooks)
      .catch(err => this.setState({ error: err }));
  };

  //this function is basically going to call the api function getSavedBooks() and then the returned data will be mapped over and only return the bookId and put it in the savedBookIds variable and then updating the state
  retrieveSavedBooks = () => {
    getSavedBooks()
      .then(res => {
        const savedBookIds = res.data.map(book => book.bookId);
        this.setState({ savedBookIds }); //because the name from above matches the state property, we don't have to say savedBookIds: savedBookIds
      })
      .catch(err => this.setState({ error: err }));
  };

  handleBookSaveBook = bookId => {
    const book = this.state.bookList.find(book => book.bookId === bookId); //we are finding one book from the state property bookList and matching the ID of that and the bookID we pass in into the function
    saveBook(book) //calling the backend with the object from the line above
      .then(() => {
        const savedBookIds = [...this.state.savedBookIds, bookId]; //we cannot push into an array so we are taking the current state with the spread notation and then adding the new bookId to that local array savedBookIds
        this.setState({ savedBookIds }); //then we are taking that local array savedBookIds and then updated the state (which is also the same name) and setting that
      })
      .catch(err => this.setState({ error: err }));
  };

  render() {
    return (
      <> {/*this is a fragment and an alternative to using div in case you don't want to use div */}
        <Jumbotron
          fluid
          bg={'dark'}
          color={'light'}
          pageTitle={'Search For Books'}
        />
        <Container>
          <Row>
            <Column sm={12} md={4}>
              <Card title={'Search for a book'}>
                <form onSubmit={this.handleFormSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a book"
                    onChange={this.handleInputChange}
                    value={this.state.searchTerm}
                    name="searchTerm"
                  />
                  {this.state.error && !this.state.searchTerm.length && (
                    <div className="alert alert-danger my-2">
                      {this.state.error}
                    </div>
                  )}
                  <button type="submit" className="btn btn-block btn-dark mt-2">
                    Search For Books
                  </button>
                </form>
              </Card>
            </Column>
            <Column sm={12} md={8}>
              <Row>
                {!this.state.bookList.length ? (
                  <h2 className="text-center">Search for books to begin</h2>
                ) : (
                  this.state.bookList.map(book => {
                    return (
                      <Column key={book.bookId} md={4}>
                        <Card
                          title={book.title}
                          image={book.image ? book.image : undefined}>
                          <small className="text-muted">
                            {`By: ${
                              book.authors.length
                                ? book.authors.join(', ')
                                : null
                            }`}
                          </small>
                          <p>{book.description}</p>

                          <button
                            disabled={
                              this.state.savedBookIds.includes(book.bookId)
                                ? true
                                : undefined
                            }
                            className={'btn btn-success btn-sm'}
                            onClick={() =>
                              this.handleBookSaveBook(book.bookId)
                            }>
                            Save Book
                          </button>
                        </Card>
                      </Column>
                    );
                  })
                )}
              </Row>
            </Column>
          </Row>
        </Container>
      </>
    );
  }
}

export default Search;
