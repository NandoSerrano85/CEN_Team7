import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {orange500, blue500} from 'material-ui/styles/colors';
import style from './AddressField.css';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  customWidth: {
    width: 375,
  },
  checkbox: {
    marginLeft: 100,
    marginBottom: 16,
    maxWidth: 300,
  },
  paperStyle: {
    width: 500,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
};

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

export default class AddressField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      country: 1,
      shippingType: this.props.shippingType,
      duplicateAddress: false,
    };
  }

  countryChange = (event, index, country) => this.setState({country});
  updateCheck() {
    this.setState((oldState) => {
      return {
        duplicateAddress: !oldState.duplicateAddress,
      };
    });
  }

  render() {

    var addressType = "Shipping Address";
    if (this.state.shippingType) {
      addressType = "Billing Address";
    }


    return (
      <div class="addressClass">
        <Paper style={styles.paperStyle} zDepth={5} rounded={true} children={
          <div>
            <h2>{`${addressType}`}</h2>
            {
              (!this.state.duplicateAddress) &&
              <DropDownMenu maxHeight={600} value={this.state.country}
              onChange={this.countryChange} autoWidth={false}
              style={styles.customWidth} underlineStyle={styles.underlineStyle}>
              {countries.map((country, i) => <MenuItem key={i} value={i + 1} primaryText={`${country}`} />)}
              </DropDownMenu>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelText="Full Name:" floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} floatingLabelFixed={true}/>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelText="Street Address:" floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} floatingLabelFixed={true}
              hintText="Street and number, P.O. box, c/o."/>
            }
            {
              (!this.state.duplicateAddress) &&
              <p/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} 
              hintText="Apartment, suite, unit, building, floor, etc."/>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelText="City:" floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} floatingLabelFixed={true}/>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelText="State/Province/Region:" floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} floatingLabelFixed={true}/>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelText="Zip:" floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} floatingLabelFixed={true}/>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }
            {
              (!this.state.duplicateAddress) &&
              <TextField floatingLabelText="Phone Number:" floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
              styles={styles.customWidth} floatingLabelFixed={true}
              hintText="xxx-xxx-xxxx"/>
            }
            {
              (!this.state.duplicateAddress) &&
              <br/>
            }

            {
              (this.state.shippingType) &&
              <Checkbox label="Same as my Shipping Address" checked={this.state.duplicateAddress}
              onCheck={this.updateCheck.bind(this)} style={styles.checkbox} />
            }
          </div>
        } />
      </div>
    );
  }
}



/* CREDIT CARD PIECE

const expirationMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const expirationYears = [];

  constructor(props) {
    super(props);
      this.state = {
        cardMonth: 1,
        cardYear: 1,
      };
    }

  monthChange = (event, index, cardMonth) => this.setState({cardMonth});
  yearChange = (event, index, cardYear) => this.setState({cardYear});

                  <TextField floatingLabelText="Name on Card:" floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
                  styles={styles.customWidth} floatingLabelFixed={true}/>
                  <p/>
                  <TextField floatingLabelText="Card Number:" floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineStyle={styles.underlineStyle}
                  styles={styles.customWidth} floatingLabelFixed={true}/>
                  <p/>
                  <h4>Expiration Date</h4>
                  <DropDownMenu maxHeight={600} value={this.state.cardMonth}
                  onChange={this.monthChange}
                  style={styles.cardWidth} underlineStyle={styles.underlineStyle}>
                    {expirationMonths.map((month, i) => <MenuItem key={i} value={i + 1} primaryText={`${month}`} />)}
                  </DropDownMenu>
                  <DropDownMenu maxHeight={600} value={this.state.cardYear}
                  onChange={this.yearChange}
                  style={styles.cardWidth} underlineStyle={styles.underlineStyle}>
                    {expirationYears.map((year, i) => <MenuItem key={i} value={i + 1} primaryText={`${year}`} />)}
                  </DropDownMenu>
*/