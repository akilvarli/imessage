import { Button } from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

type IChatProps = {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div>Chat
      <Button onClick={() => signOut()}>Sign Out</Button>

    </div>
  )
}

export default Chat