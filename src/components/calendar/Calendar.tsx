import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Appointment, Patient, Psychologist } from '../../types';
import AppointmentCard from './AppointmentCard';
import Button from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/Dialog';

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
  const [activeView, setActiveView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedAppointment, setSelectedAppointment] = useState<{
    appointment: Appointment;
    patient: Patient;
    psychologist: Psychologist;
  } | null>(null);

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
  const getDayAppointments = (date: Date): Appointment[] => {
    return appointments.filter(app => app.date === formatDate(date));
  };

  // Get appointments for the current month
  const getMonthAppointments = (): Appointment[] => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return appointments.filter(app => {
      const appDate = parseISO(app.date);
      return appDate >= start && appDate <= end;
    });
  };

  // Navigate to previous period
  const goToPrevious = () => {
    if (activeView === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - (activeView === 'week' ? 7 : 1));
      setCurrentDate(newDate);
    }
  };

  // Navigate to next period
  const goToNext = () => {
    if (activeView === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + (activeView === 'week' ? 7 : 1));
      setCurrentDate(newDate);
    }
  };

  // Handle new appointment
  const handleNewAppointment = () => {
    console.log('New appointment clicked');
    // Add your new appointment logic here
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment({
      appointment,
      patient: getPatient(appointment.patientId),
      psychologist: getPsychologist(appointment.psychologistId)
    });
  };

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    // Here you would typically update the appointment in your backend
    console.log('Updating appointment:', updatedAppointment);
    // For now, we'll just close the modal
    setSelectedAppointment(null);
  };

  // Render month view
  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayAppointments = getDayAppointments(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={index}
              className={`
                min-h-[100px] p-2 border border-gray-200 dark:border-gray-800 rounded-lg
                ${isCurrentMonth ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}
                ${isToday ? 'ring-2 ring-teal-500 dark:ring-teal-400' : ''}
              `}
            >
              <div className="text-right">
                <span className={`text-sm ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  {format(day, 'd')}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {dayAppointments.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleAppointmentClick(app)}
                    className="text-xs p-1 rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 cursor-pointer truncate"
                  >
                    {app.startTime} - {getPatient(app.patientId).name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Format the current date in a user-friendly way
  const formattedCurrentDate = format(
    currentDate,
    activeView === 'month' ? 'MMMM yyyy' : 'EEEE, d MMMM yyyy',
    { locale: ptBR }
  );

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              {formattedCurrentDate}
            </h2>
            
            <button 
              onClick={goToNext}
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
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeView === 'month' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setActiveView('month')}
            >
              Mês
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
      
      {activeView === 'month' ? (
        renderMonthView()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {getDayAppointments(currentDate).length > 0 ? (
            getDayAppointments(currentDate).map(appointment => (
              <AppointmentCard 
                key={appointment.id}
                appointment={appointment}
                patient={getPatient(appointment.patientId)}
                psychologist={getPsychologist(appointment.psychologistId)}
                onClick={() => handleAppointmentClick(appointment)}
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
      )}

      {selectedAppointment && (
        <AppointmentDetailsModal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          appointment={selectedAppointment.appointment}
          patient={selectedAppointment.patient}
          psychologist={selectedAppointment.psychologist}
          onUpdate={handleAppointmentUpdate}
        />
      )}
    </div>
  );
};

export default Calendar;