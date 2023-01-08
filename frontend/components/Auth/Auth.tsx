import { Button, Center, Stack, Text, Image, Input } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { Session } from 'next-auth';

type IAuthProps = {
    session: Session | null;
    reloadSession: () => void
}

const Auth: React.FC<IAuthProps> = ({
    session,
    reloadSession
}) => {

    const [username, setUsername] = useState("");

    const onSubmit = async () => {
        try {
            /**
             * createUserName mutation send our username to the GraphQL API
             */
        } catch (error) {
            console.log("onSubmit error", error);
        }
    }

    return (
        <Center height="100vh" border="1px solid red">
            <Stack spacing={8} align="center">
                {session ? (
                    <>
                        <Text fontSize="3xl"> Create a username</Text>
                        <Input
                            placeholder='Enter a username'
                            value={username}
                            onChange={(e) => e.target.value}
                        />
                        <Button width="100%" onClick={onSubmit}>Save</Button>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl">MessengerQL</Text>
                        <Button onClick={() => signIn("google")} leftIcon={<Image height="20px" src='/images/googlelogo.png' />}>Continue with Google</Button>
                    </>
                )}
            </Stack>
        </Center>
    )
}

export default Auth