import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import UserService from './UserService';
import axios from 'axios';

const expirationMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const countries = [
"-- Select Country --", "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa"
, "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia"
, "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh"
, "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan"
, "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba"
, "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil"
, "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso"
, "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands"
, "Central African Republic", "Chad", "Chile", "China", "Christmas Island"
, "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo"
, "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire"
, "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti"
, "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
, "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands"
, "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories"
, "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland"
, "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau"
, "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)"
, "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of"
, "Iraq", "Ireland", "Isle of Man", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan"
, "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of"
, "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon"
, "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao"
, "Macedonia, the former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia"
, "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania"
, "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of"
, "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar"
, "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand"
, "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands"
, "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama"
, "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland"
, "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation"
, "RWA",, "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha"
, "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon"
, "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe"
, "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore"
, "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia"
, "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan"
, "Spain",  "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland"
, "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China"
, "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo"
, "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan"
, "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates"
, "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay"
, "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam"
, "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna"
, "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];

export default class CreditCardField extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userID: this.props.userID,
        cardName: '',
        cardNumber: '',
        cardCVV: '',
        cardMonth: '01',
        cardYear: 2017,
        duplicateAddress: false,
        country: '-- Select Country --',
        street: '',
        street2: '',
        city: '',
        province: '',
      };
    this.newUserService = new UserService();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.cardNameChange = this.cardNameChange.bind(this);
    this.cardNumberChange = this.cardNumberChange.bind(this);
    this.cardCVVChange = this.cardCVVChange.bind(this);
    this.cardMonthChange = this.cardMonthChange.bind(this);
    this.cardYearChange = this.cardYearChange.bind(this);
    this.duplicateAddressChange = this.duplicateAddressChange.bind(this);
    this.countryChange = this.countryChange.bind(this);
    this.streetChange = this.streetChange.bind(this);
    this.street2Change = this.street2Change.bind(this);
    this.cityChange = this.cityChange.bind(this);
    this.provinceChange = this.provinceChange.bind(this);
    this.zipChange = this.zipChange.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:4200/Users/edit/' + this.props.userID)
    .then(response => {
      this.setState({ userID: this.props.userID});
      try { this.setState({ cardName: response.data.credit_cards[0].name}); } catch(err) {}
      try { this.setState({ cardNumber: response.data.credit_cards[0].number}); } catch(err) {}
      try { this.setState({ cardCVV: response.data.credit_cards[0].cvv}); } catch(err) {}
      try {
        this.setState({ cardMonth: (new Date(response.data.credit_cards[0].expiration)).getMonth()});
      } catch(err) {console.log(err)}
      try {
        this.setState({ cardYear: (new Date(response.data.credit_cards[0].expiration)).getFullYear()});
      } catch(err) {console.log(err)}
      try { this.setState({ duplicateAddress: response.data.credit_cards[0].billing_address.same_Shipping}); } catch(err) {}
      try { this.setState({ country: response.data.credit_cards[0].billing_address.country}); } catch(err) {}
      try { this.setState({ street: response.data.credit_cards[0].billing_address.line_1}); } catch(err) {}
      try { this.setState({ street2: response.data.credit_cards[0].billing_address.line_2}); } catch(err) {}
      try { this.setState({ city: response.data.credit_cards[0].billing_address.city}); } catch(err) {}
      try { this.setState({ province: response.data.credit_cards[0].billing_address.province}); } catch(err) {}
      try { this.setState({ zip: response.data.credit_cards[0].billing_address.zip}); } catch(err) {}
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleSubmit(event) {
    this.newUserService.updatePayment([this.state.cardName, this.state.cardNumber, this.state.cardCVV, this.state.cardMonth, this.state.cardYear, this.state.duplicateAddress, this.state.country, this.state.street, this.state.street2, this.state.city, this.state.province, this.state.zip], this.state.userID);
  }
  cardNameChange(event) {
    this.setState({cardName: event.target.value});
  }
  cardNumberChange(event) {
    this.setState({cardNumber: event.target.value});
  }
  cardCVVChange(event) {
    this.setState({cardCVV: event.target.value});
  }
  cardMonthChange(event) {
    this.setState({cardMonth: event.target.value});
  }
  cardYearChange(event) {
    this.setState({cardYear: event.target.value});
  }
  duplicateAddressChange(event) {
    this.setState({duplicateAddress: !event.target.value});
  }
  countryChange(event) {
    this.setState({country: event.target.value});
  }
  streetChange(event) {
    this.setState({street: event.target.value});
  }
  street2Change(event) {
    this.setState({street2: event.target.value});
  }
  cityChange(event) {
    this.setState({city: event.target.value});
  }
  provinceChange(event) {
    this.setState({province: event.target.value});
  }
  zipChange(event) {
    this.setState({zip: event.target.value});
  }

  getExpYears() {
    let items = [];
     for (let i = (new Date()).getFullYear(); i < (new Date()).getFullYear() + 20; i++) {
        items.push(<option key={i} value={i}>{i}</option>);
     }
     return items;
  }

  getExpMonths() {
    let items = [];
     for (let i = 0; i < expirationMonths.length; i++) {
        items.push(<option key={expirationMonths[i]} value={expirationMonths[i] - 1}>{expirationMonths[i]}</option>);
     }
     return items;
  }

  createSelectItems() {
       let items = [];
       for (let i = 0; i < countries.length; i++) {
          items.push(<option key={i} value={countries[i]}>{countries[i]}</option>);
       }
       return items;
   }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Credit Card</h2>
          Name on Card: <input type="text" value={this.state.cardName} onChange={this.cardNameChange} required/>
          <p/>
          Card Number: <InputMask mask="9999 9999 9999 9999" maskChar="" value={this.state.cardNumber} onChange={this.cardNumberChange} required/>
          <InputMask mask="999" maskChar="" value={this.state.cardCVV} onChange={this.cardCVVChange} required/> cvv
          <p/>
          Expiration Date (MM/YYYY):<br/>
          <select value={this.state.cardMonth} onChange={this.cardMonthChange} required>
            {this.getExpMonths()}
          </select>
          <select value={this.state.cardYear} onChange={this.cardYearChange} required>
            {this.getExpYears()}
          </select>
          <p/><br/>
          <h2>Billing Address</h2>
          {
            (!this.state.duplicateAddress) &&
            <div>
              <select class="countryDropDown" value={this.state.country} onChange={this.countryChange}>
                {this.createSelectItems()}
              </select>
              <p/>
              Street Address: <input type="text" value={this.state.street} onChange={this.streetChange} placeholder="Street and number, P.O. box, c/o." />
              <br/>
              <input type="text"  value={this.state.street2} onChange={this.street2Change} placeholder="Apartment, suite, unit, building, floor, etc." />
              <p/>
              City: <input type="text"  value={this.state.city} onChange={this.cityChange} />
              <p/>
              State/Province/Region: <input type="text"  value={this.state.province} onChange={this.provinceChange} />
              <p/>
              Zip: <InputMask mask="99999" maskChar="" value={this.state.zip} onChange={this.zipChange} />
              <p/>
            </div>
          }
          Same as my Shipping Address: <input type="checkbox"  checked={this.state.duplicateAddress} onChange={this.duplicateAddressChange} />
          <p/>
          <input type="submit" value="Submit Changes" />
        </form>
      </div>
    );
  }
}
