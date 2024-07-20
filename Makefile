# Makefile for setting up the combined project

# Variables
LANDING_PAGE = landing-page
DAPP_FRONTEND = dapp-frontend

# Commands
create-react-app:
	@npx create-react-app $(LANDING_PAGE)
	@npx @0xpolygon/dapp-launchpad init $(DAPP_FRONTEND)

install-dependencies:
	@cd $(LANDING_PAGE) && npm install
	@cd $(DAPP_FRONTEND) && npm install

start:
	@concurrently "cd $(LANDING_PAGE) && npm start" "cd $(DAPP_FRONTEND) && npm start"

build:
	@cd $(LANDING_PAGE) && npm run build
	@cd $(DAPP_FRONTEND) && npm run build

test:
	@cd $(LANDING_PAGE) && npm test
	@cd $(DAPP_FRONTEND) && npm test

eject:
	@cd $(LANDING_PAGE) && npm run eject
	@cd $(DAPP_FRONTEND) && npm run eject

clean:
	@rm -rf $(LANDING_PAGE)/node_modules
	@rm -f $(LANDING_PAGE)/package-lock.json
	@rm -rf $(DAPP_FRONTEND)/node_modules
	@rm -f $(DAPP_FRONTEND)/package-lock.json

lint:
	@cd $(LANDING_PAGE) && npm run lint
	@cd $(DAPP_FRONTEND) && npm run lint

format:
	@cd $(LANDING_PAGE) && npm run format
	@cd $(DAPP_FRONTEND) && npm run format

# Targets
.PHONY: create-react-app install-dependencies start build test eject clean lint format
