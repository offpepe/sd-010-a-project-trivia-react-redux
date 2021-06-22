import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaMedal } from 'react-icons/fa';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(window.localStorage.getItem('ranking'));
    return (
      <section>
        <h1 className="title is-2 title-h1" data-testid="ranking-title">Ranking</h1>
        <ol className="card-ol">
          {ranking.map((item, index) => (
            <li className="card card-li" key={ index }>
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  src={ item.picture }
                  alt={ `Foto do ${item.name}` }
                />
              </figure>
              <div className="card-cnt-p container">
                <FaMedal className="medal" />
                <p
                  className="card-title"
                  data-testid={ `player-name-${index}` }
                >
                  {item.name}
                </p>
                <p
                  className="card-content card-p"
                  data-testid={ `player-score-${index}` }
                >
                  {item.score}

                </p>
              </div>
            </li>))}
        </ol>
        <Link to="/">
          <button
            className="button-rank button"
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>

        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.name,
  userScore: state.score.score,
  userEmail: state.login.email,
});

export default connect(mapStateToProps, null)(Ranking);
