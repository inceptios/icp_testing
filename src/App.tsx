import { useEffect, useState } from 'react'
import './App.css'
import { Button } from 'web-inception-sdk/ui'
import { Distroy, Init, OpenContextMenu, SendMessageToShell, type menuItem } from './IcpLib/icpRec'

function App() {
  const shellUrl = import.meta.env.VITE_SHELL_ENDPOINT
  const [int,setInt] = useState<number>(0)

  const consoleButton = () => {
    SendMessageToShell("Hello there from the frame.")
  }

  const menuItems: menuItem[] = [
    
    {
      menuId: 'testing',
      title: "Testing Context ipc",
      enabled: true,
    }

  ]

  const menuFunctions: Record<string, ()=>void> = {
    testing: ()=>{
      console.log("Testinng passed")
      setInt(int+1)
    }
  }

  useEffect(() => {
    Init(shellUrl)

    return () => {
      console.log("Removing listner...")
      Distroy()
    }
  }, [])
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        OpenContextMenu(
          { x: e.clientX, y: e.clientY },
          menuItems,
          menuFunctions
        )
      }}
    >
      Main app
      <button onClick={consoleButton}>
        console output
      </button>
      <Button>
        Some thing
      </Button>
      {int}
    </div>
  )
}

export default App
