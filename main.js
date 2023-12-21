import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersApp } from './src/users/users-app';
import './style.css'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

const principal = document.getElementsByTagName('main')[0];
UsersApp(principal);

