import axios from 'axios';

class UserService {

deleteData(id){
    axios.get('http://localhost:4200/items/delete/'+id)
    .then(console.log('Deleted').catch(err => console.log(err)))
  }

updateData(data, id){
    axios.post('http://localhost:4200/items/update/'+id, {
      item: data
    })
    .then(res => this.setState({ items: res.data }))
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