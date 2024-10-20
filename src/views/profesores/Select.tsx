import React, { useState } from 'react';

const SelectLanguage = ({ onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const languages = ['Python', 'Javascript', 'Ruby'];

  const handleLanguageSelect = (language) => {
    onSelect(language); // Llama a la función onSelect pasada por props
    setIsOpen(false);
  };

  return (
    <div className="flex-auto flex flex-col items-center pl-4 md:pl-16 lg:pl-52 pr-6">
      <div className="relative w-full min-w-[200px]">
        <input
          value={value}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 cursor-pointer"
          placeholder=" "
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:text-teal-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Selecciona un Lenguaje
        </label>
      </div>
      {isOpen && (
        <div className="absolute shadow top-full mt-[10px] z-40 w-full left-0 rounded max-h-40 overflow-y-auto">
          <div className="flex flex-col w-full">
            {languages.map((language, index) => (
              <div
                key={index}
                className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                onClick={() => handleLanguageSelect(language)}
              >
                <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                  <div className="w-full items-center flex">
                    <div className="mx-2 leading-6">{language}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectLanguage;
