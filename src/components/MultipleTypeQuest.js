import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MultipleTypeQuest.css';

class MultipleTypeQuest extends Component {
  constructor() {
    super();
    this.addAnswerBorder = this.addAnswerBorder.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addAnswerBorder() {
    const wrongButtons = document.getElementsByClassName('wrong');
    const correctButton = document.getElementsByClassName('correct')[0];
    for (let index = 0; index < wrongButtons.length; index += 1) {
      wrongButtons[index].classList.add('incorrect-answer');
    }
    correctButton.classList.add('correct-answer');
  }

  handleClick(e) {
    const { getAnswer } = this.props;
    this.addAnswerBorder();
    getAnswer({
      validation: e.target.className,
      questionDifficulty: e.target.parentNode.className,
    });
  }

  render() {
    const { alternatives, adjustAlternative } = this.props;
    return (
      <section className={ alternatives.difficulty }>
        { alternatives.alt
          .map((alternative, index) => {
            const adjustAlternat = adjustAlternative(alternative.text);
            return (
              <button
                type="button"
                className={ alternative.class }
                onClick={ this.handleClick }
                key={ index }
                data-testid={ alternative.dataTest }
                disabled={ false }
              >
                { adjustAlternat }
              </button>);
          }) }
      </section>
    );
  }
}

MultipleTypeQuest.propTypes = {
  alternatives: PropTypes.shape({
    difficulty: PropTypes.string,
    alt: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getAnswer: PropTypes.func.isRequired,
  adjustAlternative: PropTypes.func.isRequired,
};

export default MultipleTypeQuest;
