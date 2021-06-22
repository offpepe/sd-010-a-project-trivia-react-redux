import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.styleSpan = this.styleSpan.bind(this);
    this.styleSpan2 = this.styleSpan2.bind(this);
    this.styleScore = this.styleScore.bind(this);
    this.updateRanking = this.updateRanking.bind(this);
  }

  updateRanking() {
    const { userName, userScore, userEmail } = this.props;
    if (window.localStorage.getItem('ranking')) {
      const rankingToPush = JSON.parse(window.localStorage.getItem('ranking'));
      rankingToPush.push({ name: userName, score: userScore, picture: `https://www.gravatar.com/avatar/${md5(userEmail)}` });
      rankingToPush.sort((a, b) => b.score - a.score);
      window.localStorage.setItem('ranking', JSON.stringify(rankingToPush));
    } else {
      const firstRankingData = [{ name: userName, score: userScore, picture: `https://www.gravatar.com/avatar/${md5(userEmail)}` }];
      window.localStorage.setItem('ranking', JSON.stringify(firstRankingData));
    }
  }

  styleSpan() {
    return (
      <span
        className="title is-4"
        data-testid="feedback-text"
      >
        Podia ser melhor...
      </span>);
  }

  styleSpan2() {
    return (
      <span
        className="title is-4"
        data-testid="feedback-text"
      >
        Mandou bem!
      </span>);
  }

  styleScore() {
    const { userAssertions } = this.props;
    return (
      <div>
        <h3 className="title is-5">Quantidades de respostas corretas:</h3>
        <h3
          className="title is-5"
          data-testid="feedback-total-question"
        >
          { userAssertions }
        </h3>
      </div>
    );
  }

  render() {
    const { userAssertions, userScore } = this.props;
    const minScore = 3;
    this.updateRanking();

    return (
      <>
        <Header />
        <section className="xablau">
          <h3 className="title">A sua pontuação total foi: </h3>
          <h3 className="title is-3">{userScore}</h3>
          {(userAssertions < minScore)
            ? this.styleSpan()
            : this.styleSpan2() }
          <div>
            <h3 className="title is-5">Quantidades de respostas corretas:</h3>
            <h3
              className="title is-5"
              data-testid="feedback-total-question"
            >
              { userAssertions }
            </h3>
          </div>
          <Link to="/ranking">
            <button
              className="button"
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              className="button"
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
        </section>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.score.assertions,
  userScore: state.score.score,
  userName: state.login.name,
  userEmail: state.login.email,
});

Feedback.propTypes = {
  userAssertions: Proptypes.number,
  userScore: Proptypes.number,
  userName: Proptypes.string,
  userEmail: Proptypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
