export enum RequestStatus {
    Initial, // Page starting up, not fired action to make request yet
    Requested, // Action fired, network request made but expected imminently
    InProgress, // Request in progress, waiting to hear from server
    Success, // Request succeeded
    Failure // Request failed
}