import { Button, Card, Flex, Grid, PasswordInput, TextInput, Title, Text } from '@mantine/core'
import classes from './Settings.module.css'
import { useContext, useState } from 'react';
import { useForm } from '@mantine/form';
import { IconEdit } from '@tabler/icons-react';
import Password from '../Password/Password';
import { update_password, update_username } from '../../server';
import { SessionContext } from '../../context/SessionContext';
import { UserContext } from '../../context/UserContext';

interface user {
    uid: string,
    username: string,
    email: string,
}

// type user_state = user;

// // Function type for updating the user state
// type update_user = React.Dispatch<React.SetStateAction<user_state>>;


// const Settings = ({ uid, username, email, setUser }: user & { setUser: update_user }) => {
const Settings = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [User, setUser] = useContext(UserContext);
    const [name, setName] = useState('');
    const [valid, setValid] = useState(false);
    const [edit, setEdit] = useState(false)
    const [token] = useContext(SessionContext);

    const callback = (status: boolean, message: string) => {
        if (status) {
            setUser((prevState: user) => ({
                ...prevState,
                username: user.values.name,
            }));
            console.log('new username inside user is ', User.username)
            console.log('new username is ', user.values.name)
            setError('')
            setSuccess(message)
        }
        else {
            setSuccess('')
            setError(message)
        }
    }

    const user = useForm({
        initialValues: { name: User.username },
        validate: {
            name: (value) => (value.length < 3 ? 'Name must have at least 3 letters' : null),
        },
    });

    const handlePass = (strength: number, value: string) => {
        setValid(strength === 100 ? true : false);
        pass.setFieldValue('new_password', value)
    };

    const pass = useForm({
        initialValues: {
            current_password: '',
            new_password: '',
            confirm_password: '',
        },
        validate: {
            current_password: (value) => (value.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    })

    return (
        <Flex
            h={'90vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}
            className={classes.main_container}
        >
            <Grid w={'100%'}>
                <Flex
                    justify={'center'}
                    w={'inherit'}
                >
                    <Grid.Col span={{ base: 5 }}>
                        <Card
                            radius={'lg'}
                            withBorder
                            p={'xl'}
                        >
                            <Card.Section>
                                <Title
                                    ta={'center'}
                                    fw={'800'}
                                    order={2}
                                >
                                    Update Username
                                </Title>
                                <Flex
                                    justify={'end'}
                                >
                                    <Button
                                        size={'xs'}
                                        p={0}
                                        variant={'light'}
                                        bg={'transparent'}
                                        onClick={() => {
                                            setEdit(true)
                                        }}
                                    >
                                        <IconEdit />
                                    </Button>
                                </Flex>
                            </Card.Section>
                            <Flex
                                direction={'column'}
                            >
                                <form onSubmit={user.onSubmit((values) => {
                                    if (values.name !== User.username) {
                                        setName(user.values.name)
                                        update_username(user.values.name, token, callback)
                                        setEdit(false)
                                    }
                                })}>
                                    <TextInput
                                        disabled
                                        placeholder={'email'}
                                        value={User.email}
                                        label={'Email'}
                                        radius={'md'}
                                    />
                                    <TextInput
                                        my={'md'}
                                        disabled={!edit}
                                        placeholder={'username'}
                                        value={user.values.name || User.username}
                                        label={'Username'}
                                        onChange={(e) => {
                                            user.setFieldValue('name', e.target.value)
                                        }}
                                        radius={'md'}
                                        error={user.errors.name}
                                    />
                                    {
                                        edit ?
                                            <Flex
                                                mt={'xl'}
                                                justify={'end'}
                                            >
                                                <Button
                                                    variant={'light'}
                                                    mx={'md'}
                                                    radius={'lg'}
                                                    onClick={() => {
                                                        user.values.name = User.username
                                                        setEdit(false)
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    radius={'lg'}
                                                    type={'submit'}
                                                >
                                                    Save
                                                </Button>
                                            </Flex>
                                            : null
                                    }
                                </form>
                            </Flex>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 5 }}>
                        <Card
                            radius={'lg'}
                            withBorder
                            p={'xl'}
                        >
                            <Card.Section>
                                <Title
                                    ta={'center'}
                                    fw={'800'}
                                    order={2}
                                >
                                    Update Password
                                </Title>
                            </Card.Section>
                            <Flex
                                direction={'column'}
                            >
                                <form>
                                    <PasswordInput
                                        placeholder={'Enter your current password'}
                                        label={'Current Password'}
                                        radius={'md'}
                                        value={pass.values.current_password}
                                        onChange={(e) => {
                                            pass.setFieldValue('current_password', e.target.value)
                                        }}
                                        error={pass.errors.current_password}
                                    />
                                    <Password
                                        label={'New Password'}
                                        placeHolder={'Enter your new password'}
                                        value={pass.values.new_password}
                                        handleChange={handlePass}
                                    />
                                    <PasswordInput
                                        placeholder={'Retype password'}
                                        label={'Confirm Password'}
                                        radius={'md'}
                                        value={pass.values.confirm_password}
                                        onChange={(e) => {
                                            pass.setFieldValue('confirm_password', e.target.value)
                                        }}
                                        error={pass.errors.confirm_password}
                                    />
                                    <Text
                                        c={error ? 'red' : 'teal'}
                                        fz={'sm'}
                                    >
                                        {error ? error : (success ? success : null)}

                                    </Text>
                                    <Flex
                                        mt={'xl'}
                                        justify={'end'}
                                    >
                                        <Button
                                            variant={'light'}
                                            mx={'md'}
                                            radius={'lg'}
                                            onClick={() => {
                                                pass.values.current_password = ''
                                                pass.values.new_password = ''
                                                pass.values.confirm_password = ''
                                                setEdit(false)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            radius={'lg'}
                                            onClick={() => {
                                                if (pass.values.new_password === pass.values.confirm_password) {
                                                    if (valid) {
                                                        update_password(User.email, pass.values.current_password, pass.values.new_password, callback)
                                                        setEdit(false)
                                                    } else {
                                                        setError('Password do not met the criteria')
                                                    }
                                                }
                                                else {
                                                    setError('Password do not match')
                                                }
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Flex>
                                </form>
                            </Flex>
                        </Card>
                    </Grid.Col>
                </Flex >
            </Grid >
        </Flex >
    );
}

export default Settings