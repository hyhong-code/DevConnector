import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../img/spinner.gif";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { Link } from "react-router-dom";

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <div>
      {!profile || loading ? (
        <img
          style={{ width: "150px", display: "block", margin: "auto" }}
          src={Spinner}
          alt="spinner"
        />
      ) : (
        <div>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id && (
              <Link className="btn btn-dark" to="/edit-profile">
                Edit profile
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProp, { getProfileById })(Profile);
