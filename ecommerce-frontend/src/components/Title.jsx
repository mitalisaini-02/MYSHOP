// Title.jsx
import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <h2 className="uppercase font-bold flex items-center justify-center gap-2 text-slate-700 mb-6">
      {text1} <span className="text-slate-900">    {text2}</span>
      <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
    </h2>
  );
};

export default Title;
