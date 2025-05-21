import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Dialog, DialogContent } from '../ui/Dialog';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-20 flex items-center justify-between px-8 transition-all duration-300 ease-in-out">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="search" 
          className="block w-80 p-2 pl-10 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 dark:text-gray-200"
          placeholder="Buscar pacientes, psicólogos..."
        />
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 mr-3"
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 mr-3 relative"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        
        <button
          onClick={() => setIsUserMenuOpen(true)}
          className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-all duration-200"
        >
          <img 
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg" 
            alt="Avatar do usuário" 
            className="h-8 w-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role === 'admin' ? 'Administrador' : user?.role}</p>
          </div>
        </button>
      </div>

      {/* User Menu Modal */}
      <Dialog open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center p-6">
            <img 
              src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg" 
              alt="Avatar do usuário"
              className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                // Navigate to settings
              }}
              className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">Configurações da Conta</span>
            </button>

            <button
              onClick={() => {
                logout();
                setIsUserMenuOpen(false);
              }}
              className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-red-600 dark:text-red-400"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sair</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Modal */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notificações</h2>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Nova consulta agendada</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Lembrete: Consulta em 1 hora</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Há 30 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;