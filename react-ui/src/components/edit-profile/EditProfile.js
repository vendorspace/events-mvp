import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from '../../validation/is_empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      website: "",
      location: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
          this.setState( {errors: nextProps.errors} )
      }

      if(nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

        // Bring skills array back to CSV
        
        
        // If profile field doesn't exist, make empty string
        profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
        profile.website = !isEmpty(profile.website) ? profile.website : '';
        profile.location = !isEmpty(profile.location) ? profile.location : '';
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

        //set component fields state
        this.setState({
          handle: profile.handle,
          website: profile.website,
          location: profile.location,
          social: profile.social,
          twitter: profile.twitter,
          facebook: profile.facebook,
          linkedin: profile.linkedin
        });
      }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
        handle: this.state.handle,
        website: this.state.website,
        location: this.state.location,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin
    }
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if(displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                />
                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />
                <InputGroup
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                />
            </div>
        )
    } 

    const options = [{ label: "* Select Professional Status", value: 0 }];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              
            </div>
            <small className="d-block pb-3">* = required fields </small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for your profile URL."
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Your company website."
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="Your business address."
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));