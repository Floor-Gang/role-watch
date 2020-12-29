import { BitFieldResolvable, PermissionString } from 'discord.js';
import Config from './config/config';

export const CONFIG = Config.getConfig();

export const rolePerms: BitFieldResolvable<PermissionString>[] = ['MANAGE_ROLES'];
