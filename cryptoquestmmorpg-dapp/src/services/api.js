import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pools';

// Function to fetch data for a specific pool
const fetchPoolData = async (poolAddress) => {
  try {
    const response = await axios.get(`${API_URL}/${poolAddress}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for pool ${poolAddress}`, error);
    throw error;
  }
};

// Function to fetch data for all pools
export const fetchAllPoolData = async () => {
  const poolAddresses = [
    '0x0b3CD8a843DEFDF01564a0342a89ba06c4fC9394', // MATIC/CQT
    '0x9a8994d7da7bf54d120943dec46dEEA79bb0f592', // WBTC/CQT
    '0xb1E0B26f550203FAb31A0D9C1Eb4FFE330bfE4d0', // WETH/CQT
    // Add more pool addresses here
  ];

  try {
    const allPoolsData = await Promise.all(
      poolAddresses.map((address) => fetchPoolData(address))
    );
    return allPoolsData;
  } catch (error) {
    console.error('Error fetching data for all pools', error);
    throw error;
  }
};
