import axios from 'axios';

class BookService {

    getBooks(){
      var books = [];
      // Fetch data from server
      axios.get('http://localhost:4100/books')
      .then(function(response){
        var books = response.data;
        return response;

      });
    }

}

export default BookService;
