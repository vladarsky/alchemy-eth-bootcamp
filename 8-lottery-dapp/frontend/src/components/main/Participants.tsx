import {Block, Button, Section, Title, Text} from "../shared/utils.tsx";



export const Participants = ({participants, refresh}) => {
    return <Section>
        <Block>
            <Title>Participants:</Title>
        </Block>
        {participants?.map((participant: string, index) => (
            <Block key={index}><Text>Participant {index + 1}: {participant}</Text></Block>
        ))}

        <Button onClick={() => refresh()}>Refresh List</Button>
    </Section>
}