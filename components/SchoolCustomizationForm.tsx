'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { School } from '@prisma/client';
import { updateSchool } from '@/actions/schoolActions';
import ColorPicker from '@/components/ColorPicker';

interface SchoolCustomizationFormProps {
  school: School;
}

export default function SchoolCustomizationForm({ school }: SchoolCustomizationFormProps) {
  const [formData, setFormData] = useState({
    primaryColor: school.primaryColor || '#000000',
    secondaryColor: school.secondaryColor || '#ffffff',
    tertiaryColor: school.tertiaryColor || '#cccccc',
    motto: school.motto || '',
    vision: school.vision || '',
    mission: school.mission || '',
    logo: school.logo || '',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: color }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await updateSchool(school.id, formData);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold">Primary Color</label>
          <ColorPicker
            color={formData.primaryColor}
            onChange={(color) => handleColorChange(color, 'primaryColor')}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Secondary Color</label>
          <ColorPicker
            color={formData.secondaryColor}
            onChange={(color) => handleColorChange(color, 'secondaryColor')}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Tertiary Color</label>
          <ColorPicker
            color={formData.tertiaryColor}
            onChange={(color) => handleColorChange(color, 'tertiaryColor')}
          />
        </div>
        <div>
          <label htmlFor="motto" className="block mb-2 font-semibold">
            Motto
          </label>
          <input
            type="text"
            id="motto"
            name="motto"
            value={formData.motto}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="vision" className="block mb-2 font-semibold">
            Vision
          </label>
          <textarea
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="mission" className="block mb-2 font-semibold">
            Mission
          </label>
          <textarea
            id="mission"
            name="mission"
            value={formData.mission}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="logo" className="block mb-2 font-semibold">
            Logo URL
          </label>
          <input
            type="url"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-6"
      >
        Save Customizations
      </button>
    </form>
  );
}