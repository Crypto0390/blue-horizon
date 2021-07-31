import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { LogoIcon } from '../../../components/Svg'
import Flex from '../../../components/Box/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from '../icons'
import MenuButton from './MenuButton'

interface Props {
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`

const StyledLink = styled(Link)`
  display: flex;
  .mobile-icon {
    width: 80px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 250px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: flex;
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`

const CustomLogo = styled.div`
  background-image: url('images/logo.png');
  height: 30px;
  width: 30px;
`

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <>
      {/* <CustomLogo  className="desktop-icon" /> */}
      <LogoIcon className="mobile-icon" width="32px"/>
      {/* <img src={LogoIconMobile} alt="Mobile-LogoIcon" className="mobile-icon" />
      <div className="desktop-icon-wrapper">
        <img src={LogoIconMobile} alt="Desktop-LogoIcon" className="desktop-icon" />
        <Text ml="10px" fontFamily="Osiris" fontSize="20px">Blue Horizon</Text>
      </div> */}
      <LogoWithText className="desktop-icon" width="100%" isDark={isDark} />
    </>
  )

  return (
    <Flex>
      <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="5px">
        {isPushed ? <HamburgerCloseIcon width="24px" color="text" /> : <HamburgerIcon width="24px" color="text" />}
      </MenuButton>
      {isAbsoluteUrl ? (
        // <StyledLink as="a" href={href} aria-label="Pancake home page">
        <StyledLink to={href} aria-label="BlueHorizon home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="BlueHorizon home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark)
