# Variables
APP_NAME = cryptoquestmmorpg-dapp
PYTHON_ENV = env

# Commands
create-react-app:
	@if [ ! -d "$(APP_NAME)" ]; then \
		npx create-react-app $(APP_NAME); \
	else \
		echo "$(APP_NAME) already exists, skipping create-react-app."; \
	fi

install-dependencies:
	@cd $(APP_NAME) && npm install --legacy-peer-deps
	@cd $(APP_NAME) && npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps
	@cd $(APP_NAME) && npx tailwindcss init -p

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
.PHONY: create-react-app install-dependencies install-blockchain-dependencies setup-python-env build-bot run-bot start build test format eject clean clean-python-env
