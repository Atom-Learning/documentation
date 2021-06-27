import { styled } from '@atom-learning/components'
import * as React from 'react'

type LogoProps = React.ComponentProps<typeof StyledSVG>

const StyledSVG = styled('svg', {})

export const Logo: React.FC<LogoProps> = React.forwardRef((props, ref) => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    width="350"
    height="96"
    viewBox="0 0 350 96"
    {...props}
    ref={ref}
  >
    <title>Atom Learning Design System</title>
    <path d="M234.2 93.5a2.2 2.2 0 01-2.2 2.1h-96.4a2.2 2.2 0 01-2.2-2.2 49.8 49.8 0 0150.4-48.3 49.7 49.7 0 0150.4 48.2v.2zm-10-53.4a10 10 0 100-19.9 10 10 0 000 19.9z" />
    <path d="M86.6 93.4a2.2 2.2 0 01-2.2 2.2H2.8a2.2 2.2 0 01-2.2-2.2c0-.5.2-.9.4-1.3l40.7-70.9a2.4 2.4 0 011.9-1 2.2 2.2 0 011.8 1l40.8 71c.2.3.4.7.4 1.2z" />
    <path d="M347.4 20.2c-.4 0-.8.2-1.1.4l-48.6 36c-.3.2-.7.4-1.1.4-.4 0-.8-.1-1-.4h-.2l-48.1-35.9a1.9 1.9 0 00-1.1-.3 2.1 2.1 0 00-2 2.2v70.8a2.1 2.1 0 002 2.2h101.2a2.1 2.1 0 002-2.2v-71a2.2 2.2 0 00-2-2.2z" />
    <path d="M136 20.4h-11.6a1.1 1.1 0 01-1.1-1.1V2.6a2.2 2.2 0 00-2.2-2.2H98.8a2.2 2.2 0 00-2.3 2.2v90.8a2.2 2.2 0 002.2 2.2H121a2.2 2.2 0 002.3-2.2V48.2a1.1 1.1 0 01.3-.7 1 1 0 01.8-.4H136a2.2 2.2 0 002.2-2.2V22.6a2.2 2.2 0 00-2.2-2.2z" />
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h348.8v95.2H0z" transform="translate(.6 .4)" />
      </clipPath>
    </defs>
  </StyledSVG>
))
