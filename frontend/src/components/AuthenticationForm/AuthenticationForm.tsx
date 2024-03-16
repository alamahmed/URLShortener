import { useState } from 'react'
import { useForm } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Alert,
} from '@mantine/core'
import GoogleButton from './GoogleButton'
import TwitterButton from './TwitterButton'
import { sign_up, log_in } from '../../server'
import React from 'react';

interface Props {
    page: string;
    close: () => void
}

interface responseType {
    message: string
    status: string
}


const AuthenticationForm: React.FC<Props> = ({ page, close }) => {
    const [type, toggle] = useState(page)
    const [data, setData] = useState('');
    const [status, setStatus] = useState('');

    const delay = async (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const callback = async (response: responseType) => {
        let temp = document.getElementById('alert');
        temp!.style.display = 'block';
        setData(response.message);
        setStatus(response.status);

        await delay(1000);

        temp!.style.display = 'none';
        setData('');
        setStatus('');
        close();
    }

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    })

    return (
        <Paper
            p={'lg'}
            bg={'transparent'}
        >
            <Alert
                lh={1}
                my={'md'}
                radius={'lg'}
                variant={'light'}
                color={status === 'Success' ? 'blue' : 'red'}
                id={'alert'}
                style={{ display: 'none' }}
                title={status}
            >
                {data}
            </Alert>
            <Text
                size={'lg'}
                fw={500}
            >
                Welcome to URL Shortener, {type} with
            </Text>
            <form onSubmit={form.onSubmit(() => { })}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label={'Name'}
                            placeholder={'Your name'}
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius={'md'}
                        />
                    )}
                    <TextInput
                        required
                        label={'Email'}
                        placeholder={'hello@mantine.dev'}
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label={'Password'}
                        placeholder={'Your password'}
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius={'md'}
                    />

                    {type === 'register' && (
                        <Checkbox
                            label={'I accept terms and conditions'}
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify={'space-between'} mt={'xl'}>
                    <Anchor
                        component={'button'}
                        type={'button'}
                        c={'dimmed'}
                        onClick={() => {
                            form.values.email = '';
                            form.values.name = '';
                            form.values.password = '';
                            type === 'register' ?
                                toggle('login')
                                :
                                toggle('register')
                        }}
                        size={'xs'}
                    >
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : 'Don\'t have an account? Register'}
                    </Anchor>
                    <Button
                        type={'submit'}
                        radius={'xl'}
                        style={{ textTransform: 'capitalize' }}
                        onClick={(e) => {
                            e.preventDefault()
                            if (type === 'login') {
                                // Login Function
                            }
                            else {
                                sign_up(form.values.name, form.values.email, form.values.password, callback)
                            }
                        }}
                    >
                        {type}
                    </Button>
                </Group>
            </form>
            <Divider
                label='Or continue with email'
                labelPosition={'center'}
                my={'lg'}
            />
            <Group grow mb={'md'} mt={'md'}>
                <GoogleButton radius={'xl'}>Google</GoogleButton>
                <TwitterButton radius={'xl'}>Twitter</TwitterButton>
            </Group>

        </Paper>
    );
}

export default AuthenticationForm;