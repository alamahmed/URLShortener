import { getshortenedURL } from '../../server.js'
import { useState } from 'react'
import { Container, Title, Button, Flex, Card, Text, CloseButton } from '@mantine/core'
import { Input } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Pricing.module.css'

const Pricing = () => {
    const [value, setValue] = useState('')
    const [loading, { toggle }] = useDisclosure();

    return (
        <Container
            size={'xl'}
        >
            This is Pricing
        </Container >
    )
}

export default Pricing