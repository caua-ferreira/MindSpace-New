import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Appointment, Patient, Psychologist } from '../../types';
import AppointmentCard from './AppointmentCard';
import Button from '../ui/Button';

interface CalendarProps {
  appointments: Appointment[];
  patients: Patient[];
  psychologists: Psychologist[];
}

const Calendar: React.FC<CalendarProps> = ({
  appointments,
  patients,
  psychologists
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState<'day' | 'week'>('day');

  // Function to get patient by ID
  const getPatient = (id: string): Patient => {
    return patients.find(patient => patient.id === id) as Patient;
  };

  // Function to get psychologist by ID
  const getPsychologist = (id: string): Psychologist => {
    return psychologists.find(psych => psych.id === id) as Psychologist;
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Get appointments for the current day
  const getDayAppointments = (): Appointment[] => {
    return appointments.filter(app => app.date === formatDate(currentDate));
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Handle new appointment
  const handleNewAppointment = () => {
    console.log('New appointment clicked');
    // Add your new appointment logic here
  };

  // Format the current date in a user-friendly way
  const formattedCurrentDate = currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={goToPreviousDay} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              {formattedCurrentDate}
            </h2>
            
            <button 
              onClick={goToNextDay} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeView === 'day' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setActiveView('day')}
            >
              Dia
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeView === 'week' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setActiveView('week')}
            >
              Semana
            </button>
          </div>
          
          <Button 
            icon={<Plus size={16} />}
            size="sm"
            onClick={handleNewAppointment}
          >
            Nova Consulta
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {getDayAppointments().length > 0 ? (
          getDayAppointments().map(appointment => (
            <AppointmentCard 
              key={appointment.id}
              appointment={appointment}
              patient={getPatient(appointment.patientId)}
              psychologist={getPsychologist(appointment.psychologistId)}
              onClick={() => console.log('Appointment clicked:', appointment)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Nenhuma consulta agendada</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Não há consultas para este dia.</p>
            <Button 
              icon={<Plus size={16} />}
              size="sm"
              onClick={handleNewAppointment}
            >
              Agendar Consulta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;