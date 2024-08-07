# Variables
APP_NAME = cryptoquestmmorpg-dapp
PYTHON_ENV = env

# Commands
install-dependencies:
	@cd $(APP_NAME) && npm install --legacy-peer-deps
	@cd $(APP_NAME) && npm install -D tailwindcss postcss autoprefixer react-app-rewired react-app-rewire-alias --legacy-peer-deps

install-blockchain-dependencies:
	@cd $(APP_NAME) && npm install web3 ethers @uniswap/sdk @aave/contract-helpers reflect-metadata dotenv --legacy-peer-deps

setup-python-env:
	python3 -m venv $(PYTHON_ENV)
	$(PYTHON_ENV)/bin/pip install -r $(APP_NAME)/src/data-processing-and-analytics/requirements.txt

build-bot:
	@cd $(APP_NAME) && node src/build-arbitrage-bot.js

run-bot:
	@cd $(APP_NAME) && node src/arbitrage-bot.js

start:
	@cd $(APP_NAME) && npm start

build:
	@cd $(APP_NAME) && npm run build

test:
	@cd $(APP_NAME) && npm test

format:
	@cd $(APP_NAME) && npm run format

eject:
	@cd $(APP_NAME) && npm run eject

clean:
	@rm -rf $(APP_NAME)/node_modules
	@rm -f $(APP_NAME)/package-lock.json

clean-python-env:
	@rm -rf $(PYTHON_ENV)

# Targets
.PHONY: install-dependencies install-blockchain-dependencies setup-python-env build-bot run-bot start build test format eject clean clean-python-env
