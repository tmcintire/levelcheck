import { IParticipant, IEventLevels, ILevel } from './data/interfaces';
import _ from 'lodash';

/* Look through the registrations and find the unique levels and return it as a string array */
export const getLevelsFromRegistrations = (registrations: IParticipant[]): string[] => {
    const levelsOnly = _.map(registrations, (reg: IParticipant) => reg.originalLevel);
    const uniqueLevels = _.uniq(levelsOnly);

    return uniqueLevels;
};

/* Find the maximum current ID and return the next increment */
export const getNextId = (registrations: IParticipant[]): string => {
    let maxId = 0;
    const IDs = _.map(registrations, (reg: IParticipant) => reg.id);
    if (IDs) {
        maxId = parseInt(_.max(IDs), 10) || 0;
    }

    return (maxId + 1).toString();
};

export const sortlevels = (levels: IEventLevels): ILevel[] => {
    // Sort levels based on
    const levelsArray = Object.entries(levels).map(p => p[1]);
    const sortedLevels = levelsArray.sort((a, b) => a.order - b.order);

    return sortedLevels;
};
