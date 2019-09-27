export interface IParticipant {
    name: string;
    originalLevel: string;
    finalLevel: string;
    id?: string;
    bib: number;
    role: string;
}

export interface IUser {
  name: string;
  role: string;
  levelCheckTutorial: boolean;
  adminTutorial: boolean;
  events: string[];
  id: string;
}

export interface IEvent {
  name: string;
  levels: IEventLevels;
  participants: IParticipant;
  eventId: string;
}

export interface IUserEvents {
  [id: string]: IUserEvent;
}

export interface IUserEvent {
  name: string;
  id?: string;
}

export interface IEventLevels {
  [id: string]: ILevel;
}

export interface ILevel {
  name: string;
  levelCheck: boolean;
  order: number;
}
export interface TVP {
  text: string;
  value: string;
}

export interface IApplicationState {
  registrations: IParticipant[];
  levels: string[];
  user: IUser;
  event: IEvent;
  userEvents: TVP[];
  selectedEvent: IEvent;
  levelCheckLevel: string;
}

