import { Button, Card, Flex, Grid, PasswordInput, Title, Modal } from '@mantine/core'
import { useContext, useState } from 'react';
import { useForm } from '@mantine/form';
import Password from '../Password/Password';
import { update_password } from '../../server';
import { SessionContext } from '../../context/SessionContext';
import classes from './Security.module.css'
import { UserContext } from '../../context/UserContext';
import { useDisclosure } from '@mantine/hooks';

const Security = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [valid, setValid] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [user] = useContext(UserContext)
    const [token, setToken] = useContext(SessionContext);

    const delay = async (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const callback = async (status: boolean, message: string) => {
        if (status) {
            open();
            setToken(token)
            setError('')
            setSuccess(message)
            await delay(2000)
            close()
            setSuccess('')
        }
        else {
            open();
            setSuccess('')
            setError(message)
            await delay(2000)
            close()
            setError('')
        }
    }

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
            <Grid
                justify={'center'}
                w={'100%'}
            >
                <Grid.Col span={{ base: 10, lg: 5, md: 5, sm: 10 }}>
                    <Card
                        radius={'lg'}
                        withBorder
                        p={'xl'}
                    >
                        <Title
                            ta={'center'}
                            fw={'800'}
                            order={2}
                        >
                            Update Password
                        </Title>
                        <PasswordInput
                            my={'md'}
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
                            mt={'md'}
                            placeholder={'Retype password'}
                            label={'Confirm Password'}
                            radius={'md'}
                            value={pass.values.confirm_password}
                            onChange={(e) => {
                                pass.setFieldValue('confirm_password', e.target.value)
                            }}
                            error={pass.errors.confirm_password}
                        />
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
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                radius={'lg'}
                                onClick={() => {
                                    if (pass.values.new_password === pass.values.confirm_password) {
                                        if (valid) {
                                            update_password(user.email, pass.values.current_password, pass.values.new_password, callback)
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
                    </Card>
                </Grid.Col>
            </Grid>
            <Modal
                opened={opened}
                onClose={close}
                c={error ? 'red' : 'teal'}
                title={error ? error : (success ? success : null)}
                centered
            >
            </Modal>
        </Flex >
    );
}

export default Security