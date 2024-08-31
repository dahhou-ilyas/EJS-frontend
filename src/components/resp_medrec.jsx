
"use client"

import { JSX, SetStateAction, SVGProps, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Resp_medrec() {
  const [language, setLanguage] = useState("fr")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeButton, setActiveButton] = useState("")
  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr")
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  const handleButtonClick = (button) => {
    setActiveButton(button)
  }
  return (
    <div className={`flex flex-col min-h-screen bg-[#e6f2f2] ${isDarkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-[#acb2ef] dark:bg-[#0e0f11]">
        <Link href="#" prefetch={false}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HomeIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Dashboard</span>
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-2xl font-bold text-primary dark:text-primary-foreground">
            {language === "fr" ? "Mon Dossier Médical" : "ملفي الطبي"}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              activeButton === "profile"
                ? "bg-muted dark:bg-muted-foreground/20 hover:bg-muted/50 dark:hover:bg-muted-foreground/30"
                : ""
            }`}
            onClick={() => handleButtonClick("profile")}
          >
            <UserIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              activeButton === "logout"
                ? "bg-muted dark:bg-muted-foreground/20 hover:bg-muted/50 dark:hover:bg-muted-foreground/30"
                : ""
            }`}
            onClick={() => handleButtonClick("logout")}
          >
            <LogOutIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Logout</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              activeButton === "language"
                ? "bg-muted dark:bg-muted-foreground/20 hover:bg-muted/50 dark:hover:bg-muted-foreground/30"
                : ""
            }`}
            onClick={() => {
              handleButtonClick("language")
              toggleLanguage()
            }}
          >
            <GlobeIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Language</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              activeButton === "darkmode"
                ? "bg-muted dark:bg-muted-foreground/20 hover:bg-muted/50 dark:hover:bg-muted-foreground/30"
                : ""
            }`}
            onClick={() => {
              handleButtonClick("darkmode")
              toggleDarkMode()
            }}
          >
            <SunMoonIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 border-t border-muted-foreground/20 dark:border-muted-foreground/40">
        <main className="flex-1 p-8 bg-[#e6f2f2] dark:bg-[#1a1b1e] dark:text-primary-foreground">
          <div className="flex flex-col items-center space-y-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-center text-primary dark:text-primary-foreground">
              <p className="font-bold">BERRADA</p>
              <p>
                {language === "fr"
                  ? "ID : A123456"
                  : "\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641: A123456"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 justify-center">
          <Link href="/profile">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors ">
                <UserIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr" ? "Mon profil" : "\u0645\u0644\u0641\u064A \u0627\u0644\u0634\u062E\u0635\u064A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "1 r\u00E9sultat" : "1 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Allergies">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <WormIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr"
                    ? "Allergies et intol\u00E9rances"
                    : "\u0627\u0644\u062D\u0633\u0627\u0633\u064A\u0627\u062A \u0648\u0627\u0644\u062D\u0633\u0627\u0633\u064A\u0629"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "5 r\u00E9sultats" : "5 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Historique">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <CalendarIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr"
                    ? "Historique m\u00E9dical"
                    : "\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0637\u0628\u064A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "20 r\u00E9sultats" : "20 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Prescriptions">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <PillIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr"
                    ? "Prescriptions m\u00E9dicales"
                    : "\u0627\u0644\u0648\u0635\u0641\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "8 r\u00E9sultats" : "8 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Tests">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <BrainIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr"
                    ? "Tests psychologiques"
                    : "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0646\u0641\u0633\u064A\u0629"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "3 r\u00E9sultats" : "3 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Prise_en_charge">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <CarIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr"
                    ? "Prise en charge"
                    : "\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "15 r\u00E9sultats" : "15 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Analyses">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <ScanIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr"
                    ? "Analyses m\u00E9dicales"
                    : "\u0627\u0644\u062A\u062D\u0627\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A\u0629"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "10 r\u00E9sultats" : "10 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
            <Link href="/Correspondances">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background dark:bg-[#2a2b2e] shadow-md hover:bg-muted/50 dark:hover:bg-muted-foreground/30 transition-colors">
                <MailIcon className="w-8 h-8 text-primary dark:text-primary-foreground" />
                <p className="font-bold text-primary dark:text-primary-foreground">
                  {language === "fr" ? "Correspondance" : "\u0627\u0644\u0645\u0631\u0627\u0633\u0644\u0627\u062A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "fr" ? "7 r\u00E9sultats" : "7 \u0627\u0644\u0646\u062A\u0627\u0626\u062C"}
                </p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

function BrainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}


function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function PillIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
}


function ScanIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}


function SunMoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function WormIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 12-1.5 3" />
      <path d="M19.63 18.81 22 20" />
      <path d="M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
