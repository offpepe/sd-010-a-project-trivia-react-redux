import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { changeConfigs } from '../redux/actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: '',
      category: '',
      amount: 5,
      type: '',
      difficulty: '',
      time: 30,
      redirect: false,
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.sendConfigs = this.sendConfigs.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleChange({ target }) {
    const { value, id } = target;
    if ((id === 'category' || id === 'type' || id === 'difficulty') && value !== '') {
      this.setState({
        [id]: `&${id}=${value}`,
      });
    } else {
      this.setState({
        [id]: value,
      });
    }
  }

  async fetchCategories() {
    const categories = await (await fetch('https://opentdb.com/api_category.php')).json();
    this.setState({
      categories,
    });
  }

  sendConfigs(event) {
    event.preventDefault();
    const { category, amount, type, difficulty, time } = this.state;
    const { updateConfigs } = this.props;

    const configs = {
      category,
      amount,
      type,
      difficulty,
      time,
    };
    updateConfigs(configs);
    this.setState({
      redirect: true,
    });
  }

  renderTime() {
    return (
      <label className="label" htmlFor="time">
        <h2 className="subtitle is-5"> Tempo para resposta </h2>
        <input
          className="input is-rounded"
          type="number"
          min="30"
          max="90"
          id="time"
          onChange={ this.handleChange }
        />
      </label>);
  }

  renderOptions() {
    return (
      <select
        className="select is-rounded"
        id="difficulty"
        onChange={ this.handleChange }
      >
        <option value="">Todos</option>
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </select>
    );
  }

  render() {
    const { categories, redirect } = this.state;
    return (
      <form onSubmit={ this.sendConfigs } className="setting-forms">
        <h1 className="title is-2" data-testid="settings-title">Configurações de Jogo</h1>
        <label className="label" htmlFor="category">
          <h2 className="subtitle is-5">Categoria</h2>
          <select className="select" id="category" onChange={ this.handleChange }>
            <option value="">Todos</option>
            {(categories)
              ? categories.trivia_categories.map((categorie, key) => (
                <option key={ key } value={ categorie.id }>
                  {categorie.name}
                </option>))
              : 'Loading...'}
          </select>
        </label>
        <label className="label" htmlFor="difficulty">
          <h2 className="subtitle is-5">Dificuldade</h2>
          { this.renderOptions() }
        </label>
        <label className="label" htmlFor="type">
          <h2 className="subtitle is-5">Tipo de questão</h2>
          <select className="select is-rounded" id="type" onChange={ this.handleChange }>
            <option value="">Ambas</option>
            <option value="boolean">Verdadeiro ou Falso</option>
            <option value="multiple">Múltipla escolha</option>
          </select>
        </label>
        <label className="label" htmlFor="amount">
          <h2 className="subtitle is-5">Quantidade de perguntas</h2>
          <input
            type="number"
            className="input is-rounded"
            id="amount"
            onChange={ this.handleChange }
          />
        </label>
        {this.renderTime()}
        <div>
          <button className="button is-submit" type="submit"> Alterar </button>
        </div>
        {redirect && <Redirect to="/" /> }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateConfigs: (configs) => (dispatch(changeConfigs(configs))),
});

Settings.propTypes = {
  updateConfigs: Proptypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
