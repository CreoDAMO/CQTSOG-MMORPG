# CryptoQuest: The Shards of Genesis

## Introduction
Welcome to CryptoQuest: The Shards of Genesis, an ambitious blockchain-based MMORPG where players embark on an epic journey through the realm of Cryptonia. This open-world universe leverages blockchain technology to provide true ownership of in-game assets through NFTs.

## Features
- **True Ownership**: In CryptoQuest, each in-game asset is a unique NFT.
- **Decentralized Economy**: A decentralized marketplace for trading assets.
- **Player Governance**: Zones governed by player-elected councils.
- **Crafting & Enchanting**: Unique item crafting and enchanting.
- **Quests & Adventures**: Dynamic quest system with smart contracts.
- **Cross-Chain Interactions**: Support for multiple blockchains.

![CQTSOG-Logo](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/ebda6f21-f3ba-45e1-8289-cfe8a6c736fb)


## Game Overview
In CryptoQuest: The Shards of Genesis, players explore the mythical realm of Cryptonia, uncovering secrets and battling creatures in a quest to reunify the shards of Genesis.

## Contracts
### Verified Contracts Linked On Polygonscan & Tenderly
Explore the various contracts that power CryptoQuest:

| Contract Name | Address | Network | Tags | Visibility | Verification |
|---------------|---------|---------|------|------------|--------------|
| CryptoQuestTheShardsOfGenesisToken | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon | Visible | Public | Verified |
| ERC1967Proxy (CQT) | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisNFT | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisCollectionNFT | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon | Visible | Public | Verified |
| TimelockControllerUpgradeable | 0x2b5949f0540884c67c1f169b9f535571656e6695 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisDAO | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisMarketplace | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisStaking | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisFarming | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisMMORPG | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisWallet | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon | Visible | Public | Verified |
| CryptoQuestSwap | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisBookNFT | 0x545Ace061A1b64B14641B50CfE317017b01A667b | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x6b07aD60b1d448D0e1cE9dCB24A85B3ab18b9b1E | Polygon | Visible | Public | Verified |
| CQTTokenSaleContract | 0x126D0A70E6413EC44D977C41024A76d84CEDB4A4 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xc36fc9872Bd271BD80365517958e6F48D3b4FA91 | Polygon | Visible | Public | Verified |

## CryptoQuest Token "CQT"

![CQTSOG- Logo for 'CQT CryptoQuest The Shards Of Genesis Token' by combining elements from the provided images  The logo should feature a striking geo](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/9e4797ab-1e12-43e0-9d7e-e3bfa6760119)


## Installation
To install and run CryptoQuest locally, follow these steps:

