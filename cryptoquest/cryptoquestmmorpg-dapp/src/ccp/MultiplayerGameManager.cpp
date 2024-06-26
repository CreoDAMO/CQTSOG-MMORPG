#include "MultiplayerGameManager.h"

AMultiplayerGameManager::AMultiplayerGameManager()
{
    PrimaryActorTick.bCanEverTick = true;
}

void AMultiplayerGameManager::BeginPlay()
{
    Super::BeginPlay();
}
