import React, { createContext, useContext, Dispatch } from 'react';

export interface IErrorModalContextType{
    showError: boolean,
    setShowError: (value: boolean) => void
}

const initContext: IErrorModalContextType = {
    showError: false,
    setShowError: value => console.error("No value provider")
};

export const ErrorModalContext = createContext<IErrorModalContextType>(initContext);
export const useErrorModal = () => useContext(ErrorModalContext);