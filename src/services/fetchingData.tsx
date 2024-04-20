import { supabase } from './supabaseConfig';

import { UserData } from './types';

//fetch all the data for the user
export async function fetchUserData(userId: string) {
    if (!userId) {
        console.error('No user id provided');
        return;
    }
    //get all the years for the user
    const { data: year, error: yearsError } = await supabase
        .from('year')
        .select('*')
        .eq('user_id', userId);
    if (yearsError) {
        console.error(yearsError);
        return;
    }
    //get all the modules for the user
    const { data: modules, error: modulesError } = await supabase
        .from('module')
        .select('*')
        .eq('user_id', userId);
    if (modulesError) {
        console.error(modulesError);
        return;
    }
    //get all the assignments for the user
    const { data: assignments, error: assignmentsError } = await supabase
        .from('Assignment')
        .select('*')
        .eq('user_id', userId);
    if (assignmentsError) {
        console.error(assignmentsError);
        return;
    }
    return { year, modules, assignments } as UserData;
}