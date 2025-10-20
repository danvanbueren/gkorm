/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

import {Alert, AlertTitle, Box, Typography} from "@mui/material"
import {createContext, useContext, useState} from "react"

const AlertContext = createContext()

export default function AlertProvider({children}) {
    const [alerts, setAlerts] = useState([])

    class AlertData {
        constructor() {
            this._uid = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
            this._title = null
            this._content = null
            this._icon = null
            this._variant = null
            this._severity = null
            this._color = null
            this._onClose = () => {
                AlertData.remove(this._uid)
            }
            this._action = null
            this._timeout = null
        }

        static remove(uid) {
            setAlerts(prev => prev.filter(a => a._uid !== uid))
        }

        title(value) {
            this._title = value
            return this
        }

        content(value) {
            this._content = value
            return this
        }

        icon(value) {
            this._icon = value
            return this
        }

        variant(value) {
            this._variant = value
            return this
        }

        severity(value) {
            this._severity = value
            return this
        }

        color(value) {
            this._color = value
            return this
        }

        onClose(value) {
            this._onClose = value
            return this
        }

        action(value) {
            this._action = value
            return this
        }

        timeout(value) {
            this._timeout = value
            return this
        }

        add() {
            setAlerts(prev => [...prev, this])
            return this
        }

        getUid() {
            return this._uid
        }

        getRemovalFunction() {
            return () => AlertData.remove(this._uid)
        }

        toJsxComponent() {
            if (this._timeout != null) {
                window.setTimeout(() => AlertData.remove(this._uid), this._timeout)
            }
            return (
                <Alert
                    icon={this._icon ?? undefined}
                    variant={this._variant ?? undefined}
                    severity={this._severity ?? undefined}
                    color={this._color ?? undefined}
                    onClose={this._onClose ?? undefined}
                    action={this._action ?? undefined}
                >
                    {this._title && <AlertTitle>{this._title}</AlertTitle>}
                    <Box display='block'>
                        <Typography>{this._content}</Typography>

                        <Typography
                            component="code"
                            variant="body2"
                            sx={{
                                fontFamily: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                fontSize: '0.5rem',
                                px: 0.5,
                                py: 0.25,
                                borderRadius: 0.5,
                                bgcolor: 'action.hover',
                                color: 'text.primary.contrastText',
                                whiteSpace: 'nowrap',
                            }}

                        >
                            UID//{this._uid}
                        </Typography>
                    </Box>
                </Alert>
            )
        }
    }

    /*
    * Add an alert - Example Usage
    *
    * First, get the context:
    * const { AlertData } = useAlert()
    *
    * Then, call a function like the example below:
    */
    const exampleAlert = () => {
        const alertUid = new AlertData()
            .title('New Alert!')
            .content('This is an alert!')
            .timeout(5000)
            .variant('filled')
            .add() // Adds to `alerts` array
            .getUid() // Returns UID for future removal
    }

    return (
        <AlertContext.Provider value={{AlertData}}>
            <Box position='relative'>
                <Box
                    position='absolute'
                    left='0'
                    top='0'
                    width='100%'
                    height='95vh'
                    display='flex'
                    flexDirection='column'
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                >
                    <Box width='100%' minWidth='25rem' maxWidth='40rem' p={2} gap={2}>

                        <Box display="flex" flexDirection="column" gap={2} mt={2}>
                            {alerts.map(a => (
                                <Box key={a._uid} sx={{zIndex: 1400}}>
                                    {a.toJsxComponent()}
                                </Box>
                            ))}
                        </Box>

                    </Box>
                </Box>
            </Box>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    const context = useContext(AlertContext)
    if (!context) throw new Error('useAlert must be used inside AlertProvider')
    return context
}