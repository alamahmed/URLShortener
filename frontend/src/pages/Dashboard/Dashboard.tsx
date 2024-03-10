import { Container, Stack, Flex, Tooltip, rem } from '@mantine/core';
import {
    IconHome2,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconUser,
    IconSettings,
    IconLogout,
} from '@tabler/icons-react';
import classes from './Dashboard.module.css';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const mockdata = [
    { icon: IconHome2, label: 'Dashboard', link: '/Dashboard/' },
    { icon: IconUser, label: 'Profile', link: '/Dashboard/Profile' },
    { icon: IconFingerprint, label: 'Security', link: '/Dashboard/Security' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics', link: '/Dashboard/Analytics' },
];

let noOfMockData = mockdata.length;

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    link: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick, link }: NavbarLinkProps) {
    return (
        <Tooltip
            label={label}
            position={'right'}
            transitionProps={{ duration: 0 }}
        >
            <Link
                to={link}
                onClick={onClick}
                className={classes.link}
                data-active={active || undefined}
            >
                <Icon
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1.5}
                />
            </Link>
        </Tooltip>
    );
}


const Dashboard = () => {

    const [active, setActive] = useState(0);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            link={link.link}
            active={index === active}
            onClick={() => {
                setActive(index)
            }}
        />
    ));

    return (
        <Container
            size={'xl'}
            p={0}
            pt={'20px'}
        >
            <Flex
                direction={'column'}
                w={'80px'}
                h={'90vh'}
                align={'start'}
            >
                <Stack gap={0}>
                    {links}
                </Stack>
                <Flex
                    direction={'column'}
                    h={'65%'}
                    justify={'end'}
                >
                    <NavbarLink
                        key={'Settings'}
                        link={'/Dashboard/Settings'}
                        active={noOfMockData === active}
                        onClick={() => setActive(noOfMockData)}
                        icon={IconSettings}
                        label={'Settings'}
                    />
                    <NavbarLink
                        key={'Logout'}
                        link={'/Dashboard/Logout'}
                        active={noOfMockData + 1 === active}
                        onClick={() => setActive(noOfMockData + 1)}
                        icon={IconLogout}
                        label={'Logout'}
                    />
                </Flex>
            </Flex>
            <Outlet />
        </Container>
    );
}

export default Dashboard