import { Divider, Flex, Text, Title, Avatar, Stack, Button, Modal, TextInput } from '@mantine/core'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { IconArrowRight } from '@tabler/icons-react';
import { update_username } from '../../server';
import { SessionContext } from '../../context/SessionContext';
import { useDisclosure } from '@mantine/hooks';
import classes from './Profile.module.css'


interface user {
    uid: string,
    username: string,
    email: string,
}

interface props {
    children: React.ReactNode,
    heading: string,
    onClick: () => void | null,
}

const Section = ({ children, heading, onClick }: props) => {
    return (
        <Stack>
            <Title
                order={4}
                fw={600}
                mt={'xl'}
            >
                {heading}
            </Title>
            <Divider />
            <Button
                radius={'lg'}
                py={'md'}
                variant={'light'}
                h={'fit-content'}
                bg={'transparent'}
                rightSection={
                    <IconArrowRight />
                }
                onClick={onClick}
                justify={'space-between'}
            >
                {children}
            </Button>
        </Stack>
    );
}

const Profile = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState(user.username)
    const [token, setToken] = useContext(SessionContext);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        const updateUsername = async () => {
            setUsername(await user.username)
        }
        updateUsername();
    }, [user.username])

    const delay = async (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const callback = async (status: boolean, message: string) => {
        if (status) {
            setUser((prevState: user) => ({
                ...prevState,
                username: username,
            }));
            setToken(token)
            setError('')
            setSuccess(message)
            await delay(2000)
            setSuccess('')
            close()
        }
        else {
            setSuccess('')
            setError(message)
        }
    }

    const getModifiedLabel = (label: string) => {
        if (label !== undefined) {
            const words = label.split(' ')

            if (words.length > 1) {
                return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
            } else {
                return words[0].slice(0, 2).toUpperCase()
            }
        }
    }

    return (
        <Flex
            h={'90vh'}
            p={'lg'}
            px={'xl'}
            direction={'column'}
            className={classes.main_container}
        >
            <Modal
                opened={opened}
                onClose={close}
                centered
                withCloseButton={false}
                radius={'lg'}
                padding={'xl'}
            >
                <Title
                    ta={'center'}
                    fw={'800'}
                    order={2}
                >
                    Update Username
                </Title>
                <Flex
                    direction={'column'}
                >
                    <TextInput
                        disabled
                        placeholder={'email'}
                        value={user.email}
                        label={'Email'}
                        radius={'md'}
                    />
                    <TextInput
                        my={'md'}
                        placeholder={'username'}
                        value={username}
                        label={'Username'}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        radius={'md'}
                    />
                    {
                        error || success ?
                            <Text
                                mb={'md'}
                                c={error ? 'red' : 'teal'}
                            >
                                {error ? error : (success ? success : null)}
                            </Text>
                            : null
                    }
                    <Flex justify={'end'}>
                        <Button
                            variant={'light'}
                            mx={'md'}
                            radius={'lg'}
                            onClick={() => {
                                setUsername(user.username)
                                close()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            radius={'lg'}
                            onClick={() => {
                                if (username !== user.username) {
                                    if (username.length > 2) {
                                        update_username(username, token, callback)
                                    }
                                    else {
                                        setError('Your username should contain more then two letters')
                                    }
                                }
                            }}
                        >
                            Save
                        </Button>
                    </Flex>
                </Flex>
            </Modal>
            <Title fw={600}>
                Profile
            </Title>
            <Text c={'dimmed'}>
                You can Manage your profile here
            </Text>
            <Section heading={'Profile'} onClick={() => { }}>
                <Avatar
                    variant={'transparent'}
                    size={'lg'}
                    bg={'var(--mantine-color-gray-2)'}
                >
                    {getModifiedLabel(user.username)}
                </Avatar>
                <Text ml={'md'} c={'black'}>
                    {user.username}
                </Text>
            </Section>

            <Section heading={'User'} onClick={open}>
                <Text c={'black'}>
                    {user.username}
                </Text>
            </Section>

            <Section heading={'Email Address'} onClick={() => { }}>
                <Text c={'black'}>
                    {user.email}
                </Text>
            </Section>
        </Flex>
    );
}

export default Profile