#include "SmartContractInterface.h"

SmartContractInterface::SmartContractInterface(const std::string& provider, const std::string& contractAddress, const std::string& abi)
    : client(provider), contract(client.loadContract(abi, contractAddress)) {}

std::string SmartContractInterface::callMethod(const std::string& method, const Json::Value& params) {
    return contract.call(method, params);
}
