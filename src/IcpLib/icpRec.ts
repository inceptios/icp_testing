let SystemPort: MessagePort | null = null

export type menuItem = {
    menuId: string,
    title: string,
    icon?: string,
    monoIcon?: string,
    enabled: boolean,
    items?: menuItem[],
}

export const Init = (shellUrl: string) => {

   try {window.parent.postMessage("FRAME_HELLO",shellUrl)
    
    addEventListener("message", handleMessage)}
    catch(e){
        console.error("Error in initing the Channel")
    }
}

export const Distroy = () => {
    removeEventListener("message",handleMessage)
}

let MenuActions: Record<string, ()=>void>= {}

const handleMessage = (event: MessageEvent) => {
    console.log("Message recevied", {
        from: event.origin,
        message: event.data,
        port: event.ports
    })
    if (event.data === "SHELL_HELLO") {
        removeEventListener("message", handleMessage)
        event.ports[0].postMessage("FRAME_PORT_HI")
        SystemPort=event.ports[0]
        SystemPort.onmessage = ListentPortMessage
    }
}

const ListentPortMessage = (event: MessageEvent) => {
    console.log("Shell message from port",{ 
        message:event.data,
    })
    const ICPID = event.data.fun as keyof IPCPayloadMap
    ICPSystemMap[ICPID]?.(event.data.payload)
}

export const SendMessageToShell = (Message:string) =>{
    if(SystemPort){
        SystemPort.postMessage(Message)
    }
    
}

interface IPCPayloadMap {
    CONTEXT_MENU_PRESS_ID: {
        id:string
    },
    // OS_SET_WINDOW_TITLE: {
    //     title: string;
    // };
}

type IPCFunctionsRegistry = {
    [K in keyof IPCPayloadMap]: (payload: IPCPayloadMap[K]) => void;
};

const ICPSystemMap:IPCFunctionsRegistry = {
    CONTEXT_MENU_PRESS_ID: ({id})=>{
        MenuActions[id]?.()
    }
}

export const OpenContextMenu = (coordinates: {x:number, y:number,},menuItems:menuItem[],menuFunctions: Record<string, ()=>void>)=>{
    if(SystemPort){
        MenuActions= menuFunctions
        SystemPort.postMessage({
            fun:"OPEN_CONTEXT_MENU",
            payload: {
                coordinates,
                menuItems
            }
        })
    }
}