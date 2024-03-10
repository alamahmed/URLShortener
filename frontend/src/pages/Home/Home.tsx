import { getshortenedURL } from '../../server.js'
import { useState } from 'react'
import { Container, Title, Button, Flex, Card, Text, CloseButton, Divider, Grid } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Input } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLink, IconId, IconHeart, IconActivity, IconTimeline, IconUserPlus, IconDashboard } from '@tabler/icons-react'
import classes from './Home.module.css'


const benefits = [
    { icon: <IconLink />, heading: 'Custom Short Links', description: 'Create Branded links that are easy to remember and pronounce' },
    { icon: <IconId />, heading: 'Branded links', description: 'Create links with your own domain' },
    { icon: <IconHeart />, heading: 'Link retargeting', description: 'Add pixels from Facebook, Google, Linkedin, X, and more' },
    { icon: <IconActivity />, heading: 'Link health monitoring', description: 'Set up automatic monitoring for broken links' },
    { icon: <IconTimeline />, heading: 'Custom splash pages', description: 'Create a page that matches your brand' },
    { icon: <IconUserPlus />, heading: 'Team permissions', description: 'Invite your team members to collaborate on your links' },
    { icon: <IconDashboard />, heading: 'Dashboard', description: 'Get access to your History of previously Created links' },
]


const Home = () => {
    const [value, setValue] = useState('')
    const [loading, { toggle }] = useDisclosure();


    return (
        <div
            className={classes.main_container}
        >
            <Container
                size={'xl'}
            >
                <Flex
                    className={classes.gradient_background}
                    h={'80vh'}
                    my={'lg'}
                    align={'center'}
                    justify={'center'}
                    direction={'column'}
                >
                    <Title
                        className={classes.main_heading}
                        ta={'center'}
                    >
                        URL Shortner
                    </Title>
                    <Card
                        py={60}
                        radius={'40px'}
                        bg={'transparent'}
                    >
                        <Flex
                            h={'auto'}
                            w={'85vw'}
                            direction={'column'}
                            justify={'center'}
                            align={'center'}
                        >
                            <Title
                                ta={'center'}
                                mb={'20px'}
                                className={classes.sub_heading}
                            >
                                Paste Your Link Here
                            </Title>
                            <Flex
                                direction={'row'}
                                justify={'center'}
                                align={'center'}
                            >
                                <Input
                                    variant={'filled'}
                                    size={'md'}
                                    radius={'md'}
                                    placeholder='Your Link'
                                    rightSectionPointerEvents={'all'}
                                    value={value}
                                    onChange={(e) => setValue(e.currentTarget.value)}
                                    rightSection={
                                        <CloseButton
                                            variant={'transparent'}
                                            onClick={() => setValue('')}
                                            style={{ display: value ? undefined : 'none' }}
                                        />
                                    }
                                    classNames={classes}
                                />
                                <Button
                                    variant={'filled'}
                                    radius={'md'}
                                    loading={loading}
                                    loaderProps={{ type: 'dots' }}
                                    styles={{
                                        root: {
                                            background: 'var(--primary-color)',
                                            overflow: 'visible',
                                            fontWeight: 800,
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            height: '50px',
                                        },
                                    }}
                                    onClick={(e) => {
                                        getshortenedURL(value)

                                    }}
                                >
                                    Shorten URL
                                </Button>
                            </Flex>
                            <Title
                                ta={'center'}
                                pt={'30px'}
                                order={2}
                                className={classes.sub_heading}
                            >
                                Shortened URL
                            </Title>
                            <Text
                                ta={'center'}
                                lh={1.3}
                                w={'90%'}
                                id={'display_short_url'}
                                className={classes.shortened_URL}
                            >
                            </Text>
                        </Flex>
                    </Card>
                </Flex>
                <Divider color={'gray'} size={'sm'} my={'lg'} />
                <Flex
                    direction={'column'}
                >
                    <Title>
                        Membership Benefits
                    </Title>
                    <Grid
                        my={'xl'}
                        display={'flex'}
                        justify={'center'}
                    >
                        {benefits.map((items) => {
                            return (
                                <Grid.Col span={{ base: 10, lg: 2.4, md: 3, sm: 4 }}>
                                    <Card
                                        withBorder
                                        p={'xl'}
                                        radius={'md'}
                                        mih={'300px'}
                                    // h={'100%'}
                                    >
                                        {items.icon}
                                        <Title
                                            lh={1}
                                            my={'md'}
                                        >
                                            {items.heading}
                                        </Title>
                                        <Text c={'dimmed'}>
                                            {items.description}
                                        </Text>
                                    </Card>
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </Flex>
                <Flex
                    direction={'column'}
                    pb={'xl'}
                    align={'center'}
                >
                    <Button
                        color={'darkgray'}
                        my={'lg'}
                        radius={'lg'}
                    >
                        Buy Premium Membership
                    </Button>
                </Flex>
            </Container>
        </div>
    )
}

export default Home