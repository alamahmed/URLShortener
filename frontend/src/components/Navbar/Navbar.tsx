import {
    Group,
    Divider,
    Box,
    Text,
    Flex,
    Burger,
    Drawer,
    Container,
    Button,
    Modal,
    Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import AuthenticationForm from '../AuthenticationForm/AuthenticationForm';
import { useState } from 'react';

const Navbar = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
    const [opened, { open, close }] = useDisclosure(false);
    const [page, changePage] = useState('');

    const data = [
        { link: '/Features', name: 'Features' },
        { link: '/Pricing', name: 'Pricing' },
        { link: '/Dashboard', name: 'Dashboard' },
    ]

    return (
        <Box className={classes.navContainer}>
            <Modal
                opened={opened}
                onClose={close}
                title={'Authentication'}
                centered
            >
                <AuthenticationForm page={page} />
            </Modal>
            <Container
                size={'xl'}
                py={'lg'}
                className={classes.main_container}
            >
                <header>
                    <Group
                        justify={'space-between'}
                        h={'100%'}
                    >
                        <Link
                            to='/'
                            className={classes.link}
                        >
                            <Text
                                fw={800}
                            >
                                URL Shortner
                            </Text>
                        </Link>
                        <Group
                            h={'100%'}
                            gap={0}
                            visibleFrom={'sm'}
                        >
                            <Flex
                                direction={'row'}
                                align={'center'}
                            >
                                {data.map((items) => {
                                    return (
                                        <Link
                                            className={classes.link}
                                            to={items.link}
                                        >
                                            <Text
                                                pr={'20px'}
                                            >
                                                {items.name}
                                            </Text>
                                        </Link>

                                    );
                                })}
                                <Button
                                    mr={'20px'}
                                    className={classes.button}
                                    onClick={() => {
                                        changePage('register')
                                        open()
                                    }}
                                >
                                    Sign up
                                </Button>
                                <Button
                                    onClick={() => {
                                        changePage('login')
                                        open()
                                    }}
                                    variant={'outline'}
                                    className={classes.button}
                                >
                                    Log in
                                </Button>
                            </Flex>
                        </Group>
                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom={'sm'}
                        />
                    </Group>
                </header>
                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size={'100%'}
                    padding={'md'}
                    title={'URL Shortner'}
                    hiddenFrom={'sm'}
                    zIndex={1000000}
                >

                    <Divider my={'sm'} />
                    <Flex
                        justify={'right'}
                    >
                        <Link
                            to='/'
                            className={classes.link}
                            onClick={() => { closeDrawer() }}
                        >
                            <Text fw={800}>
                                Home
                            </Text>
                        </Link>
                    </Flex>
                    <Divider my={'sm'} />
                    {data.map((items) => {
                        return (
                            <Flex justify={'right'}>
                                <Link
                                    to={items.link}
                                    className={classes.link}
                                    onClick={() => { closeDrawer() }}
                                >
                                    {items.name}
                                </Link>
                            </Flex>
                        )
                    })}
                    <Divider my={'sm'} />
                    <Flex justify={'right'}>
                        <Stack>
                            <Button
                                className={classes.button}
                                onClick={() => {
                                    changePage('register')
                                    open()
                                }}
                            >
                                Sign up
                            </Button>
                            <Button
                                onClick={() => {
                                    changePage('login')
                                    open()
                                }}
                                variant={'outline'}
                                className={classes.button}
                            >
                                Log in
                            </Button>
                        </Stack>
                    </Flex>
                </Drawer>
            </Container>
        </Box >
    );
}

export default Navbar