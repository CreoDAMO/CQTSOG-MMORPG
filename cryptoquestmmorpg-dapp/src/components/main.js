// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', async function () {
    const buyCQTButton = document.getElementById('buyCQTButton');
    const stakeTokensButton = document.getElementById('stakeTokensButton');
    const unstakeTokensButton = document.getElementById('unstakeTokensButton');
    const addLiquidityButton = document.getElementById('addLiquidityButton');
    const removeLiquidityButton = document.getElementById('removeLiquidityButton');
    const swapMATICForTokensButton = document.getElementById('swapMATICForTokensButton');
    const swapTokensForMATICButton = document.getElementById('swapTokensForMATICButton');

    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        // Use MetaMask's provider
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Accounts now exposed
        } catch (error) {
            // User denied account access...
            console.error("User denied account access")
        }
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // Fallback to localhost; use dev console port by default...
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    // Event listeners for each button
    buyCQTButton.addEventListener('click', buyCQTToken);
    stakeTokensButton.addEventListener('click', stakeTokens);
    unstakeTokensButton.addEventListener('click', unstakeTokens);
    addLiquidityButton.addEventListener('click', addLiquidity);
    removeLiquidityButton.addEventListener('click', removeLiquidity);
    swapMATICForTokensButton.addEventListener('click', swapMATICForTokens);
    swapTokensForMATICButton.addEventListener('click', swapTokensForMATIC);
});

// Define each function
async function buyCQTToken() {
    console.log('Buy CQT Token button clicked');
    // Implement your buy token logic here
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log("Account:", account);

    // Example transaction object
    const transactionObject = {
        from: account,
        to: '0xYourTokenContractAddress', // Replace with your token contract address
        value: web3.utils.toWei('1', 'ether'), // Replace with the amount to buy
        gas: 2000000
    };

    web3.eth.sendTransaction(transactionObject)
        .on('receipt', function (receipt) {
            console.log('Transaction receipt:', receipt);
        })
        .on('error', function (error) {
            console.error('Transaction error:', error);
        });
}

async function stakeTokens() {
    console.log('Stake Tokens button clicked');
    // Implement your stake tokens logic here
    // Example: Interact with your staking contract
}

async function unstakeTokens() {
    console.log('Unstake Tokens button clicked');
    // Implement your unstake tokens logic here
    // Example: Interact with your staking contract
}

async function addLiquidity() {
    console.log('Add Liquidity button clicked');
    // Implement your add liquidity logic here
    // Example: Interact with your liquidity contract
}

async function removeLiquidity() {
    console.log('Remove Liquidity button clicked');
    // Implement your remove liquidity logic here
    // Example: Interact with your liquidity contract
}

async function swapMATICForTokens() {
    console.log('Swap MATIC for Tokens button clicked');
    // Implement your swap MATIC for tokens logic here
    // Example: Interact with your swap contract
}

async function swapTokensForMATIC() {
    console.log('Swap Tokens for MATIC button clicked');
    // Implement your swap tokens for MATIC logic here
    // Example: Interact with your swap contract
}
