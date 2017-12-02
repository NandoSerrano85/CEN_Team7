import axios from 'axios';

class cartservice {
    addToCart(data, id){
        axios.get('http://localhost:4200/cart/add-to-cart/'+id, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    reduce(data, id){
        axios.post('http://localhost:4200/cart/reduce/'+id, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    remove(data, id){
        axios.post('http://localhost:4200/cart/remove/'+id, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

}

export default cartservice;
