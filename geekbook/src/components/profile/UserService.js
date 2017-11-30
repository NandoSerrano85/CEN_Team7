import axios from 'axios';

class UserService {

  updateLogin(data, id){
    axios.post('http://localhost:4200/Users/updateLogin/'+id, {
      credentials: {local: {password: data}}
    })
    .then(res => this.setState({ items: res.data }))
    .catch(err => console.log(err))
  }

  updatePersonal(data, id){
    axios.post('http://localhost:4200/Users/updatePersonal/'+id, {
      name: data[0],
      emails: [{email: data[1], default: true}],
      phones: [{phone: data[2], default: true}],
      nickname: data[3],
    })
    .then(res => console.log(res.body))
    .catch(err => console.log(err))
  }

  updatePayment(data, id){
    axios.post('http://localhost:4200/Users/updatePayment/'+id, {
      credit_cards: [{ name: data[0], number: data[1], cvv: data[2], expiration: (new Date(data[4], data[3], '01', 0, 0, 0, 0)), billing_address: {
        same_Shipping: data[5], country: data[6], line_1: data[7], line_2: data[8], city: data[9], province: data[10], zip: data[11]
      }, default: true}]
    })
    .then(res => console.log(res.body))
    .catch(err => console.log(err))
  }

  updateAddress(data, id){
    axios.post('http://localhost:4200/Users/updateAddress/'+id, {
      addresses: [{ country: data[0], line_1: data[1], line_2: data[2], city: data[3], province: data[4], zip: data[5], default: true}]
    })
    .then(res => console.log(res.body))
    .catch(err => console.log(err))
  }

  sendData(data) {
    axios.post('http://localhost:4200/Users/add/post', {
      credentials: {local: {username: data[0], password: data[1]}},
      name: data[2],
      emails: [{email: data[3], default: true}],
      nickname: data[4],
  })
  .then(function (response) {
    console.log(response.data._id);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}

export default UserService;
