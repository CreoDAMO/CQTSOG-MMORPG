#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "GameSessionManager.generated.h"

UCLASS()
class YOURGAME_API AGameSessionManager : public AActor
{
    GENERATED_BODY()

public:
    AGameSessionManager();

    UFUNCTION(BlueprintCallable, Category = "Session")
    void StartNewSession();

    UFUNCTION(BlueprintCallable, Category = "Session")
    void FindSessions();

    UFUNCTION(BlueprintCallable, Category = "Session")
    void JoinSession();

protected:
    virtual void BeginPlay() override;
};
