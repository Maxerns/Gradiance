// ModuleDialog.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { supabase } from "../../services/supabaseConfig";

interface LevelDialogProps {
  userId: string;
  fetchData: () => Promise<void>;
}

export default function LevelDialog({ userId, fetchData }: LevelDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [levelWeight, setLevelWeight] = useState("");
  const [levelName, setLevelName] = useState("");

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const addLevel = async (): Promise<null> => {
    try {
      const { data, error } = await supabase
        .from("year")
        .insert([{ user_id: userId, name: levelName, weight: levelWeight }]);

      if (error) {
        console.error("Error inserting module: ", error);
        return null;
      }
      closeDialog();
      await fetchData();

      return data;
    } catch (error) {
      console.error("Unexpected error: ", error);
      return null;
    }
  };

  const handleAddLevel = () => {
    void addLevel();
  };

  return (
    <>
      <button onClick={openDialog}>Add Level</button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDialog}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-base-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <Dialog.Title
                  as="h3"
                  className="text-2xl leading-6 font-bold p-6"
                >
                  Add Level
                </Dialog.Title>
                <div className="px-6 py-4">
                  <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input
                      type="text"
                      value={levelName}
                      onChange={(e) => setLevelName(e.target.value)}
                      className="grow"
                      placeholder="e.g. Year 1"
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 mt-4">
                    Weight (%)
                    <input
                      type="text"
                      value={levelWeight}
                      onChange={(e) => setLevelWeight(e.target.value)}
                      className="grow"
                      placeholder="e.g. 20"
                    />
                  </label>
                </div>
                <div className="px-6 py-4 bg-base-300 flex justify-end">
                  <button
                    onClick={handleAddLevel}
                    className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-3"
                  >
                    Add
                  </button>
                  <button
                    onClick={closeDialog}
                    className="px-4 py-2 text-sm font-medium  bg-neutral rounded-md hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
