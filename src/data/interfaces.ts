export interface IParticipant {
  name: string
  originalLevel: string
  finalLevel: string
  id?: string
  bib: number
  role: string
  levelChecked?: boolean
  confirmed?: boolean
}

export interface IUser {
  name: string
  role: string
  levelCheckTutorial: boolean
  adminTutorial: boolean
  events: IUserEvents
  id: string
}

export interface IEvent {
  name: string
  levels: IEventLevels
  participants: IParticipant
  eventId: string
  newEvent: boolean
  config: IConfig
}

export interface IUserEvents {
  [id: string]: boolean
}

export interface IEventLevels {
  [id: string]: ILevel
}

export interface ILevel {
  name: string
  levelCheck: boolean
  order: number
}
export interface TVP {
  text: string
  value: string
}

export interface IConfig {
  [property: string]: any
}

export interface IChanges {
  field: any
  id: any
  oldValue: any
  showChange?: boolean
}

export interface IApplicationState {
  registrations: IParticipant[]
  levels: string[]
  user: IUser
  event: IEvent
  userEvents: TVP[]
  selectedEvent: IEvent
  levelCheckLevel: ILevel
  levelCheckRole: string
  undoChangeState: IChanges[]
}
