import React from 'react';
import './Feedback.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
// import Header from '../components/Header';
import { clearState } from '../redux/actions';
import ellipse from '../images/Logo/ellipse.png';
import interrrogacaoPAmarelo from '../images/Logo/interrrogacaoPAmarelo.png';
import interrrogacaoPVerde from '../images/Logo/interrrogacaoPVerde.png';
import interrrogacaoPVermelho from '../images/Logo/interrrogacaoPVermelho.png';
import polygon from '../images/Logo/polygon.png';
import trivia from '../images/Logo/trivia.png';

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
        <img src={ ellipse } alt="ellipse" className="ellipse" />
        <img src={ interrrogacaoPAmarelo } alt="intAmarelo" className="intAmarelo" />
        <img src={ interrrogacaoPVerde } alt="intVerde" className="intVerde" />
        <img src={ interrrogacaoPVermelho } alt="intVermelho" className="intVermelho" />
        <img src={ polygon } alt="polygon" className="polygon" />
        <img src={ trivia } alt="trivia" className="trivia" />
        <div className="footer" />
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}` }
          alt="Foto de perfil"
          className="foto"
        />
        <div className="box" />
        {/* <Header /> */}
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
        {/* </div> */}
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
