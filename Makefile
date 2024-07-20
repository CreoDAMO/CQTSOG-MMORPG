 Makefile for setting up the cryptoquestmmorpg-dapp project

# Variables
APP_NAME = cryptoquestmmorpg-dapp

# Commands
create-react-app:
	@npx create-react-app $(APP_NAME)

install-dependencies:
	@cd $(APP_NAME) && npm install

start:
	@cd $(APP_NAME) && npm start

build:
	@cd $(APP_NAME) && npm run build

test:
	@cd $(APP_NAME) && npm test

eject:
	@cd $(APP_NAME) && npm run eject

clean:
	@rm -rf $(APP_NAME)/node_modules
	@rm -f $(APP_NAME)/package-lock.json

# Targets
.PHONY: create-react-app install-dependencies start build test eject clean
