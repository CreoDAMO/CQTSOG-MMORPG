# Variables
APP_NAME = cryptoquestmmorpg-dapp
PYTHON_ENV = env
NODE_ENV = production

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
	@cd $(APP_NAME) && NODE_ENV=$(NODE_ENV) node src/build-arbitrage-bot.js

run-bot:
	@cd $(APP_NAME) && NODE_ENV=$(NODE_ENV) node src/arbitrage-bot.js

start:
	@cd $(APP_NAME) && npm start

build:
	@cd $(APP_NAME) && NODE_ENV=$(NODE_ENV) npm run build

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

# CI Commands
ci-prepare: clean clean-python-env install-dependencies install-blockchain-dependencies setup-python-env build

ci-test: ci-prepare test

ci-lint:
	@cd $(APP_NAME) && npm run lint

ci-deploy:
	# Add deployment commands here (e.g., `scp`, `rsync`, or deploy to cloud services)
	@echo "Deploying the build..."
	# Example: scp -r $(APP_NAME)/build user@host:/path/to/deployment

ci-cleanup: clean clean-python-env
	@echo "CI cleanup done."

# Targets
.PHONY: install-dependencies install-blockchain-dependencies setup-python-env build-bot run-bot start build test format eject clean clean-python-env ci-prepare ci-test ci-lint ci-deploy ci-cleanup
