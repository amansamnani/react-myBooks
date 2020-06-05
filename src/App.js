import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves';
import Search from './components/Search';
import SearchButton from './components/SearchButton';
import Header from './components/Header';
import Shelf from './components/Shelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books : []
  };

  updateSearchPageState = (state) => {
    console.log("here", this);
    this.setState({showSearchPage : state})
  };

  componentDidMount() {
    BooksAPI.getAll().then(response => this.setState({ books : response }));
  }

  changeBookShelf = (book, shelf) => {

    // moveBook = (book, shelf) => {
    // const updatedBooks = this.state.books.map(b => {
    //   if (b.id === book.id) {
    //     b.shelf = shelf;
    //   }
    //   return b;
    // });

    // this.setState({
    //   books: updatedBooks,
    // });
    //};
  
    // this.setState({
    //  books: this.state.books.map(b => {
    //    b.shelf = b.id === book.id && shelf;
    //    return b;
    //  })
    // });

    // this.setState({
    //   books : this.state.books.map(b => {
    //     if (b.id === book.id) {
    //       b.shelf = shelf;
    //     }
    //     return b;
    //   })
  
      
    //   });
    //   this.setState({
    //     books: updatedBooks,
    //  });
    console.log(`moving ${book.id} to ${shelf}`);
    
    book.shelf = shelf;
    this.setState(({ books }) => ({
      books: books.filter(b => b.id !== book.id).concat(book),
    }));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search showSearchPage = {this.updateSearchPageState}/> 
        ) : (
          <div className="list-books">
            <Header />
            <Shelves allBooks = {this.state.books} changeShelf = {this.changeBookShelf}/>
            <SearchButton  showSearchPage = {this.updateSearchPageState}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;
