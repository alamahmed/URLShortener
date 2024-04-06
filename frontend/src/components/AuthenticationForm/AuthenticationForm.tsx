import { useContext, useState } from 'react'
import { useForm } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core'
// import GoogleButton from './GoogleButton'
import { sign_up, log_in, reset_password } from '../../server'
import React from 'react';
import { SessionContext } from '../../context/SessionContext'
import Password from '../Password/Password'

interface Props {
    page: string;
    close: () => void
}

interface ResponseType {
    message: string
    status: boolean
    token?: string
}

const AuthenticationForm: React.FC<Props> = ({ page, close }) => {
    const [valid, setValid] = useState(false);
    const [type, toggle] = useState(page)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [, setToken] = useContext(SessionContext);

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    })

    const handlePassword = (strength: number, value: string) => {
        setValid(strength === 100 ? true : false)
        form.setFieldValue('password', value)
    }

    const delay = async (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const callback = async (response: ResponseType) => {
        setError('');
        setSuccess(response.message);
        await delay(3000);
        setSuccess('');
        if (response.status && type === 'login') {
            setToken(response.token)
            close()
        }
    }

    return (
        <Paper
            p={'lg'}
            bg={'transparent'}
        >
            <Text
                size={'lg'}
                fw={500}
            >
                Welcome to URL Shortener, {type} with
            </Text>
            <form onSubmit={form.onSubmit((values) => {
                if (type === 'login') {
                    log_in(values.email, values.password, callback)
                }
                else if (valid) {
                    if (values.password === values.confirm_password) {
                        sign_up(values.name, values.email, values.password, callback)
                    }
                    else {
                        setError('Your password does not match');
                    }
                }
                else {
                    setError('Password do not met the minimum criteria')
                }
            })}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label={'Name'}
                            placeholder={'Your name'}
                            value={form.values.name}
                            onChange={(e) => form.setFieldValue('name', e.currentTarget.value)}
                            radius={'md'}
                        />
                    )}
                    <TextInput
                        required
                        label={'Email'}
                        placeholder={'hello@gmail.com'}
                        value={form.values.email}
                        onChange={(e) => {
                            form.setFieldValue('email', e.currentTarget.value)
                        }}
                        error={form.errors.email && 'Invalid email'}
                        radius={'md'}
                    />
                    {
                        type === 'register' ?
                            <Password
                                label={'Password'}
                                placeHolder={'Your new password'}
                                value={form.values.password}
                                handleChange={handlePassword}
                            />
                            :
                            <PasswordInput
                                required
                                label={'Password'}
                                placeholder={'Password'}
                                radius={'md'}
                                value={form.values.password}
                                onChange={(e) => {
                                    form.setFieldValue('password', e.target.value)
                                }}
                            />
                    }

                    {type === 'register' ?
                        <>
                            <PasswordInput
                                required
                                label={'Confirm Password'}
                                placeholder={'Confirm password'}
                                radius={'md'}
                                value={form.values.confirm_password}
                                onChange={(e) => {
                                    form.setFieldValue('confirm_password', e.target.value)
                                }}
                            />
                            <Checkbox
                                label={'I accept terms and conditions'}
                                checked={form.values.terms}
                                onChange={(e) => form.setFieldValue('terms', e.currentTarget.checked)}
                            />
                        </>
                        :
                        <Anchor
                            fz={'xs'}
                            w={'fit-content'}
                            onClick={() => {
                                form.setFieldError('email', /^\S+@\S+$/.test(form.values.email) ? null : 'Invalid email')
                                if (/^\S+@\S+$/.test(form.values.email))
                                    reset_password(form.values.email, callback)
                            }}
                        >
                            Forget Password
                        </Anchor>
                    }
                    <Text
                        display={(error || success) ? 'block' : 'none'}
                        c={error ? 'red' : (success ? 'teal' : 'black')}
                        fz={'sm'}
                    >
                        {error ? error : (success ? success : null)}
                    </Text>
                </Stack>

                <Group justify={'space-between'} mt={'sm'}>
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
                    >
                        {type}
                    </Button>
                </Group>
            </form>
            {/* <Divider
                label='Or continue with email'
                labelPosition={'center'}
                my={'lg'}
            />
            <Group grow mb={'md'} mt={'md'}>
                <GoogleButton radius={'xl'}>Google</GoogleButton>
            </Group> */}

        </Paper>
    );
}

export default AuthenticationForm;