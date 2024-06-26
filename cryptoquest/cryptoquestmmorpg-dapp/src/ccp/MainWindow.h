#include <QWidget>
#include "SmartContractManager.h"

class MainWindow : public QWidget {
    Q_OBJECT

public:
    MainWindow(QWidget *parent = 0);

private:
    SmartContractManager contractManager;
};
