#include "GameSessionManager.h"
#include "OnlineSubsystem.h"
#include "OnlineSessionSettings.h"

AGameSessionManager::AGameSessionManager()
{
    PrimaryActorTick.bCanEverTick = true;
}

void AGameSessionManager::BeginPlay()
{
    Super::BeginPlay();
}

void AGameSessionManager::StartNewSession()
{
    IOnlineSubsystem* OnlineSubsystem = IOnlineSubsystem::Get();
    if (OnlineSubsystem)
    {
        IOnlineSessionPtr Sessions = OnlineSubsystem->GetSessionInterface();
        if (Sessions.IsValid())
        {
            FOnlineSessionSettings SessionSettings;
            SessionSettings.bIsLANMatch = true;
            SessionSettings.NumPublicConnections = 4;
            SessionSettings.bShouldAdvertise = true;
            Sessions->CreateSession(0, NAME_GameSession, SessionSettings);
        }
    }
}

void AGameSessionManager::FindSessions()
{
    IOnlineSubsystem* OnlineSubsystem = IOnlineSubsystem::Get();
    if (OnlineSubsystem)
    {
        IOnlineSessionPtr Sessions = OnlineSubsystem->GetSessionInterface();
        if (Sessions.IsValid())
        {
            FOnlineSessionSearchPtr SearchSettings = MakeShareable(new FOnlineSessionSearch());
            SearchSettings->bIsLanQuery = true;
            Sessions->FindSessions(0, SearchSettings.ToSharedRef());
        }
    }
}

void AGameSessionManager::JoinSession()
{
    IOnlineSubsystem* OnlineSubsystem = IOnlineSubsystem::Get();
    if (OnlineSubsystem)
    {
        IOnlineSessionPtr Sessions = OnlineSubsystem->GetSessionInterface();
        if (Sessions.IsValid())
        {
            FOnlineSessionSearchResult SearchResult;
            Sessions->JoinSession(0, NAME_GameSession, SearchResult);
        }
    }
}
