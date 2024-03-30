import { Box, Progress, PasswordInput, Text, Center, Popover } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useState } from 'react';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text
            component={'div'}
            c={meets ? 'teal' : 'red'}
            mt={5}
            size={'sm'}
        >
            <Center inline>
                {meets ? <IconCheck size={'0.9rem'} stroke={1.5} /> : <IconX size={'0.9rem'} stroke={1.5} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}
const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];
function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}
interface passwordProps {
    label: string,
    placeHolder: string,
    value: string,
    handleChange: (strength: number, value: string) => void | null,
}
const Password = ({ label, placeHolder, value, handleChange }: passwordProps) => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return (
        <Popover opened={popoverOpened} position={'bottom'} width={'target'} transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        withAsterisk
                        label={label}
                        placeholder={placeHolder}
                        value={value}
                        onChange={(e) => {
                            let temp = getStrength(e.target.value)
                            handleChange(temp, e.target.value)
                        }}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb={'xs'} />
                <PasswordRequirement label={'Includes at least 6 characters'} meets={value.length > 5} />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
}

export default Password