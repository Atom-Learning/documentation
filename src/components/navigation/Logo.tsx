import { styled } from '@atom-learning/components'
import * as React from 'react'

type LogoProps = React.ComponentProps<typeof StyledSVG>

const StyledSVG = styled('svg', {})

export const Logo: React.FC<LogoProps> = (props) => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    width="350"
    height="96"
    fill="none"
    viewBox="0 0 350 96"
    {...props}
  >
    <path
      fill="#F74E4E"
      d="M234.2 93.5a2.2 2.2 0 01-2.2 2.1h-96.4a2.2 2.2 0 01-2.2-2.2 49.8 49.8 0 0150.4-48.3 49.7 49.7 0 0150.4 48.2v.2zM224.3 40.1a10 10 0 100-19.9 10 10 0 000 19.9z"
    />
    <path
      fill="#FFB71B"
      d="M86.6 93.4a2.2 2.2 0 01-2.3 2.2H2.8a2.2 2.2 0 01-2.2-2.2c0-.5.1-.9.4-1.3l40.7-70.9a2.4 2.4 0 011.9-1 2.2 2.2 0 011.8 1l40.8 71c.2.3.4.7.4 1.2z"
    />
    <path
      fill="#4FBF5E"
      d="M347.4 20.2c-.4 0-.8.2-1.2.4l-48.5 36c-.3.3-.7.4-1.1.4-.4 0-.8-.1-1-.3h-.2l-48.1-36c-.4-.2-.7-.3-1.1-.3a2.1 2.1 0 00-2 2.2v70.8a2.1 2.1 0 002 2.2h101.2a2.1 2.1 0 002-2.2v-71a2.2 2.2 0 00-2-2.2z"
    />
    <path
      fill="#71C5FF"
      d="M136 20.4h-11.6a1.1 1.1 0 01-1-1.2V2.6A2.2 2.2 0 00121 .4H98.7a2.2 2.2 0 00-2.2 2.2v90.8a2.2 2.2 0 002.2 2.2H121a2.2 2.2 0 002.3-2.2V48.3a1.1 1.1 0 01.3-.8 1 1 0 01.8-.4H136a2.2 2.2 0 002.2-2.2V22.6a2.2 2.2 0 00-2.2-2.2z"
    />
  </StyledSVG>
)
