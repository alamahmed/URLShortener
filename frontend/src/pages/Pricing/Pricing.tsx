import { useState } from 'react';
import { Container, Flex, Title, Text, Grid, Card, Button, List, ThemeIcon } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react';
import classes from './Pricing.module.css'
import { useToggle } from '@mantine/hooks'

const data = [
    {
        id: 1,
        title: 'Basic',
        currency: '$',
        price: 10,
        description: 'Description for who is this for',
        benefits: ['Unlimited Converts', 'Dashboard', 'Custom Links', 'Create Links with your own domain'],
    },
    {
        id: 2,
        title: 'Standard',
        currency: '$',
        price: 20,
        description: 'Description for who is this for',
        benefits: ['Unlimited Converts', 'Dashboard', 'Custom Links', 'Create Links with your own domain'],
    },
    {
        id: 3,
        title: 'Premium',
        currency: '$',
        price: 30,
        description: 'Description for who is this for',
        benefits: ['Unlimited Converts', 'Dashboard', 'Custom Links', 'Create Links with your own domain'],
    },
]

const Pricing = () => {
    const [timeline, toggleTimeline] = useToggle(['Monthly', 'Yearly'])
    const [isHovered, setIsHovered] = useState(0)

    return (
        <Container
            size={'xl'}
        >
            <Flex
                direction={'column'}
            >
                <Flex
                    pt={'xl'}
                    justify={'end'}
                >
                    <Button
                        radius={'lg'}
                        w={'fit-content'}
                        p={0}
                        onClick={() => { toggleTimeline() }}
                    >
                        <Text
                            className={`
                        ${classes.custom_switch_text} 
                        ${timeline === 'Monthly' ? classes.active : null}
                        `}
                        >
                            Monthly
                        </Text>
                        <Text
                            className={`
                        ${classes.custom_switch_text} 
                        ${timeline === 'Yearly' ? classes.active : null}
                        `}
                        >
                            Yearly
                        </Text>
                    </Button>
                </Flex>
                <Title
                    ta={'center'}
                    mt={'md'}
                    c={'var(--mantine-primary-color-1)'}
                >
                    Upgrade to Premium
                </Title>
                <Grid
                    my={'xl'}
                    display={'flex'}
                    justify={'center'}
                >
                    {data.map((items) => {
                        return (
                            <Grid.Col span={{ base: 7, lg: 2.4, md: 3, sm: 4 }}>
                                <Card
                                    withBorder
                                    p={'xl'}
                                    radius={'md'}
                                    mih={'300px'}
                                    onMouseOver={() => setIsHovered(items.id)}
                                    onMouseOut={() => setIsHovered(0)}

                                    className={classes.Card}
                                >
                                    <Title
                                        lh={1}
                                    >
                                        {items.title}
                                    </Title>
                                    <Flex
                                        align={'center'}
                                        my={'md'}
                                    >
                                        <Title
                                            order={2}
                                        >
                                            {items.currency}
                                            {timeline === 'Monthly' ?
                                                items.price
                                                :
                                                items.price * 12
                                            }
                                        </Title>
                                        <Text>
                                            / {timeline}
                                        </Text>
                                    </Flex>
                                    <Text>
                                        {items.description}
                                    </Text>
                                    <List
                                        my={'lg'}
                                        spacing={'xs'}
                                        size={'sm'}
                                        center
                                        listStyleType={'none'}
                                        icon={
                                            <ThemeIcon
                                                color={'transparent'}
                                                size={22}
                                            >
                                                <IconCircleCheck
                                                    style={{ width: 16, height: 16, color: isHovered === items.id ? 'white' : 'black' }}
                                                />
                                            </ThemeIcon>
                                        }
                                    >
                                        {items.benefits.map((list) => (
                                            <List.Item>{list}</List.Item>
                                        ))}
                                    </List>
                                    <Button
                                        variant={'light'}
                                        mt={'lg'}
                                        radius={'md'}
                                        style={{
                                            color: isHovered === items.id ? 'white' : 'var(--mantine-primary-color-1)',
                                            border: 'var(--mantine-primary-color-1) solid 1px',
                                            borderColor: isHovered === items.id ? 'white' : 'var(--mantine-primary-color-1)'
                                        }}
                                    >
                                        Choose Plan
                                    </Button>
                                </Card>
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Flex>
        </Container >
    )
}

export default Pricing