### Unity Build Installation
1. **Install Unity Hub and Unity Editor**:
   - Download and install [Unity Hub](https://unity3d.com/get-unity/download).
   - Use Unity Hub to install the Unity Editor version 2021.3 LTS or higher.

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/your_username/cryptoquest-unity.git
    cd cryptoquest-unity
    ```

3. **Open the Project in Unity**:
   - Launch Unity Hub.
   - Click on the "Add" button to add the project directory.
   - Select the `cryptoquest-unity` folder.

4. **Install Dependencies**:
    ```bash
    npm install
    ```

5. **Setup Blockchain Integration**:
   - Add the Web3 libraries (`web3.js`, `ethers.js`) to the Unity project.
   - Configure the blockchain network settings in the Unity project settings.

6. **Build the Project**:
   - Go to `File` -> `Build Settings`.
   - Select the target platform (e.g., PC, Mac & Linux Standalone).
   - Click on `Build` and choose the output directory.

### PS5 Build Installation
1. **Setup PlayStation SDK**:
   - Download and install the PlayStation SDK from the official developer portal.

2. **Configure Unity for PS5**:
   - Open the Unity project in Unity Hub.
   - Go to `File` -> `Build Settings`.
   - Select `PS5` as the target platform.
   - Configure the build settings according to the PlayStation SDK documentation.

3. **Connect PS5 Development Kit**:
   - Connect your PS5 Development Kit to your PC.
   - Ensure it is recognized by the PlayStation SDK and Unity.

4. **Build and Deploy**:
   - Click on `Build` to compile the project for PS5.
   - Use the PlayStation SDK tools to deploy the build to the PS5 Development Kit.

### Xbox Build Installation
1. **Setup Xbox SDK**:
   - Download and install the Xbox SDK from the official developer portal.

2. **Configure Unity for Xbox**:
   - Open the Unity project in Unity Hub.
   - Go to `File` -> `Build Settings`.
   - Select `Xbox One` or `Xbox Series X|S` as the target platform.
   - Configure the build settings according to the Xbox SDK documentation.

3. **Connect Xbox Development Kit**:
   - Connect your Xbox Development Kit to your PC.
   - Ensure it is recognized by the Xbox SDK and Unity.

4. **Build and Deploy**:
   - Click on `Build` to compile the project for Xbox.
   - Use the Xbox SDK tools to deploy the build to the Xbox Development Kit.

## Creating a Front-end DApp
Creating a front-end DApp using C++ to interact with all 21 smart contracts in this project is a crucial step. Follow these detailed steps to set up the C++ front-end:

### Setting Up the C++ Front-end
1. **Install Necessary C++ Dependencies**:
    ```bash
    sudo apt-get install qt5-default
    ```

2. **

Create a New C++ Project Structure**:
    ```bash
    mkdir -p /path-to-your-project/src /path-to-your-project/include
    ```

3. **Create C++ Source Files**:
    - **Main Application File (main.cpp)**:
        ```cpp
        #include <QApplication>
        #include "MainWindow.h"

        int main(int argc, char *argv[]) {
            QApplication app(argc, argv);
            MainWindow window;
            window.show();
            return app.exec();
        }
        ```

    - **Main Window Header (MainWindow.h)**:
        ```cpp
        #include <QWidget>
        #include "SmartContractManager.h"

        class MainWindow : public QWidget {
            Q_OBJECT

        public:
            MainWindow(QWidget *parent = 0);

        private:
            SmartContractManager contractManager;
        };
        ```

    - **Main Window Implementation (MainWindow.cpp)**:
        ```cpp
        #include "MainWindow.h"

        MainWindow::MainWindow(QWidget *parent)
            : QWidget(parent), contractManager("http://localhost:8545") {
            contractManager.addContract("Token", "0xTokenContractAddress", "TokenContractABI");
            contractManager.addContract("GameLogic", "0xGameLogicContractAddress", "GameLogicContractABI");
            // Setup UI and connect signals to contract methods
        }
        ```

    - **Smart Contract Manager Header (SmartContractManager.h)**:
        ```cpp
        #include <map>
        #include <web3cpp.h>

        class SmartContractManager {
        public:
            SmartContractManager(const std::string& provider);
            void addContract(const std::string& name, const std::string& address, const std::string& abi);
            std::string callMethod(const std::string& name, const std::string& method, const Json::Value& params);
        private:
            Web3Client client;
            std::map<std::string, Contract> contracts;
        };
        ```

    - **Smart Contract Manager Implementation (SmartContractManager.cpp)**:
        ```cpp
        #include "SmartContractManager.h"

        SmartContractManager::SmartContractManager(const std::string& provider) : client(provider) {}

        void SmartContractManager::addContract(const std::string& name, const std::string& address, const std::string& abi) {
            contracts[name] = client.loadContract(abi, address);
        }

        std::string SmartContractManager::callMethod(const std::::

string& name, const std::string& method, const Json::Value& params) {
            return contracts[name].call(method, params);
        }
        ```

### Building the Project
1. **Compile the Project**:
    ```bash
    qmake && make
    ./YourAppName
    ```

### Docker Integration
1. **Dockerfile**:
    ```dockerfile
    FROM ubuntu:20.04

    RUN apt-get update && apt-get install -y \
        build-essential \
        qt5-default \
        && rm -rf /var/lib/apt/lists/*

    WORKDIR /app
    COPY . /app

    RUN qmake && make

    CMD ["./YourAppName"]
    ```

2. **Build and Run Docker Container**:
    ```bash
    docker build -t cryptoquest-app .
    docker run -it --rm cryptoquest-app
    ```

### Makefile
To streamline the build process, you can use the following Makefile:

```makefile
# Define variables for paths and compiler options
UNREAL_PROJECT_PATH := /path/to/your/unreal/project
UNREAL_BUILD_TOOL := $(UNREAL_PROJECT_PATH)/Engine/Build/BatchFiles/RunUAT.sh
UNREAL_BUILD_CONFIG := Development
UNREAL_BUILD_PLATFORM := Win64

CXX := g++
CXXFLAGS := -std=c++17 -O2
LDFLAGS := -lweb3cpp -lQt5Widgets

SRC_DIR := src
INC_DIR := include
BUILD_DIR := build
DOCKERFILE := Dockerfile

# Define target names
UNREAL_BUILD_TARGET := YourUnrealProject
CPP_BUILD_TARGET := YourAppName
DOCKER_BUILD_TARGET := cryptoquest-app

# Define source files
CPP_SOURCES := $(wildcard $(SRC_DIR)/*.cpp)
CPP_OBJECTS := $(CPP_SOURCES:$(SRC_DIR)/%.cpp=$(BUILD_DIR)/%.o)

# Default target
all: build_unreal build_cpp docker_build

# Build Unreal Engine project
build_unreal:
	@echo "Building Unreal Engine project..."
	$(UNREAL_BUILD_TOOL) BuildCookRun -project=$(UNREAL_PROJECT_PATH)/$(UNREAL_BUILD_TARGET).uproject -noP4 -platform=$(UNREAL_BUILD_PLATFORM) -clientconfig=$(UNREAL_BUILD_CONFIG) -serverconfig=$(UNREAL_BUILD_CONFIG) -cook -allmaps -build -stage -pak -archive -archivedirectory=$(UNREAL_PROJECT_PATH)/Build

# Build C++ front-end
build_cpp: $(CPP_OBJECTS)
	@echo "Building C++ front-end..."
	$(CXX) $(CPP_OBJECTS) $(LDFLAGS) -o $(BUILD_DIR)/$(CPP_BUILD_TARGET)

# Compile C++ source files
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp $(INC_DIR)/%.h
	@mkdir -p $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -I$(INC_DIR) -c $< -o $@

# Docker build
docker_build:
	@echo "Building Docker container..."
	docker build -t $(DOCKER_BUILD_TARGET) -f $(DOCKERFILE) .

# Clean build files
clean:
	@echo "Cleaning build files..."
	rm -rf $(BUILD_DIR)
	rm -rf $(UNREAL_PROJECT_PATH)/Build
	docker rmi $(DOCKER_BUILD_TARGET)

# Run Docker container
docker_run:
	@echo "Running Docker container..."
	docker run -it --rm $(DOCKER_BUILD_TARGET)

.PHONY: all build_unreal build_cpp docker_build clean docker_run
```

## CryptoQuest The Shard's Of Genesis Book NFT

![CQTSOG - A book cover for 'CryptoQuest_ The Shards of Genesis' by Jacque DeGraff  The background features a mystical, ancient world with el](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/636e1729-f740-4c85-9e04-5cd3fb932f3b)


## Developing CryptoQuest in Unity
Follow the steps in the documentation to develop CryptoQuest using Unity, including blockchain integration, NFT management, and game mechanics.

For detailed instructions, visit the [CQTSOG Unity Guide](#).

## Developing CryptoQuest in Unreal Engine 5
Refer to the guide in the documentation for creating CryptoQuest with Unreal Engine 5, covering topics like decentralized economy and player governance.

For detailed instructions, visit the [CQTSOG Unreal Engine 5 Guide](#).

## FAQs
### What is CryptoQuest: The Shards of Genesis?
CryptoQuest is a blockchain-based MMORPG where players own in-game assets as NFTs.

## Conclusion
Developing CryptoQuest: The Shards of Genesis in Unity or Unreal Engine 5 merges traditional game development with blockchain technology, creating a unique and immersive gaming experience.

## Contributing
We welcome contributions! Follow the guidelines in the `CONTRIBUTING.md` file.

## License
CryptoQuest: The Shards of Genesis is licensed under the [MIT License](#).

## Repository Structure

```plaintext
cryptoquest/
├── public/
│   └── CQTSOG-Logo.svg
├── src/
│   ├── components/
│   │   ├── Game.js
│   │   └── ...
│   ├── contexts/
│   │   └── Web3Context.js
│   ├── contracts/
│   │   ├── index.js
│   │   └── web3Modal.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Marketplace.js
│   │   ├── Staking.js
│   │   └── ...
│   ├── styles/
│   │   ├── global.css
│   │   └── ...
│   ├── utils/
│   │   ├── contracts.js
│   │   └── ...
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── cplusplus/
│   ├── src/
│   │   ├── main.cpp
│   │   ├── MainWindow.cpp
│   │   └── SmartContractManager.cpp
│   ├── include/
│   │   ├── MainWindow.h
│   │   └── SmartContractManager.h
│   ├── Dockerfile
│   ├── Makefile
│   └── YourAppName.pro
├── smartcontracts/
│   ├── artifacts/
│   │   └── build-info/
│   │       └── *.json
│   ├── CQTTokenSaleContractsol.sol
│   ├── CryptoQuestSwap.sol
│   ├── CryptoQuestTheShardsOfGenesisBookNFT.sol
│   ├── CryptoQuestTheShardsOfGenesisCollectionNFTs.sol
│   ├── CryptoQuestTheShardsOfGenesisDAO.sol
│   ├── CryptoQuestTheShardsOfGenesisMMORPG.sol
│   ├── CryptoQuestTheShardsOfGenesisMarketplace.sol
│   ├── CryptoQuestTheShardsOfGenesisNFT.sol
│   ├── CryptoQuestTheShardsOfGenesisStaking.sol
│   ├── CryptoQuestTheShardsOfGenesisToken.sol
│   ├── CryptoQuestTheShardsOfGenesisWallet.sol
│   └── CryptoQuestTheShardsOfGenesisFarming.sol
├── .eslintrc.cjs
├── .

gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
```

---

This comprehensive README along with it's guides provides the necessary steps to install, build, and run CryptoQuest: The Shards of Genesis in Unity, PS5, and Xbox environments. The provided Makefile simplifies the build process for various platforms, ensuring smooth deployment and testing. The repository structure offers a clear overview of the project's organization, making it easier for developers to navigate and contribute to the project.
```
