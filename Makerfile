# Makefile for CryptoQuest: The Shards of Genesis DApp

# Variables
APP_NAME = cryptoquesttheshardsofgenesismmorpg-dapp
NPM = npm
NODE_ENV = development

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

# Default target
.PHONY: install start build test lint format clean setup

# Instructions
# Use `make install` to install dependencies
# Use `make start` to start the development server
# Use `make build` to build the project
# Use `make test` to run tests
# Use `make lint` to lint the code
# Use `make format` to format the code
# Use `make clean` to clean the project
# Use `make setup` to set up the development environment
