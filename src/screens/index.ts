import { ScreensMap } from '../types/Coordinator.d';

import { ProfileScreen } from './ProfileScreen/ProfileScreen';

import { PROFILE_SCREEN } from './constants';

export const Screens: ScreensMap = new Map();

Screens.set(PROFILE_SCREEN, ProfileScreen);
