# Makefile for setting up the cryptoquestmmorpg-dapp project with additional Python libraries

# Variables
APP_NAME = cryptoquestmmorpg-dapp
PYTHON_ENV = env

# Commands
create-react-app:
	# Create a new React app with the specified name
	@npx create-react-app $(APP_NAME)

install-dependencies:
	# Navigate into the project directory and install dependencies
	@cd $(APP_NAME) && npm install
	# Install PostCSS and Tailwind CSS
	@cd $(APP_NAME) && npm install -D tailwindcss postcss autoprefixer
	# Initialize Tailwind CSS configuration files
	@cd $(APP_NAME) && npx tailwindcss init -p

install-blockchain-dependencies:
	# Navigate into the project directory and install blockchain-specific dependencies
	@cd $(APP_NAME) && npm install web3 ethers

setup-python-env:
	# Set up Python virtual environment and install dependencies
	python3 -m venv $(PYTHON_ENV)
	$(PYTHON_ENV)/bin/pip install -r requirements.txt

build-bot:
	# Build the arbitrage bot
	@cd $(APP_NAME) && npm run build-bot

run-bot:
	# Run the arbitrage bot
	@cd $(APP_NAME) && npm run run-bot

start:
	# Navigate into the project directory and start the development server
	@cd $(APP_NAME) && npm start

build:
	# Navigate into the project directory and create an optimized production build
	@cd $(APP_NAME) && npm run build

test:
	# Navigate into the project directory and run tests
	@cd $(APP_NAME) && npm test

format:
	# Navigate into the project directory and run prettier
	@cd $(APP_NAME) && npm run format

eject:
	# Navigate into the project directory and eject the configuration
	@cd $(APP_NAME) && npm run eject

clean:
	# Remove the node_modules directory and package-lock.json file
	@rm -rf $(APP_NAME)/node_modules
	@rm -f $(APP_NAME)/package-lock.json

clean-python-env:
	# Remove the Python virtual environment
	@rm -rf $(PYTHON_ENV)

# Targets
.PHONY: create-react-app install-dependencies install-blockchain-dependencies setup-python-env build-bot run-bot start build test format eject clean clean-python-env
