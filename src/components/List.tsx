import * as React from 'react'

import { styled } from '../../stitches.config'
import { Text } from '.'

const StyledList = styled(Text, {})

export const List = (props) => <StyledList as="ul" {...props} />
