import React from 'react'
import Logo from '../Logo'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

function Footer() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <a href="#">
              <div className="inline-flex items-center">
               
                <span className="ml-4 text-lg font-bold">
                    <Logo/>
                </span>
              </div>
            </a>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5">
                <a className="font-medium text-gray-300 hover:text-gray-400" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-300 hover:text-gray-400" href="#">
                  Terms of Service
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-300 hover:text-gray-400" href="#">
                  Return Policy
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-300 hover:text-gray-400" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap gap-4">
              <a  href="https://github.com/Sameer9823">
                <div className='text-2xl'>

              <FaGithub />
                </div>
              </a>
              <a  href="https://www.linkedin.com/in/sameer-selokar-60435224b/">
              <div className='text-2xl'>
              <FaLinkedin />
              </div>
              </a>
              <a href="https://portfolio-sameer-selokar-67.vercel.app/">
              <div className='text-2xl'>
              <CgWebsite />
              
              </div>
              </a>
            </div>

          </div>
        </div>
      </div>
      
      <div className="text-center mt-[3rem] lg:mt-3">
      © Sameer Selokar 2024
      All Rights Reserved.
      </div>
    </section>
  )
}

export default Footer
