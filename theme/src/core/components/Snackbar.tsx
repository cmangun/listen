/**
 * @name Snackbar
 * @file Snackbar.tsx
 * @description notistack snackbar component
 */

// Modules
import React from 'react'
import { SnackbarProvider } from 'notistack'

interface SnackbarProps {
  children: React.ReactNode
}

const Snackbar: React.FC<SnackbarProps> = ({ children }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      className='snackbar'
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  )
}

Snackbar.displayName = 'Snackbar'
export default Snackbar
