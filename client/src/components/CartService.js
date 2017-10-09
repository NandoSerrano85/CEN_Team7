import axios from 'axios';

class CartService {

    sendData(data){
        axios.post('http://localhost:4200/cart/', {
            item: data
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

export default CartService;
