import { lazy } from 'react';

const Registration = lazy(() => import('./Registration'));
const Employees = lazy(() => import('./Employees'));
const Departments = lazy(() => import('./Departments'));
const ManageCompany = lazy(() => import('./ManageCompany'));
const ProfileCompany = lazy(() => import('./ProfileCompany'));
const TurnOver = lazy(() => import('./TurnOver'));
const Rehire = lazy(() => import('./Rehire'));
const TransferKnowledge = lazy(() => import('./TransferKnowledge'));
const FireEmployee = lazy(() => import('./FireEmployee'));

export { Registration, Employees, Departments, ManageCompany, ProfileCompany, TurnOver, Rehire, TransferKnowledge, FireEmployee};
