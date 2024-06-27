#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MultiplayerGameManager.generated.h"

UCLASS()
class YOURGAME_API AMultiplayerGameManager : public AActor
{
    GENERATED_BODY()

public:
    AMultiplayerGameManager();

protected:
    virtual void BeginPlay() override;
};
