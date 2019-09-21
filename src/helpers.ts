import { IRegistration } from './data/interfaces';
import _ from 'lodash';

/* Look through the registrations and find the unique levels and return it as a string array */
export const getLevelsFromRegistrations = (registrations: IRegistration[]): string[] => {
    const levelsOnly = _.map(registrations, (reg: IRegistration) => reg.OriginalLevel);
    const uniqueLevels = _.uniq(levelsOnly);

    return uniqueLevels;
};

/* Find the maximum current ID and return the next increment */
export const getNextId = (registrations: IRegistration[]): string => {
    let maxId = '0';
    const IDs = _.map(registrations, (reg: IRegistration) => reg.ID);
    if (IDs) {
        maxId = _.max(IDs) || '0';
    }

    return (parseInt(maxId, 10) + 1).toString();
};
