cmake_minimum_required(VERSION 3.10)

# Set the project name
project(CryptoQuestMMORPG)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Add the executable
add_executable(CryptoQuestMMORPG
    src/ccp/main.cpp
    src/ccp/GameSessionManager.cpp
    src/ccp/GameSessionManager.h
    src/ccp/MainWindow.cpp
    src/ccp/MainWindow.h
    src/ccp/MultiplayerGameManager.cpp
    src/ccp/MultiplayerGameManager.h
    src/ccp/SmartContractInterface.cpp
    src/ccp/SmartContractInterface.h
    src/ccp/SmartContractManager.cpp
    src/ccp/SmartContractManager.h
)

# Include directories
target_include_directories(CryptoQuestMMORPG PUBLIC ${PROJECT_SOURCE_DIR}/include)

# Link libraries
# target_link_libraries(CryptoQuestMMORPG <libraries>)
