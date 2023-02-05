import { Avatar, Flex, Stack, Text, Box } from '@chakra-ui/react';
import { MessagePopulated } from '../../../../../backend/src/util/types';
import { formatRelative } from 'date-fns';
import tr from 'date-fns/locale/tr';

interface MessageItemProps {
    message: MessagePopulated;
    sentByMe: boolean;
}
const formatRelativeLocale = {
    lastWeek: "eeee 'at' p",
    yesterday: "'Dün' p",
    today: "p",
    other: "MM/dd/YYYY"
}


const MessageItem: React.FC<MessageItemProps> = ({ message, sentByMe }) => {

    return (
        <Stack
            direction="row"
            p={4}
            spacing={4}
            _hover={{ bg: "whiteAlpha.200" }}
            justify={sentByMe ? "flex-end" : "flex-start"}
            wordBreak="break-word"
        >
            {!sentByMe && (
                <Flex align="flex-end">
                    <Avatar size="sm" />
                </Flex>
            )}
            <Stack spacing={1} width="100%">
                <Stack
                    direction="row"
                    align="center"
                    justify={sentByMe ? "flex-end" : "flex-start"}
                >
                    {!sentByMe && (
                        <Text fontWeight={500} textAlign="left">
                            {message.sender.username}
                        </Text>
                    )}
                    <Text fontSize={14} color="whiteAlpha.700">
                        {formatRelative(message.createdAt, new Date(), {
                            locale: {
                                ...tr,
                                formatRelative: (token) => formatRelativeLocale[
                                    token as keyof typeof formatRelativeLocale
                                ],
                            },
                        })}
                    </Text>
                </Stack>
                <Flex justify={sentByMe ? "flex-end" : "flex-start"}>
                    <Box bg={sentByMe ? "brand.100" : "whiteAlpha.300"}
                    px={2}
                    py={1}
                    borderRadius={12}
                    maxWidth="65%"
                    >
                        <Text>{message.body}</Text>
                    </Box>
                </Flex>
            </Stack>
        </Stack>
    )
}
// 
export default MessageItem