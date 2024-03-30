import { Flex, Title } from '@mantine/core'
import { AreaChart } from '@mantine/charts'
import classes from './UnauthorizedPage.module.css'

const UnauthorizedPage = () => {

    return (
        <Flex
            h={'90vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}
            className={classes.main_container}
        >
            <Title
                c={'var(--mantine-primary-color-1)'}
            >
                Login to see your data
            </Title>
        </Flex>
    );
}

export default UnauthorizedPage