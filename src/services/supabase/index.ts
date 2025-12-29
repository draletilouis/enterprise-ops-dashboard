export { supabase } from './client';
export { authService } from './auth';
export { profilesService } from './profiles';
export { dataRecordsService } from './dataRecords';
export type { SignUpData, SignInData } from './auth';
export type { ProfileFilters } from './profiles';
export type { DataFilters, AggregatedData } from './dataRecords';
export type {
  Database,
  Profile,
  ProfileInsert,
  ProfileUpdate,
  DataRecord,
  DataRecordInsert,
  DataRecordUpdate,
} from './types';