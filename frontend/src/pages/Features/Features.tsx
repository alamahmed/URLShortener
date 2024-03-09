import { getshortenedURL } from '../../server.js'
import { useState } from 'react'
import { Container, Title, Button, Flex, Card, Text, CloseButton } from '@mantine/core'
import { Input } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Features.module.css'

const Features = () => {
    const [value, setValue] = useState('')
    const [loading, { toggle }] = useDisclosure();

    return (
        <Container
            size={'xl'}
        >
            These are features
        </Container >
    )
}

export default Features