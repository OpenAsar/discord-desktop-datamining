import type {Updater} from '../../common/updater';

export interface FirstRun {
  performFirstRunTasks(updater: Updater | null): void;
}
