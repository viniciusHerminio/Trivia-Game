import React from 'react';
import './Feedback.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
// import Header from '../components/Header';
import { clearState } from '../redux/actions';
import logoTrivia from '../images/logoTrivia.png';

class Feedback extends React.Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearState());
  };

  rankingScreen = () => {
    const { history, dispatch } = this.props;
    history.push('/ranking');
    dispatch(clearState());
  };

  render() {
    const { assertions, score, gravatarEmail } = this.props;
    const minimo = 3;
    return (
      <div>
        <div className="footer" />
        <img src={ logoTrivia } alt="Logo" className="logoTrivia" />
        <div className="containerFeedback">
          <div className="box">
            {/* <Header /> */}
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}` }
              alt="Foto de perfil"
              className="foto"
            />
            {
              assertions < minimo
                ? (
                  <p
                    data-testid="feedback-text"
                    className="mensagem"
                  >
                    Could be better...
                  </p>
                )
                : <p data-testid="feedback-text" className="mensagem">Well Done!</p>
            }
            <p data-testid="feedback-total-question" className="assertions">
              Você acertou
              {' '}
              {assertions}
              {' '}
              questões!
            </p>
            <p data-testid="feedback-total-score" className="score">
              Um total de
              {' '}
              {score}
              {' '}
              pontos
            </p>
          </div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
            className="play"
          >
            Play Again

          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.rankingScreen }
            className="ranking"
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
