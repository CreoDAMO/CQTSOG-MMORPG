#include "SmartContractManager.h"
#include <iostream>
#include <stdexcept>
#include <web3cpp/transaction.h>

SmartContractManager::SmartContractManager(const std::string& providerUrl, const std::string& contractAddress, const std::string& abi)
    : contractAddress(contractAddress), abi(abi), client(providerUrl), contract(client, abi, contractAddress) {
    // Initialize the web3 client and contract here
}

SmartContractManager::~SmartContractManager() {
    // Clean up resources if necessary
}

std::string SmartContractManager::deployContract(const std::string& bytecode, const std::string& senderPrivateKey) {
    try {
        web3::Transaction tx = client.createTransaction();
        tx.setData(bytecode);
        tx.setGas(3000000); // Set appropriate gas limit
        tx.setGasPrice(client.ethGasPrice());
        tx.setNonce(client.ethGetTransactionCount(client.getAddress(senderPrivateKey), "latest"));
        tx.setTo("");

        std::string signedTx = tx.sign(senderPrivateKey);
        std::string txHash = client.ethSendRawTransaction(signedTx);
        return txHash;
    } catch (const std::exception& ex) {
        std::cerr << "Error deploying contract: " << ex.what() << std::endl;
        throw;
    }
}

Json::Value SmartContractManager::callFunction(const std::string& functionName, const std::vector<std::string>& params) {
    try {
        return contract.call(functionName, params);
    } catch (const std::exception& ex) {
        std::cerr << "Error calling function: " << ex.what() << std::endl;
        throw;
    }
}

std::string SmartContractManager::sendTransaction(const std::string& functionName, const std::vector<std::string>& params, const std::string& senderPrivateKey) {
    try {
        std::string signedTx = createSignedTransaction(functionName, params, senderPrivateKey);
        std::string txHash = client.ethSendRawTransaction(signedTx);
        return txHash;
    } catch (const std::exception& ex) {
        std::cerr << "Error sending transaction: " << ex.what() << std::endl;
        throw;
    }
}

void SmartContractManager::listenForEvents(const std::string& eventName) {
    try {
        contract.on(eventName, [](const Json::Value& event) {
            std::cout << "Event received: " << event.toStyledString() << std::endl;
        });
    } catch (const std::exception& ex) {
        std::cerr << "Error listening for events: " << ex.what() << std::endl;
        throw;
    }
}

std::string SmartContractManager::createSignedTransaction(const std::string& functionName, const std::vector<std::string>& params, const std::string& senderPrivateKey) {
    web3::Transaction tx = client.createTransaction();
    tx.setData(contract.functionCallData(functionName, params));
    tx.setGas(3000000); // Set appropriate gas limit
    tx.setGasPrice(client.ethGasPrice());
    tx.setNonce(client.ethGetTransactionCount(client.getAddress(senderPrivateKey), "latest"));
    tx.setTo(contractAddress);

    return tx.sign(senderPrivateKey);
}
