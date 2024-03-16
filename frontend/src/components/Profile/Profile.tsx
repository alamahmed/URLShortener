import { Flex } from '@mantine/core'
import History from '../History/History';
import classes from './Profile.module.css'

const Profile = () => {

    return (
        <Flex
            h={'90vh'}
            direction={'column'}
            className={classes.main_container}
        >
            <History />
        </Flex>
    );
}

export default Profile