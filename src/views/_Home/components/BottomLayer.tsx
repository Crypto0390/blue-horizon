import React, { useState } from 'react'
// import styled from 'styled-components'
import { useWalletModal } from 'toolkit/uikit'
import useAuth from 'hooks/useAuth'
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer'
import {
  connect, swap, trade, generate, HomeBottomDots,
  Card1Btn, Card2Btn, Card3Btn, Card4Btn,
  // Card11Btn, Card21Btn, Card31Btn, Card41Btn,
} from '../../../components/Image' 

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    width: '100%',
    border: 'none',
    background: 'none',
  },
  Wrapper: {
    padding: '50px 35px 20px',
    position: 'relative',
  },
  homeBottomDots: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  cardImgOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: '75% 16% 15%',
  },
  cardBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  btnTxt: {
    position: 'absolute',
    width: '100px',
    left: '50px',
    bottom: '60px',
  },
  cardTxt: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    fontSize: '16px',
    color: 'white',
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  cardTitle: {
    fontSize: '20px',
    fontFamily: 'Osiris',
  },
  cardBody: {
    fontSize: '16px',
    fontFamily: 'RobotoRegular',
    marginBottom: '12px',
  }
}));

export default function BottomLayer() {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const classes = useStyles();
  const cards = ['CONNECT', 'SWAP', 'NFT', 'FARMING'];
  const cardInfo = [
    'Connect to the Blue Moon using the wallet.',
    'Swap coins just like the competition.',
    'Earn Blue Moon, Space Shuttle, Alien in NFTs.',
    'Earn up to 758.75% Blue Moon in Farms.',
  ]
  // const colors = [false, false, false, false];
  const init = ['card_img_button', 'card_img_button', 'card_img_button', 'card_img_button'];
  const [cardImgBtn, setCardImgBtn] = useState(init);

  // const [clrs, setClr] = useState(colors);

  // const changeColor = (index: number) => {
  //   const temp = [...clrs];
  //   temp[index] = true;
  //   setClr(temp);
  // }

  const hoverBtn = (card: number) => {
    // switch (card) {
    //   case 'CONNECT': { changeColor(0); break; }
    //   case 'SWAP': { changeColor(1); break; }
    //   case 'NFT': { changeColor(2); break; }
    //   default: { changeColor(3); break; }
    // }
    const temp = init;
    temp[card] = 'card_img_button_hover';
    setCardImgBtn(temp);
  }

  const nHoverBtn = () => {
    setCardImgBtn(init);
  }

  const clickBtn = (card: number) => {
    const temp = [...cardImgBtn];
    temp[card] = 'card_img_button_click';
    setCardImgBtn(temp);
  }

  const imgChange = (i: number) => {
    let result: any;
    // if (clrs[i]) {
    if (i === 0) result = Card1Btn;
    else if (i === 1) result = Card2Btn;
    else if (i === 2) result = Card3Btn;
    else result = Card4Btn;
    // }
    // if (!clrs[i]) {
    //   if (i === 0) result = Card11Btn;
    //   else if (i === 1) result = Card21Btn;
    //   else if (i === 2) result = Card31Btn;
    //   else result = Card41Btn;
    // }
    return result;
  }

  const onClick = (card: string) => {
    console.log('card: ', card);
    if (card === 'CONNECT') onPresentConnectModal();
  }

  return (
    <div className={classes.Wrapper}>
      <div className={classes.homeBottomDots}>
        <img src={HomeBottomDots} width="200" height="200" alt="" />
      </div>
      <div className="container">
        <div className="row">
          {cards.map((card, i) => {
            let imgSrc: any;
            if (card === "CONNECT") imgSrc = connect;
            else if (card === "SWAP") imgSrc = swap;
            else if (card === "NFT") imgSrc = trade;
            else imgSrc = generate;
            return (
              <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3 mb-3 mb-lg-0" id="imageWrapper" key={card}>
                <div className={`card text-white ${classes.cardWrapper}`}>
                  <img className="card-img" src={imgSrc} width='100%' alt="CardImg" />
                  <div className={classes.cardImgOverlay}>
                    <div className={classes.cardTxt}>
                      {/* <div className={classes.cardTitle}>
                        {card}
                      </div>
                      <div className={classes.cardBody}>
                        {cardInfo[i]}
                      </div> */}
                      <div className={classes.cardBtn} role="button" aria-hidden="true"
                        onClick={() => onClick(card)}
                        onMouseOver={() => hoverBtn(i)}
                        onFocus={() => { console.log('onBlur') }}
                        onMouseOut={() => nHoverBtn()}
                        onMouseDown={() => clickBtn(i)}
                        onBlur={() => { console.log('onBlur') }}
                      >
                        <img
                          alt={`${card} btn`}
                          id={cardImgBtn[i]}
                          src={imgChange(i)} width='100%'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <Footer />
        </div>
      </div>
    </div>
  )
}
