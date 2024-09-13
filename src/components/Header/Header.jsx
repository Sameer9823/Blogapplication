import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import classNames from 'classnames';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className='py-3 shadow bg-gray-900 text-white'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <div className='md:hidden'>
            <button
              onClick={toggleSidebar}
              className='text-xl'
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ul
            className={classNames(
              'flex space-x-4 md:space-x-6',
              { 'hidden md:flex': !isSidebarOpen }
            )}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        {isSidebarOpen && (
          <div className='fixed inset-0 z-50 bg-gray-800 bg-opacity-75 md:hidden'>
            <div className='flex flex-col w-64 h-full bg-gray-900 text-white'>
              <button
                onClick={toggleSidebar}
                className='text-3xl self-end p-4'
              >
                <FaTimes />
              </button>
              <div className='flex flex-col p-4'>
                {navItems.map(
                  (item) =>
                    item.active && (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.slug);
                          setIsSidebarOpen(false);
                        }}
                        className='my-2 text-white'
                      >
                        {item.name}
                      </button>
                    )
                )}
                {authStatus && (
                  <button
                    onClick={() => {
                      // Handle logout
                      setIsSidebarOpen(false);
                    }}
                    className='my-2 text-white'
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
