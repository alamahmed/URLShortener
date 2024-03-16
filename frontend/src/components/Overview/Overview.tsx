import { Flex, Title } from '@mantine/core'
import { AreaChart } from '@mantine/charts'
import { data } from './data'
import classes from './Overview.module.css'

const Overview = () => {

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
                Past 10 days Usage
            </Title>
            <AreaChart
                data={data}
                dataKey={'date'}
                withLegend
                tooltipAnimationDuration={300}
                className={classes.graph}
                series={[
                    { name: 'links', color: 'var(--mantine-primary-color-1)' },
                ]}
                curveType={'linear'}
                tickLine={'none'}
                gridAxis={'none'}
            />
        </Flex>
    );
}

export default Overview