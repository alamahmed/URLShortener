import { useState } from 'react';
import { Anchor, Button, CloseButton, Container, Flex, Input, Modal, Title } from '@mantine/core'
import { Table, Group, Text, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconSearch, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
// import classes from './History.module.css'

const data = [
    {
        id: 0,
        link: 'https://dashboard.render.com/0',
        shortUrl: 'https://backend.com/1402f43e87365b54d381acf3c31e5b5b',
    },
    {
        id: 1,
        link: 'https://dashboard.render.com/1',
        shortUrl: 'https://backend.com/1402f43e87365b54d381acf3c31e5b5b',
    },
    {
        id: 2,
        link: 'https://dashboard.render.com/2',
        shortUrl: 'https://backend.com/1402f43e87365b54d381acf3c31e5b5b',
    },
    {
        id: 3,
        link: 'https://dashboard.render.com/3',
        shortUrl: 'https://backend.com/1402f43e87365b54d381acf3c31e5b5b',
    },
    {
        id: 4,
        link: 'https://dashboard.render.com/4',
        shortUrl: 'https://backend.com/1402f43e87365b54d381acf3c31e5b5b',
    },
    {
        id: 5,
        link: 'https://dashboard.render.com/5',
        shortUrl: 'https://backend.com/1402f43e87365b54d381acf3c31e5b5b',
    },
];

const History = () => {
    const [isUpdate, setIsUpdate] = useState(true)
    const [toDelete, setDelete] = useState(0);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();



    return (
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
                                        data.splice(toDelete, 1)
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
                    URL SHORTNER HISTORY
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
                    {data.map((item, index) => (
                        <Table.Tr key={item.id}>
                            <Table.Td>
                                <Text
                                    fz={'sm'}
                                    fw={500}
                                >
                                    {item.link}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text
                                    fz={'sm'}
                                >
                                    <Anchor
                                        href={item.shortUrl}
                                        target={'_blank'}
                                        underline={'never'}
                                        size={'sm'}
                                    >
                                        {item.shortUrl}
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
                                            setValue(item.link);
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
                                            setDelete(index);
                                            setIsUpdate(false);
                                            open();
                                        }}
                                    >
                                        <IconTrash style={{ width: 16, height: 16 }} stroke={1.5} />
                                    </ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}

export default History