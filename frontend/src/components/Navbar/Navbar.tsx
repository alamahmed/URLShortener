import {
    Group,
    Divider,
    Box,
    Text,
    Flex,
    Burger,
    Drawer,
    Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

    const data = [
        { link: '/Features', name: 'Features' },
        { link: '/Pricing', name: 'Pricing' },
    ]

    return (
        <Box className={classes.navContainer}>
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
                    title={'Navigation'}
                    hiddenFrom={'sm'}
                    zIndex={1000000}
                >
                    <Divider my={'sm'} />
                    <Flex>
                        <Link
                            to='/'
                            className={classes.link}
                            onClick={() => { closeDrawer() }}
                        >
                            <Text fw={800}>
                                URL Shortner
                            </Text>
                        </Link>
                    </Flex>
                    <Divider my={'sm'} />
                    {data.map((items) => {
                        return (
                            <Flex>
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
                </Drawer>
            </Container>
        </Box>
    );
}

export default Navbar