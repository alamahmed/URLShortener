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
import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import UnauthorizedPage from '../../components/UnauthorizedPage/UnauthorizedPage';

const mockdata = [
    { icon: IconHome2, label: 'Overview', link: '/dashboard' },
    { icon: IconUser, label: 'Profile', link: '/dashboard/profile' },
    { icon: IconFingerprint, label: 'Security', link: '/dashboard/security' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics', link: '/dashboard/analytics' },
];

let noOfMockData = mockdata.length;

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    link: string;
    active?: boolean;
    onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick, link }: NavbarLinkProps) => {
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
    const [token, setToken] = useContext(SessionContext);

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
        >
            <Flex>
                <nav className={classes.sidebar_container}>
                    <Stack gap={0}>
                        {links}
                    </Stack>
                    <nav className={classes.sidebar_bottom}>
                        <NavbarLink
                            key={'Settings'}
                            link={'/dashboard/settings'}
                            active={noOfMockData === active}
                            onClick={() => setActive(noOfMockData)}
                            icon={IconSettings}
                            label={'Settings'}
                        />
                        <NavbarLink
                            key={'Logout'}
                            link={'/'}
                            active={noOfMockData + 1 === active}
                            onClick={() => setToken(null)}
                            icon={IconLogout}
                            label={'Logout'}
                        />
                    </nav>
                </nav>
                <Flex
                    className={classes.outlet_container}
                >
                    {token === null ?

                        <UnauthorizedPage />
                        :
                        <Outlet />
                    }
                </Flex>
            </Flex>
        </Container>
    );
}

export default Dashboard