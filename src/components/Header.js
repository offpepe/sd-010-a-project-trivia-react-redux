import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userName, userEmail, userScore } = this.props;
    return (
      <div className="header">
        <div className="ctn-user-img">
          <img
            className="user-img"
            src={ `https://www.gravatar.com/avatar/${md5(userEmail)}` }
            alt="Sua Foto do Gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div className="ctn-squirrel">
          <h1 className="title">Shipit Trivia Game</h1>

          <img className="squirrel" src="https://66.media.tumblr.com/tumblr_maw6nhSaKa1rfjowdo1_500.gif" alt="squirrel-gif" />
        </div>
        <div className="header-user-info">
          <p className="title is-4" data-testid="header-player-name">{ userName }</p>
          <p className="subtitle is-2" data-testid="header-score">{ userScore }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.name,
  userEmail: state.login.email,
  userScore: state.score.score,
});

Header.propTypes = {
  name: string,
  email: string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
