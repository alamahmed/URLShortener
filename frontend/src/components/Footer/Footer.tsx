import { Text, Container, ActionIcon, Group } from '@mantine/core'
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react'
import { Link, Outlet } from 'react-router-dom'
import classes from './Footer.module.css'

const data = [
    {
        title: 'About',
        links: [
            { label: 'Pricing', link: '/pricing' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: 'https://github.com/alamahmed/URLShortener' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Join Discord', link: '/' },
            { label: 'Follow on Twitter', link: '/' },
            { label: 'Email newsletter', link: '/' },
        ],
    },
];

const Footer = () => {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Link
                to={link.link}
                key={index}
                className={classes.link}
            >
                {link.label}
            </Link>
        ));

        return (
            <>
                <div className={classes.wrapper} key={group.title}>
                    <Text className={classes.title}>{group.title}</Text>
                    {links}
                </div>
            </>
        );
    });

    return (
        <>
            <Outlet />
            <footer id='footer' className={classes.footer}>
                <Container className={classes.inner}>
                    <div className={classes.logo}>
                        <Text size={'xs'} c={'dimmed'} className={classes.description}>
                            URL Shortener with custom URL Features and dashboard to manage and create new links
                        </Text>
                    </div>
                    <div className={classes.groups}>{groups}</div>
                </Container>
                <Container className={classes.afterFooter}>
                    <Text c={'dimmed'} size={'sm'}>
                        © 2024 URL Shortener All rights reserved.
                    </Text>

                    <Group gap={0} className={classes.social} justify={'flex-end'} wrap={'nowrap'}>
                        <ActionIcon size={'lg'} color={'gray'} variant={'subtle'}>
                            <IconBrandTwitter style={{ width: 18, height: 18 }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size={'lg'} color={'gray'} variant={'subtle'}>
                            <IconBrandYoutube style={{ width: 18, height: 18 }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size={'lg'} color={'gray'} variant={'subtle'}>
                            <IconBrandInstagram style={{ width: 18, height: 18 }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Container>
            </footer>
        </>
    );
}

export default Footer