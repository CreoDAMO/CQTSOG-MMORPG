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
CPP_BUILD_TARGET := CryptoQuestMMORPG-Dapp
DOCKER_BUILD_TARGET := cryptoquestmmorpg-dapp

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
