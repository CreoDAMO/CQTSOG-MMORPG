#include "MainWindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QWidget(parent), contractManager("http://localhost:8545") {
    contractManager.addContract("Token", "0xTokenContractAddress", "TokenContractABI");
    contractManager.addContract("GameLogic", "0xGameLogicContractAddress", "GameLogicContractABI");
    // Setup UI and connect signals to contract methods
}
