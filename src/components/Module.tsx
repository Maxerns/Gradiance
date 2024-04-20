// Module.tsx
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseConfig';
import { ModuleType, Assignment } from '../services/types';
import HomeNav from './HomeNav';
import AssignmentDialog from './Dialog/AssignmentDialog';
import { User } from '@supabase/supabase-js';

function Module() {
  const { moduleId = '' } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [moduleData, setModuleData] = useState<ModuleType | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);


  const fetchModuleData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data, error } = await supabase
        .from('module')
        .select('*')
        .eq('id', moduleId);

      if (error) {
        console.error('Error fetching module data:', error);
      } else {
        setModuleData(data[0] as ModuleType);
      }
    }
  }, [moduleId]);

  //fetch module assignment data
  const fetchModuleAssignmentData = useCallback(async () => {
    const { data, error } = await supabase
      .from('Assignment')
      .select('*')
      .eq('module_id', moduleId);

    if (error) {
      console.error('Error fetching module assignment data:', error);
    } else {
      setAssignments(data || []);
    }
  }, [moduleId]);

  useEffect(() => {
    void fetchModuleData();
    void fetchModuleAssignmentData();
  }, [fetchModuleAssignmentData, fetchModuleData, moduleId]);

  // //filtter assignment by type
  // const filterAssignmentsByType = (type: string) => {
  //     return assignments.filter((assignment) => assignment.type === type);
  // };


  if (!moduleData) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className='flex-1 max-h-full justify-center max-w-7xl flex-col mx-auto overflow-hidden overflow-y-scroll'>
      <HomeNav />
      <div className='content-container flex items-center justify-left  py-2 px-6 md:px-10'>
        <h3 className='text-2xl font-bold'>Overview</h3>
      </div>
      <div className='flex justify-evenly mx-8 md:mx-16 p-2 bg-neutral text-neutral-content rounded-md'>
        <h1 className='text-xl'>{moduleData.name}</h1>
        <h2 className='text-xl'>{moduleData.credit}</h2>
      </div>

      {/* <div>
        <h3>Exams</h3>
        <div>
          {filterAssignmentsByType('test').map((assignment: Assignment, index: number) => (
            <div key={index}>
              <h3>{assignment.name}</h3>
              <p>Weight: {assignment.weight}</p>
              <p>Grade: {assignment.grade}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className='mt-5 px-6 md:px-10'>
        <div className='flex justify-between mr-6 md:mr-10'>
          <h3 className='text-2xl font-bold'>Assignments</h3>
          <AssignmentDialog moduleId={moduleId} userId={user?.id.toString() || ''} onNewAssignment={fetchModuleAssignmentData} />
        </div>
        <div className='grid md:grid-cols-3 gap-4 md:px-14 text-neutral-content pt-2'>
          {assignments.map((assignment: Assignment, index: number) => (
            <div key={index} className='bg-neutral p-4 rounded-lg'>
              <h3>{assignment.name}</h3>
              <p>Type: {assignment.type}</p>
              <p>Weight: {assignment.weight}</p>
              <p>Grade: {assignment.grade}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Module;