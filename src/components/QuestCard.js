import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleTypeQuest from './MultipleTypeQuest';

class QuestCard extends Component {
  constructor(props) {
    super(props);
    const { alternatives } = this.props;
    this.state = {
      disabled: 'none',
      alternatives,
    };
    this.getAnswer = this.getAnswer.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.resetButtons = this.resetButtons.bind(this);
    this.adjustQuestion = this.adjustQuestion.bind(this);
  }

  onNextClick() {
    const { nextQuestion } = this.props;
    this.resetButtons();
    nextQuestion();
  }

  getAnswer(answer) {
    const { getUserAnswer } = this.props;
    this.setState({ disabled: 'block' });
    getUserAnswer(answer);
  }

  resetButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.classList.remove('incorrect-answer');
      button.classList.remove('correct-answer');
    });
    this.setState({ disabled: 'none' });
  }

  adjustQuestion(question) {
    // Source:
    // https://stackoverflow.com/questions/5957546/javascript-regex-replacing-quot
    const reg1 = question.replace(/&(lt|gt|quot);/gi, '');
    const reg2 = reg1.replace(/&(lt|gt|#039);/g, '');
    const reg3 = reg2.replace(/&(lt|gt|Eacute);/gi, 'é');
    const reg4 = reg3.replace(/&(lt|gt|amp);/gi, '&');

    return reg4;
  }

  render() {
    const { question } = this.props;
    const { disabled, alternatives } = this.state;
    return (
      <div className="question-box">
        <div className="card">
          <div className="card-header">
            <h1 className="card-header-title" data-testid="question-text">
              { this.adjustQuestion(question.question) }
            </h1>
            <p className="" data-testid="question-category">{ question.category }</p>
          </div>
          <MultipleTypeQuest
            className="button-conteiner"
            alternatives={ alternatives }
            getAnswer={ this.getAnswer }
            adjustAlternative={ this.adjustQuestion }
          />
          <button
            type="button"
            id="next-btn"
            className="button is-primary"
            style={ { display: disabled } }
            data-testid="btn-next"
            onClick={ this.onNextClick }
          >
            Próxima Pergunta
          </button>
        </div>
      </div>
    );
  }
}

QuestCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserAnswer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  alternatives: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default QuestCard;
