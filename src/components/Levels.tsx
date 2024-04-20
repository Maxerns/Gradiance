// Levels.tsx
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModuleType } from '../services/types';
import { supabase } from '../services/supabaseConfig';
import ModuleDialog from './Dialog/ModuleDialog';

type LevelsProps = {
    userId: string;
    levelId: number;
};

function Levels({ levelId, userId }: LevelsProps) {
    const [modules, setModules] = useState<ModuleType[]>([]);


    // Fetch the modules for the specific level from supabase
    const fetchData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('module')
                .select('*')
                .eq('year_id', levelId);

            if (error) throw error;

            if (data) setModules(data);
        } catch (error) {
            console.error(error);
        }
    }, [levelId]);

    useEffect(() => {
        void fetchData();
    }, [fetchData, levelId]);

    return (
        <div>
            <div>
                {modules.map((module) => (
                    <Link key={module.id} to={`/dashboard/levels/${levelId}/modules/${module.id}`}>
                        <div className='text-xl text-neutral-content mt-2 p-2 border rounded-lg'>
                            {module.name}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                <ModuleDialog levelId={levelId} userId={userId} fetchData={fetchData} /> {/* Pass the level id directly */}
            </div>
        </div>
    );
}

export default Levels;