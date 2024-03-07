import { getshortenedURL } from '../../server.js'
import { useState } from 'react'
import { Container, Grid, Title, Button, Flex, Card, Text, CloseButton } from '@mantine/core'
import { Input } from '@mantine/core'
import classes from './Home.module.css'

const MainPage = () => {
    const [value, setValue] = useState('')
    return (
        <div
            className={classes.main_container}
        >
            <Container
                size={'xl'}
            >
                <Flex
                    h={'100vh'}
                    align={'center'}
                    justify={'center'}
                >
                    <Grid>
                        <Grid.Col>
                            <Title
                                className={classes.main_heading}
                                ta={'center'}
                            >
                                URL Shortner
                            </Title>
                        </Grid.Col>
                        <Grid.Col>
                            <Card
                                withBorder
                                py={60}
                                radius={'40px'}
                                shadow='lg'
                            >
                                <Flex
                                    h={'100%'}
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
                                            placeholder={'Your Link'}
                                            rightSectionPointerEvents={'all'}
                                            value={value}
                                            onChange={(event) => setValue(event.currentTarget.value)}
                                            rightSection={
                                                <CloseButton
                                                    variant={'transparent'}
                                                    onClick={() => setValue('')}
                                                    style={{ display: value ? undefined : 'none' }}
                                                />
                                            }

                                            styles={{
                                                input: {
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                    height: '50px',
                                                },
                                            }}
                                        />
                                        <Button
                                            variant='filled'
                                            radius='md'
                                            size='md'
                                            styles={{
                                                root: {
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                    height: '50px',
                                                },
                                            }}
                                            onClick={(e) => {
                                                getshortenedURL(value)
                                            }}
                                        >
                                            Button
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
                                        id='display_short_url'
                                    >
                                    </Text>
                                </Flex>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Flex>
            </Container >
        </div>
    )
}

export default MainPage