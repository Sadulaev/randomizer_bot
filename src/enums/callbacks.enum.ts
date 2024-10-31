export enum AdminCallbacks {
    CreateEvent = 'admin_create-event',
    GetAllEvents = 'admin_get-all-events',
    DeleteEvent = 'admin_delete-event',
    GetEventWinners = 'admin_get-event-winners',
    FinishAndSend = 'admin_finish-and-send-event',
    FinishAndSave = 'admin_finish-and-save-event',
}

export enum UserCallbacks {
    JoinEvent = 'user_join-event',
}