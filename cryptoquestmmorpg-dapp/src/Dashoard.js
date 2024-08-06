import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import TradeForm from './TradeForm';
import ReinvestForm from './ReinvestForm';

const Dashboard = ({ signer }) => (
    <Box p={4}>
        <Heading mb={6}>Dashboard</Heading>
        <SimpleGrid columns={[1, null, 2]} spacing={4}>
            <Box p={4} borderWidth="1px" borderRadius="lg">
                <Heading size="md" mb={4}>Trade</Heading>
                <TradeForm signer={signer} />
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="lg">
                <Heading size="md" mb={4}>Reinvest Profits</Heading>
                <ReinvestForm signer={signer} />
            </Box>
        </SimpleGrid>
    </Box>
);

export default Dashboard;
