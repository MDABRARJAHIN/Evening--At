import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { logout, toggleForm } from '../actions';
import { NOT_LOGGED_IN } from '../actions/types';
import styles from '../css/navbar.module.scss';

const Navbar = ({
  logout,
  username,
  userId,
  loggedIn,
  toggleForm,
  formFlag,
}) => {
  const handleClick = () => {
    logout();
  };

  const openNav = () => {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  };

  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  };

  const loggedInItems = () => (
    <div className={styles.items}>
      <p className="bold text-white">
        <span>Current User:</span>
        {' '}
        {username}
      </p>
      <ul>
        <li className="text-white">
          <Link to="/" className={styles.item}>
            Home
          </Link>
        </li>
        <li>
          <Link to={`/user/${userId}/appointments`} className={styles.item}>
            Appointments
          </Link>
        </li>
        <li>
          <Link to="/restaurants" className={styles.item}>
            All Restaurants
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleClick()}
            className={styles.item}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  const notLoggedInItems = () => (
    <div className={styles.items}>
      <button type="button" onClick={() => toggleForm()} className={styles.item}>
        { formFlag ? 'Sign Up' : 'Login' }
      </button>
    </div>
  );

  return (
    <nav>
      <div id="mySidenav" className={styles.sidenav}>
        <button
          className={styles.closebtn}
          type="button"
          onClick={() => closeNav()}
        >
          &times;
        </button>
        <h2 className="text-center">Choose:</h2>
        <span>
          {loggedIn === NOT_LOGGED_IN ? notLoggedInItems() : loggedInItems()}
        </span>
      </div>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => openNav()}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2 className="text-center">Evening At</h2>
        <button type="button" className={styles.searchBtn}>
          <FontAwesomeIcon icon={faSearchPlus} />
        </button>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  username: undefined,
  userId: undefined,
};

Navbar.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  userId: PropTypes.number,
  loggedIn: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired,
  formFlag: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  userId: state.auth.user.id,
  loggedIn: state.auth.loggedIn,
  loadForm: state.auth.toggleForm,
  formFlag: state.auth.toggleForm,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  toggleForm: () => dispatch(toggleForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
