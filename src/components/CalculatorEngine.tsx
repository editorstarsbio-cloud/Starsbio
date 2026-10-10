'use client';

import { useState } from 'react';
import type { CalculatorDef } from '@/lib/calc/types';
import { defaultValues, runCalculator, visibleInputs, type RawValues } from '@/lib/calc/engine';

import { allCalculators } from '@/calculators';

export default function CalculatorEngine({ slug }: { slug: string }) {
  const def = allCalculators.find(c => c.slug === slug)!;
  const [raw, setRaw] = useState<RawValues>(defaultValues(def.inputs));

  const visible = visibleInputs(def.inputs, raw);
  const result = runCalculator(def, raw);

  const handleChange = (key: string, val: string) => {
    setRaw(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setRaw(defaultValues(def.inputs));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Input Section */}
        <div className="p-6 md:p-8 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
          <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
            <span>Inputs</span>
            <button 
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
            >
              Reset
            </button>
          </h2>
          <div className="space-y-5">
            {visible.map(input => (
              <div key={input.key}>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  {input.label}
                  {input.type === 'number' && input.optional && <span className="text-slate-400 font-normal ml-2">(Optional)</span>}
                </label>
                {input.help && <p className="text-xs text-slate-500 mb-2">{input.help}</p>}
                
                <div className="relative">
                  {input.type === 'select' ? (
                    <select
                      value={raw[input.key] ?? ''}
                      onChange={(e) => handleChange(input.key, e.target.value)}
                      className={`input-field ${result.ok === false && result.errors[input.key] ? 'ring-red-300 focus:ring-red-500' : ''}`}
                    >
                      <option disabled value="">Select...</option>
                      {input.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : input.type === 'list' || input.type === 'text' ? (
                    <textarea
                      rows={3}
                      value={raw[input.key] ?? ''}
                      onChange={(e) => handleChange(input.key, e.target.value)}
                      placeholder={input.type === 'list' ? "Enter numbers separated by commas..." : input.placeholder}
                      className={`input-field resize-y ${result.ok === false && result.errors[input.key] ? 'ring-red-300 focus:ring-red-500' : ''}`}
                    />
                  ) : (
                    <div className="flex items-center">
                      <input
                        type={input.type}
                        value={raw[input.key] ?? ''}
                        onChange={(e) => handleChange(input.key, e.target.value)}
                        className={`input-field ${'unit' in input && input.unit ? 'rounded-r-none border-r-0' : ''} ${result.ok === false && result.errors[input.key] ? 'ring-red-300 z-10 focus:ring-red-500' : ''}`}
                      />
                      {'unit' in input && input.unit && (
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-slate-300 bg-slate-100 text-slate-500 sm:text-sm h-9">
                          {input.unit}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {result.ok === false && result.errors[input.key] && (
                  <p className="mt-1 text-sm text-red-600">{result.errors[input.key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900">Results</h2>
          
          {result.ok ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                {result.output.results.map((res, i) => (
                  <div 
                    key={i} 
                    className={`flex justify-between items-end border-b border-slate-100 pb-2 ${res.primary ? 'mt-4 pt-4 border-t border-slate-200 border-b-0' : ''}`}
                  >
                    <span className={`text-slate-600 ${res.primary ? 'font-semibold text-slate-900' : 'text-sm'}`}>
                      {res.label}
                    </span>
                    <span className={`font-mono text-right ${res.primary ? 'text-2xl font-bold text-primary' : 'text-lg font-medium text-slate-900'}`}>
                      {res.money && '$'}
                      {typeof res.value === 'number' 
                        ? new Intl.NumberFormat('en-US', { 
                            minimumFractionDigits: res.decimals ?? (res.money ? 2 : 0), 
                            maximumFractionDigits: res.decimals ?? (res.money ? 2 : 4) 
                          }).format(res.value)
                        : res.value}
                      {res.unit && <span className="text-slate-500 ml-1 text-sm font-sans">{res.unit}</span>}
                    </span>
                  </div>
                ))}
              </div>
              
              {result.output.table && (
                <div className="mt-8 overflow-x-auto">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">{result.output.table.caption}</h3>
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead>
                      <tr>
                        {result.output.table.columns.map((col, i) => (
                          <th key={i} className="px-3 py-2 text-left font-semibold text-slate-700 bg-slate-50">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {result.output.table.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-3 py-2 whitespace-nowrap text-slate-600 ${typeof cell === 'number' ? 'font-mono' : ''}`}>
                              {typeof cell === 'number' ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(cell) : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {result.output.notes && result.output.notes.length > 0 && (
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Notes</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                    {result.output.notes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 animate-in fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Calculation Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{result.message}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
