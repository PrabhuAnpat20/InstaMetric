"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Youtube, Github } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md w-full bg-neutral-950">
      <div className="w-full md:px-4 px-2">
        <div className="flex justify-between items-center md:p-1">
          <div className="flex items-center mt-2">
            <Link href="/" className="">
              <img src="/logo.png" alt="" className="md:w-80 w-44" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:justify-end md:flex-1">
            <div className="flex items-center space-x-6 mr-7">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-300 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=2HeHlF4QlvY"
                className="flex items-center space-x-1 text-gray-300 hover:scale-105  px-3 py-2 rounded-md"
              >
                <Youtube size={20} className="text-red-600" />
                <span className="text-sm font-medium">YouTube</span>
              </Link>

              <Link
                href="https://github.com/PrabhuAnpat20/InstaMetric"
                className="flex items-center space-x-1 text-gray-300 hover:scale-105 px-3 py-2 rounded-md"
              >
                <Github size={20} className="text-white" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-gray-300 hover:bg-gray-300 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/youtube"
              className="flex items-center space-x-2 text-gray-300 hover:bg-gray-300 hover:text-black px-3 py-2 rounded-md text-base font-medium"
            >
              <Youtube size={20} className="text-red-600" />
              <span>YouTube</span>
            </Link>
            <Link
              href="/github"
              className="flex items-center space-x-2 text-gray-300 hover:bg-gray-300 hover:text-black px-3 py-2 rounded-md text-base font-medium"
            >
              <Github size={20} className="text-white" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
