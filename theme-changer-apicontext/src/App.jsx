import { useEffect, useState } from 'react'
import './App.css'
import ThemeBtn from './components/ThemeButton'
import Card from './components/Card'
import { ThemeProvider } from './context/theme'
function App() {
  const [theme,setTheme] = useState('light');
  const lightTheme = () => {
    setTheme('light');
  }
  const darkTheme = () => {
    setTheme('dark');
  }

  // actual change in theme
  useEffect(()=>{
    document.querySelector('html').classList.remove('light','dark');
    document.querySelector('html').classList.add(theme);
  },[theme])


  return (
    <ThemeProvider value={{theme,darkTheme,lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App