'use client'

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    author: string;
    header: string;
    body: string;
    stakeholders: number[];
    issues: number[];
}

function MinutaForm() {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        header: '',
        body: '',
        stakeholders: [],
        issues: []
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, field: 'stakeholders' | 'issues') => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [field]: value.split(',').map(Number)
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/minutas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
                <label className=''>Autor</label>
                <input className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Destaque</label>
                <input className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    type="text"
                    name="header"
                    value={formData.header}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Corpo</label>
                <textarea rows={6} className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label>Stakeholders</label>
                <input className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    type="text"
                    name="stakeholders"
                    value={formData.stakeholders.join(',')}
                    onChange={(e) => handleArrayChange(e, 'stakeholders')}
                />
            </div>
            <div>
                <label>Issues</label>
                <input className='w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    type="text"
                    name="issues"
                    value={formData.issues.join(',')}
                    onChange={(e) => handleArrayChange(e, 'issues')}
                />
            </div>
            <button type="submit" className='text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-4 me-2 mb-2'>Submit</button>
        </form>
    );
};

export default MinutaForm;