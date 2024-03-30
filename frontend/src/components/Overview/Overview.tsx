import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Anchor, Button, CloseButton, Container, Flex, Input, Modal, Title } from '@mantine/core'
import { Table, Group, Text, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconSearch, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { get_data, delete_url } from '../../server';
import classes from './Overview.module.css'

interface responseObj {
    status: boolean;
    data?: customArray[];
    message?: string;
}

interface customArray {
    original_url: string;
    short_url: string;
}

const Overview: React.FC<{ uid: string }> = ({ uid }) => {
    const [isUpdate, setIsUpdate] = useState(true)
    const [toDelete, setDelete] = useState('');
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [data, setData] = useState<customArray[] | null>(null);
    const [message, setMessage] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [token] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        get_data(uid, callback)
    }, [toDelete])

    const callback = (response: responseObj) => {
        if (response.status) {
            setData(response.data as customArray[])
        }
    }

    const delete_callback = (response: responseObj) => {
        if (response.status) {
            setMessage(response.message!)
            setDelete('')
        }
    }

    return (
        <Flex
            h={'90vh'}
            direction={'column'}
            className={classes.main_container}
        >
            <Table.ScrollContainer
                p={'lg'}
                minWidth={'100%'}
            >
                <Modal
                    radius={'lg'}
                    opened={opened}
                    onClose={close}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 2,
                    }}
                    centered
                >
                    {
                        isUpdate ?
                            <Container>
                                <Title
                                    order={3}
                                    ta={'center'}
                                >
                                    Edit URL
                                </Title>
                                <Input
                                    data-autofocus
                                    placeholder={'Your URL'}
                                    value={value}
                                    onChange={(event) => setValue(event.currentTarget.value)}
                                    rightSectionPointerEvents={'all'}
                                    mt={'md'}
                                    rightSection={
                                        <CloseButton
                                            aria-label={'Clear input'}
                                            onClick={() => setValue('')}
                                            style={{ display: value ? undefined : 'none' }}
                                        />
                                    }
                                />
                                <Flex
                                    justify={'center'}
                                    my={'lg'}
                                >
                                    <Button
                                        radius={'md'}
                                        onClick={close}
                                    >
                                        Save Changes
                                    </Button>
                                </Flex>
                            </Container>
                            :
                            <Container>
                                <Title
                                    order={3}
                                    ta={'center'}
                                >
                                    Are you sure you want to delete this link
                                </Title>
                                <Group
                                    justify={'center'}
                                    my={'lg'}
                                >
                                    <Button
                                        radius={'md'}
                                        onClick={() => {
                                            console.log('data to delete is', toDelete);
                                            delete_url(toDelete, token, delete_callback)
                                            close()
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                        radius={'md'}
                                        variant={'light'}
                                        onClick={close}
                                        styles={{
                                            root: {
                                                border: '1px solid var(--mantine-primary-color-1)'
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Group>
                            </Container>
                    }
                </Modal>
                <Flex
                    my={'lg'}
                    justify={'space-between'}
                >
                    <Title
                        fw={800}
                    >
                        URL SHORTENER HISTORY
                    </Title>
                    <Button
                        variant={'light'}
                        radius={'lg'}
                        onClick={() => navigate('/')}
                        styles={{
                            root: {
                                border: '1px solid var(--mantine-primary-color-1)'
                            }
                        }}
                    >
                        NEW URL
                    </Button>
                </Flex>
                <Input
                    data-autofocus
                    size={'md'}
                    value={search}
                    radius={'lg'}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    rightSectionPointerEvents={'all'}
                    placeholder={'Search'}
                    leftSection={<IconSearch size={16} />}
                    rightSection={
                        <CloseButton
                            aria-label={'Clear input'}
                            onClick={() => setSearch('')}
                            style={{ display: search ? undefined : 'none', background: 'transparent', color: 'inherit' }}
                        />
                    }
                    styles={{
                        input: {
                            color: 'var(--mantine-primary-color-1)',
                            background: 'var(--mantine-primary-color-light)',
                        },
                        section: {
                            color: 'var(--mantine-primary-color-1)',
                        }
                    }}
                />
                <Table
                    verticalSpacing={'md'}
                    mt={'xl'}
                    highlightOnHover
                    withTableBorder
                >
                    <Table.Tr>
                        <Table.Th>
                            <Title fw={800} order={3}>
                                Original Links
                            </Title>
                        </Table.Th>
                        <Table.Th>
                            <Title fw={800} order={3}>
                                Shorten Links
                            </Title>
                        </Table.Th>
                    </Table.Tr>
                    <Table.Tbody>
                        {data ? data.map((item, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>
                                    <Text
                                        fz={'sm'}
                                        fw={500}
                                    >
                                        {item.original_url}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={'sm'}
                                    >
                                        <Anchor
                                            href={item.short_url}
                                            underline={'never'}
                                            size={'sm'}
                                        >
                                            {item.short_url}
                                        </Anchor>
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Group
                                        gap={0}
                                        justify={'flex-end'}
                                    >
                                        <ActionIcon
                                            variant={'subtle'}
                                            color={'gray'}
                                            onClick={() => {
                                                setValue(item.original_url);
                                                setIsUpdate(true);
                                                open();
                                            }}
                                        >
                                            <IconPencil style={{ width: 16, height: 16 }} stroke={1.5} />
                                        </ActionIcon>
                                        <ActionIcon
                                            variant={'subtle'}
                                            color={'red'}
                                            onClick={() => {
                                                setDelete(item.short_url);
                                                setIsUpdate(false);
                                                open();
                                            }}
                                        >
                                            <IconTrash style={{ width: 16, height: 16 }} stroke={1.5} />
                                        </ActionIcon>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        )) : null}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Flex>
    );
}

export default Overview