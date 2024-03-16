import { Flex } from '@mantine/core'
import classes from './Settings.module.css'

const Profile = () => {

    return (
        <Flex
            h={'90vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}
            className={classes.main_container}
        >
            THIS IS SETTINGS
        </Flex>
    );
}

export default Profile