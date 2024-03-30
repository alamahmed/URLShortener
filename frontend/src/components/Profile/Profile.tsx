import { Flex } from '@mantine/core'
import classes from './Profile.module.css'

const Profile: React.FC<{ uid: string }> = ({ uid }) => {

    return (
        <Flex
            h={'90vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}
            className={classes.main_container}
        >
            Here I will add profile section
        </Flex>
    );
}

export default Profile