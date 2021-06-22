import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FcSettings } from 'react-icons/fc';
import { buttonLoginAction, resetScoreAction } from '../redux/actions';
import Squirrel from '../assets/squirrel.png';

import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.verify = this.verify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.render = this.render.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verify());
  }

  verify() {
    const { name, email } = this.state;
    const result = /\w+@\w+\.\w+/gi.test(email);
    const resultName = /\w+/gi.test(name);
    if (result && resultName) {
      this.setState({
        disabled: false,
      });
    } else { this.setState({ disabled: true }); }
  }

  renderSettings() {
    return (
      <Link to="/configuracoes">
        <FcSettings
          style={ { fontSize: '1.8em' } }
          type="button"
          data-testid="btn-settings"
        />
      </Link>);
  }

  render() {
    const { loginAction, resetScore, configs } = this.props;
    const { disabled, name, email } = this.state;
    return (
      <form className="flex box">
        <fieldset className="fieldset">
          <section className="logo-img">
            <h1 className="title has-text-right"> Shipit Trivia</h1>
            <img src={ Squirrel } alt="" />
          </section>
          <label htmlFor="email">
            Email:
            <input
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              className="input is-info"
              placeholder="Your e-mail"
            />
          </label>
          <label htmlFor="name">
            Name:
            <input
              onChange={ this.handleChange }
              data-testid="input-player-name"
              type="text"
              name="name"
              className="input is-info"
              placeholder="Your name"
            />
          </label>
          <Link to="/game">
            <button
              onClick={ () => { loginAction(name, email, configs); resetScore(); } }
              disabled={ disabled }
              data-testid="btn-play"
              type="button"
              className="button is-warning"
            >
              Jogar
            </button>
            { this.renderSettings() }
          </Link>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  configs: state.configs,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (name, email, configs) => dispatch(
    buttonLoginAction(name, email, configs),
  ),
  resetScore: () => dispatch(resetScoreAction()),
});

Login.propTypes = {
  loginAction: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
