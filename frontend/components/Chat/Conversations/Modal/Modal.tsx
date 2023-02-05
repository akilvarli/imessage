import { useState } from 'react';
import {
    Modal,
    Stack,
    Input,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";
import { useLazyQuery, useMutation } from '@apollo/client';
import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import { SearchUsersData, SearchUsersInput, SearchedUser, CreateConversationData, CreateConversationInput } from '../../../../util/types';
import UserSearchList from './UserSearchList';
import { Session } from 'next-auth';
import Participants from './Participants';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface ConversationModalProps {
    session: Session
    isOpen: boolean;
    onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ isOpen, onClose, session }) => {

    const { user: { id: userId } } = session;

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [participants, setParticipants] = useState<Array<SearchedUser>>([])

    const [searchUsers, { data, error, loading }] = useLazyQuery<
        SearchUsersData,
        SearchUsersInput
    >(UserOperations.Queries.searchUsers);

    const [createConversation, { loading: createConversationLoading }] = useMutation<
        CreateConversationData,
        CreateConversationInput
    >(ConversationOperations.Mutations.createConversation)

    const onCreateConversation = async () => {

        const participantIds = [userId, ...participants.map((p) => p.id)]

        try {

            const { data } = await createConversation({
                variables: {
                    participantIds
                }
            })


            if (!data?.createConversation) {
                throw new Error("Failed to created conversation");
            }

            const {
                createConversation: { conversationId }
            } = data;


            router.push({ query: { conversationId } })

            /**
             * Clear state and close modal
             * on successful creation
             */

            setParticipants([]);
            setUsername("");
            onClose();

        } catch (error: any) {
            console.log("onCrateConversation error", error);
            toast.error(error?.message)
        }
    }

    const onSearch = (e: React.FormEvent) => {
        // searchUsers query
        e.preventDefault();
        searchUsers({ variables: { username } })
    }

    const addParticipant = (user: SearchedUser) => {
        setParticipants((prev) => [...prev, user]);
        setUsername("");
    }

    const removeParticipant = (userId: string) => {
        setParticipants((prev) => prev.filter((p) => p.id !== userId));
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#2d2d2d" pb={4}>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={onSearch}>
                            <Stack spacing={4}>
                                <Input
                                    placeholder='Enter a username'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <Button type='submit' disabled={!username} isLoading={loading}>Search</Button>
                            </Stack>
                        </form>
                        {data?.searchUsers &&
                            <UserSearchList
                                users={data?.searchUsers}
                                addParticipant={addParticipant}
                            />
                        }
                        {participants.length !== 0 && (
                            <>
                                <Participants
                                    participants={participants}
                                    removeParticipant={removeParticipant}
                                />
                                <Button
                                    bg="brand.100"
                                    width="100%"
                                    mt={6}
                                    _hover={{ bg: "brand.100" }}
                                    isLoading={createConversationLoading}
                                    onClick={() => onCreateConversation()}
                                >Create Conversation</Button>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConversationModal