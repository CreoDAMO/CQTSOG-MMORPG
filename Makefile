# Variables
APP_NAME = cqtsog-mmorpg
NPM = npm
NODE_ENV = development
IPFS = ipfs
CURL = curl
INFURA_API = https://ipfs.infura.io:5001/api/v0

# Commands
install:
	@echo "Installing dependencies..."
	@$(NPM) install

start:
	@echo "Starting the development server..."
	@$(NPM) start

build:
	@echo "Building the project..."
	@$(NPM) run build

test:
	@echo "Running tests..."
	@$(NPM) test

lint:
	@echo "Linting the code..."
	@$(NPM) run lint

format:
	@echo "Formatting the code..."
	@$(NPM) run format

clean:
	@echo "Cleaning the project..."
	@rm -rf node_modules
	@rm -rf build

setup:
	@echo "Setting up the development environment..."
	@$(NPM) install

# IPFS-related commands
ipfs-init:
	@echo "Initializing IPFS..."
	@$(IPFS) init

ipfs-start:
	@echo "Starting IPFS daemon..."
	@$(IPFS) daemon

ipfs-add:
	@echo "Adding file to IPFS..."
	@if [ -z "$(FILE)" ]; then echo "Error: FILE variable is not set"; exit 1; fi
	@$(IPFS) add $(FILE)

ipfs-pin:
	@echo "Pinning file to IPFS..."
	@if [ -z "$(CID)" ]; then echo "Error: CID variable is not set"; exit 1; fi
	@$(IPFS) pin add $(CID)

infura-add:
	@echo "Uploading file to Infura IPFS..."
	@if [ -z "$(FILE)" ]; then echo "Error: FILE variable is not set"; exit 1; fi
	@$(CURL) -X POST -F file=@$(FILE) "$(INFURA_API)/add"

infura-pin:
	@echo "Pinning file on Infura IPFS..."
	@if [ -z "$(CID)" ]; then echo "Error: CID variable is not set"; exit 1; fi
	@$(CURL) -X POST "$(INFURA_API)/pin/add?arg=$(CID)"

# Default target
.PHONY: install start build test lint format clean setup ipfs-init ipfs-start ipfs-add ipfs-pin infura-add infura-pin

# Instructions
# Use `make install` to install dependencies
# Use `make start` to start the development server
# Use `make build` to build the project
# Use `make test` to run tests
# Use `make lint` to lint the code
# Use `make format` to format the code
# Use `make clean` to clean the project
# Use `make setup` to set up the development environment
# Use `make ipfs-init` to initialize IPFS
# Use `make ipfs-start` to start the IPFS daemon
# Use `make ipfs-add FILE=<file-path>` to add a file to IPFS
# Use `make ipfs-pin CID=<cid>` to pin a file on IPFS
# Use `make infura-add FILE=<file-path>` to upload a file to Infura IPFS
# Use `make infura-pin CID=<cid>` to pin a file on Infura IPFS
# Variables
APP_NAME = cqtsog-mmorpg
NPM = npm
NODE_ENV = development
IPFS = ipfs
CURL = curl
INFURA_API = https://ipfs.infura.io:5001/api/v0

# Commands
install:
	@echo "Installing dependencies..."
	@$(NPM) install

start:
	@echo "Starting the development server..."
	@$(NPM) run dev

build:
	@echo "Building the project..."
	@$(NPM) run build

test:
	@echo "Running tests..."
	@$(NPM) test

lint:
	@echo "Linting the code..."
	@$(NPM) run lint

format:
	@echo "Formatting the code..."
	@$(NPM) run format

clean:
	@echo "Cleaning the project..."
	@rm -rf node_modules
	@rm -rf dist

setup:
	@echo "Setting up the development environment..."
	@$(NPM) install

# IPFS-related commands
ipfs-init:
	@echo "Initializing IPFS..."
	@$(IPFS) init

ipfs-start:
	@echo "Starting IPFS daemon..."
	@$(IPFS) daemon

ipfs-add:
	@echo "Adding file to IPFS..."
	@if [ -z "$(FILE)" ]; then echo "Error: FILE variable is not set"; exit 1; fi
	@$(IPFS) add $(FILE)

ipfs-pin:
	@echo "Pinning file to IPFS..."
	@if [ -z "$(CID)" ]; then echo "Error: CID variable is not set"; exit 1; fi
	@$(IPFS) pin add $(CID)

infura-add:
	@echo "Uploading file to Infura IPFS..."
	@if [ -z "$(FILE)" ]; then echo "Error: FILE variable is not set"; exit 1; fi
	@$(CURL) -X POST -F file=@$(FILE) "$(INFURA_API)/add"

infura-pin:
	@echo "Pinning file on Infura IPFS..."
	@if [ -z "$(CID)" ]; then echo "Error: CID variable is not set"; exit 1; fi
	@$(CURL) -X POST "$(INFURA_API)/pin/add?arg=$(CID)"

# Default target
.PHONY: install start build test lint format clean setup ipfs-init ipfs-start ipfs-add ipfs-pin infura-add infura-pin

# Instructions
# Use `make install` to install dependencies
# Use `make start` to start the development server
# Use `make build` to build the project
# Use `make test` to run tests
# Use `make lint` to lint the code
# Use `make format` to format the code
# Use `make clean` to clean the project
# Use `make setup` to set up the development environment
# Use `make ipfs-init` to initialize IPFS
# Use `make ipfs-start` to start the IPFS daemon
# Use `make ipfs-add FILE=<file-path>` to add a file to IPFS
# Use `make ipfs-pin CID=<cid>` to pin a file on IPFS
# Use `make infura-add FILE=<file-path>` to upload a file to Infura IPFS
# Use `make infura-pin CID=<cid>` to pin a file on Infura IPFS
