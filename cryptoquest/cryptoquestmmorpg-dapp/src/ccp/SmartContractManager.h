#include <map>
#include <web3cpp.h>

class SmartContractManager {
public:
    SmartContractManager(const std::string& provider);
    void addContract(const std::string& name, const std::string& address, const std::string& abi
