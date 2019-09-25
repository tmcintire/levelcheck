export interface IParticipant {
    name: string;
    originalLevel: string;
    finalLevel: string;
    id?: string;
    bib: string;
}

export interface IUser {
  name: string;
  role: string;
}

export interface IEvent {
  name: string;
  levels: string[];
  participants: IParticipant;
  eventId: string;
}

export interface IUserEvent {
  name: string;
  id: string;
}

export interface ILevel {
  name: string;
  levelCheck: boolean;
  id?: string;
}


