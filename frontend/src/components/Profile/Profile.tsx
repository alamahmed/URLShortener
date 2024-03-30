import { Flex } from '@mantine/core'
import classes from './Profile.module.css'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Profile = () => {
    // const Profile: React.FC<{ uid: string }> = ({ uid }) => {
    const [user] = useContext(UserContext)
    return (
        <Flex
            h={'90vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}
            className={classes.main_container}
        >
            Hello {user.username}
        </Flex>
    );
}

export default Profile