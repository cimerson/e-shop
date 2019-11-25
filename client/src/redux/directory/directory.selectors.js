import { createSelector } from 'reselect';

const selecDirectory = state => state.directory;

export const selecDirectorySection = createSelector(
    [selecDirectory],
    directory => directory.sections
)