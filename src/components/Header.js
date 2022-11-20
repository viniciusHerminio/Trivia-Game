import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { AiFillStar, AiFillSetting } from 'react-icons/ai';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail, redirectPage } = this.props;

    return (
      <div className={ styles.divMaster }>
        <div className={ styles.nameImage }>
          <img
            className={ styles.imageProfile }
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}` }
            alt="Foto de perfil"
          />
          <p data-testid="header-player-name">{name}</p>
        </div>
        <div className={ styles.points }>
          <AiFillStar className={ styles.star } />
          <p data-testid="header-score">{`Pontos: ${score}`}</p>
        </div>
        <button
          type="button"
          data-testid="btn-settings"
          className={ styles.buttonSettings }
          onClick={ () => redirectPage() }
        >
          <AiFillSetting className={ styles.settings } />
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  redirectPage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
