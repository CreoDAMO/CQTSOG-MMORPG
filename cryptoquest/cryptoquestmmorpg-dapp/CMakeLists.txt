cmake_minimum_required(VERSION 3.10)
project(CryptoQuest)

set(CMAKE_CXX_STANDARD 17)

# Find and include JSON library
find_package(nlohmann_json 3.2.0 REQUIRED)
include_directories(${nlohmann_json_INCLUDE_DIRS})

# Include web3cpp library
include_directories(/path/to/web3cpp/include)
link_directories(/path/to/web3cpp/lib)

# Add your source files
add_executable(CryptoQuest main.cpp SmartContractManager.cpp)

# Link libraries
target_link_libraries(CryptoQuest PRIVATE nlohmann_json::nlohmann_json web3cpp)
