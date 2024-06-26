#include <iostream>
#include "SmartContractManager.h"

int main() {
    // Example provider URL, contract address and ABI (replace with actual values)
    std::string providerUrl = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID";
    std::string contractAddress = "0xYourContractAddress";
    std::string abi = R"([
        {
            "constant": true,
            "inputs": [],
            "name": "myFunction",
            "outputs": [{"name": "", "type": "string"}],
            "type": "function"
        }
    ])";

    // Create a SmartContractManager instance
    SmartContractManager manager(providerUrl, contractAddress, abi);

    // Example bytecode and private key for deployment (replace with actual values)
    std::string bytecode = "0xYourBytecode";
    std::string senderPrivateKey = "YourPrivateKey";

    try {
        // Deploy a contract
        std::string deployedTxHash = manager.deployContract(bytecode, senderPrivateKey);
        std::cout << "Deployed contract transaction hash: " << deployedTxHash << std::endl;

        // Call a function
        std::vector<std::string> params;
        Json::Value result = manager.callFunction("myFunction", params);
        std::cout << "Function call result: " << result.toStyledString() << std::endl;

        // Send a transaction
        std::string txHash = manager.sendTransaction("myFunction", params, senderPrivateKey);
        std::cout << "Transaction hash: " << txHash << std::endl;

        // Listen for events
        manager.listenForEvents("MyEvent");
    } catch (const std::exception& ex) {
        std::cerr << "Exception: " << ex.what() << std::endl;
    }

    return 0;
}
