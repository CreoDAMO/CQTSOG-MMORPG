#include <web3cpp.h>

class SmartContractInterface {
public:
    SmartContractInterface(const std::string& provider, const std::string& contractAddress, const std::string& abi);
    std::string callMethod(const std::string& method, const Json::Value& params);
private:
    Web3Client client;
    Contract contract;
};
