import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Firebase from 'app/services/firebase';
import { CarouselItem } from 'app/components/common/PopUpCarousel';
import { saveProfile } from 'app/actions/authActions';

class SelectRideDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      seats: '1',
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('.timepicker').pickatime({
      default: 'now',
      fromnow: 1800000,
      twelvehour: false,
      donetext: 'Select',
      cleartext: 'Clear',
      canceltext: 'Cancel',
      autoclose: true,
      aftershow: () => {}
    });
    $('#setup-time').change(() => {
      this.setState({ time: $('#setup-time').val() });
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  save() {
    if (this.state.time && this.state.seats) {
      console.log(this.state);
      Firebase.saveProfile(this.props.uid, this.state)
        .then(() => {
          this.props.nextItem();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Materialize.toast('Please fill in all options', 2000, 'red');
    }
  }

  render() {
    return (
      <CarouselItem title="Configure your default ride" className="centered">
        <div className="row centered-container">
          <form className="setup-ride-details col s12">
            <div className="row">
              <div className="input-field col offset-m2 m8 s12 left-align">
                <input
                  id="setup-time"
                  name="time"
                  type="text"
                  className="timepicker"
                />
                <label htmlFor="setup-time">What time do you normally depart?</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col offset-m2 m8 s12 left-align">
                <select
                  id="setup-seats"
                  name="seats"
                  value={this.state.seats}
                  onChange={this.onChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <label htmlFor="setup-seats">How many seats does your ride offer?</label>
              </div>
            </div>
          </form>
        </div>
        <div className="card-carousel-action">
          <button className="btn-flat" onClick={this.save}>Save</button>
        </div>
      </CarouselItem>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveProfile: profileDetails => dispatch(saveProfile(profileDetails))
});

export default connect(undefined, mapDispatchToProps)(SelectRideDetails);
