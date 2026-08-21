class Media {
    constructor(title, genre) {
      this._title = title;
      this._isCheckedOut = false;
      this._ratings = [];
      this._genre = genre;
    }
    get title() {
      return this._title;
    }
    get isCheckedOut() {
      return this._isCheckedOut;
    }
    get ratings() {
      return this._ratings;
    }
    get genre() {
      return this._genre;
    }
    set checkedOut(newCheckedOut) {
      this._isCheckedOut = newCheckedOut;
    }
    toggleCheckOutStatus() {
      this._isCheckedOut = !this._isCheckedOut;
    }
    getAverageRating() {
      let ratingsSum = this.ratings.reduce((currentSum, rating) => currentSum + rating, 0);
      const lengthOfArray = this._ratings.length;
      return ratingsSum / lengthOfArray;
    }
    addRating(newRating) {
      this._ratings.push(newRating);
    }
  }
  
  class Book extends Media {
    constructor(author, title, pages, language) {
      super(title);
      this._author = author;
      this._pages = pages;
      this._language = language;
    }
    get author() {
      return this._author;
    }
    get pages() {
      return this._pages;
    }
    get language() {
      return this._language;
    }
  }
  // CREATE BOOK
  const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544, 'English');
  // console.log(historyOfEverything);
  
  // historyOfEverything.toggleCheckOutStatus();
  // console.log(historyOfEverything.isCheckedOut);
  
  // historyOfEverything.addRating(4);
  // historyOfEverything.addRating(5);
  // historyOfEverything.addRating(5);
  // console.log(historyOfEverything.ratings);
  // console.log(historyOfEverything.getAverageRating());
  
  
  class Movie extends Media {
    constructor(director, title, runTime, movieCast) {
      super(title);
      this._director = director;
      this._runTime = runTime;
      this._movieCast = movieCast;
    }
    get director() {
      return this._director;
    }
    get runTime() {
      return this._runTime;
    }
    get movieCast() {
      return this._movieCast;
    }
  }
  // CREATE MOVIE
  const speed = new Movie('Jan de Bont', 'Speed', 116, ['Phil Hartman', 'Jack Black']);
  // console.log(speed);
  
  // speed.toggleCheckOutStatus();
  // console.log(speed.isCheckedOut);
  
  // speed.addRating(1);
  // speed.addRating(1);
  // speed.addRating(5);
  // console.log(speed.ratings);
  // console.log(speed.getAverageRating());
  
  
  class CD extends Media {
    constructor(artist, title, songs, songTitles) {
      super(title);
      this._artist = artist;
      this._songs - songs;
      this._songTitles = songTitles;
    }
    get artist() {
      return this._artist;
    }
    get songs() {
      return this._songs;
    }
    get songTitles() {
      return this._songTitles;
    }
    shuffle() {
      let current = this._songTitles.length;
      while (current != 0) {
        let random = Math.floor(Math.random() * current);
        current--;
        return this._songTitles[random];
      }
    }
  }
  // CREATE CD
  const mmmBop = new CD('Hanson', 'Mmm Bop', 12, ['Mmm Bop', 'Bye Bye Bye', 'Flowers', 'Okay']);
  // console.log(mmmBop);
  
  // mmmBop.toggleCheckOutStatus();
  // console.log(mmmBop.isCheckedOut);
  
  // mmmBop.addRating(4);
  // mmmBop.addRating(3);
  // mmmBop.addRating(5);
  // console.log(mmmBop.ratings);
  // console.log(mmmBop.getAverageRating());
  
  // console.log(mmmBop.shuffle());
  
  
  class Catalog {
    constructor() {
      this._mediaObject = [];
    }
    get mediaObject() {
      return this._mediaObject;
    }
    addToCatalog(mediaObject) {
      this._mediaObject.push(mediaObject);
    }
    findMediaByTitle(title) {
      return this._mediaObject.find(mediaObject => 
        mediaObject.title === title);
    }
    removeMediaByTitle(title) {
      const remove = this._mediaObject.findIndex(mediaObject =>
        mediaObject.title === title);
      this._mediaObject.splice(remove, 1);  
    }
  }
  
  const catalog = new Catalog();
  catalog.addToCatalog(mmmBop);
  catalog.addToCatalog(speed);
  catalog.addToCatalog(historyOfEverything);
  console.log(catalog.mediaObject);