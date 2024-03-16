import { getshortenedURL } from '../../server.js'
import { useState } from 'react'
import { Container, Title, Button, Flex, Card, Text, CloseButton, Grid, Divider } from '@mantine/core'
import { IconLink, IconId, IconHeart, IconActivity, IconTimeline, IconUserPlus, IconDashboard } from '@tabler/icons-react'
import { Input } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Home.module.css'


const benefits = [
    {
        icon: <IconLink />,
        heading: 'Custom Short Links',
        description: 'Create Branded links that are easy to remember and pronounce'
    },
    {
        icon: <IconId />,
        heading: 'Branded links',
        description: 'Create links with your own domain'
    },
    {
        icon: <IconHeart />,
        heading: 'Link retargeting',
        description: 'Add pixels from Facebook, Google, Linkedin, X, and more'
    },
    {
        icon: <IconActivity />,
        heading: 'Link health monitoring',
        description: 'Set up automatic monitoring for broken links'
    },
    {
        icon: <IconTimeline />,
        heading: 'Custom splash pages',
        description: 'Create a page that matches your brand'
    },
    {
        icon: <IconUserPlus />,
        heading: 'Team permissions',
        description: 'Invite your team members to collaborate on your links'
    },
    {
        icon: <IconDashboard />,
        heading: 'Dashboard',
        description: 'Get access to your History of previously Created links'
    },
]

const Home = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false);


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
                        URL Shortener
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
                                        // toggle();
                                        e.preventDefault();
                                        setLoading(true);
                                        getshortenedURL(value, setLoading);
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
                <Divider
                    mt={50}
                    p={0}
                    color={'dimmed'}
                />
                <Flex
                    direction={'column'}
                >
                    <Title
                        ta={'center'}
                        mt={'md'}
                        c={'var(--mantine-primary-color-1)'}
                    >
                        Benefits
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
                                        className={classes.Card}
                                    >
                                        {items.icon}
                                        <Title
                                            lh={1}
                                            my={'md'}
                                        >
                                            {items.heading}
                                        </Title>
                                        <Text>
                                            {items.description}
                                        </Text>
                                    </Card>
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </Flex>
            </Container>
        </div>
    )
}

export default Home