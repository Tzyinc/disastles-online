import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import obstruction from 'obstruction';
import { partial } from 'ap';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from './card';

import { selectCard } from '../../actions/player';

import backgroundLeft from './images/header-shop-left.png';
import backgroundRight from './images/header-shop-right.png';
import backgroundCenter from './images/header-shop-center.png';
import cardSlot from './images/header-card-slot.png';

const styles = theme => ({
  root: {
    flex: '0 0 auto',
    height: 184,
    display: 'flex',
    flexDirection: 'rows',
  },
  left: {
    background: 'url(' + backgroundLeft + ') no-repeat',
    width: 123,
    height: 184,
    flex: '0 0 auto'
  },
  right: {
    background: 'url(' + backgroundRight + ') no-repeat',
    width: 133,
    height: 184,
    flex: '0 0 auto'
  },
  wrapper: {
    background: 'url(' + backgroundCenter + ') repeat-x',
    height: 184,
    flex: '1 0 auto',
    paddingTop: 20,
    display: 'flex'
  },
  card: {
    background: 'url(' + cardSlot + ') no-repeat',
    transform: 'translateX(-40px)',
    marginRight: 40,
  }
});

class Shop extends Component {
  constructor () {
    super();

    this.renderCard = this.renderCard.bind(this);
    this.selectCard = this.selectCard.bind(this);
  }

  selectCard (card) {
    this.props.dispatch(selectCard(card));
  }

  render () {
    let shop = this.props.shop || [];

    return (
      <div className={ this.props.classes.root }>
        <div className={ this.props.classes.left }>
        </div>
        <div className={ this.props.classes.wrapper }>
          { shop.map(this.renderCard) }
        </div>
        <div className={ this.props.classes.right }>
        </div>
      </div>
    );
  }

  renderCard (card) {
    var isClickable = false;
    this.props.actions.forEach(function (action) {
      if (action.action == 'BuildRoom' && action.card === card) {
        isClickable = true;
      }
    })
    console.log(card);
    if (isClickable) {
      return (
        <Card
          className= { this.props.classes.card }
          onClick={ partial(this.selectCard, card) }
          card={ card }
          key={ card }
          skinny
          />
      );
    }
    return (
      <Card
        className= { this.props.classes.card }
        card={ card }
        key={ card }
        skinny
        />
    );
  }
}

const mapToProps = obstruction({
  cards: 'cards.knownCards',
  actions: 'game.actions',
  shop: 'game.shop'
});

export default withStyles(styles)(connect(mapToProps)(Shop));