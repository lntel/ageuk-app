import { createContext, FC, useEffect, useReducer } from "react";
import authReducer, { AuthAction, AuthState } from "../reducer/AuthReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthContext {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContext>({
    state: {
        accessToken: "",
        refreshToken: "",
        permissions: []
    },
    dispatch: () => {}
});

export interface AuthProviderProps {
    children: any;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        accessToken: "",
        refreshToken: "",
        permissions: []
    }, (defaultState) => {
        AsyncStorage.getItem("tokens").then(data => {
            if(!data) return {
                accessToken: "",
                refreshToken: "",
                permissions: []
            };
    
            const parsedData = JSON.parse(data);
            
            return {
                accessToken: parsedData.accessToken,
                refreshToken: parsedData.refreshToken,
                permissions: parsedData.permissions
            }
        });

        return {
            accessToken: '',
            refreshToken: '',
            permissions: []
        }
    });

    useEffect(() => {
        
        AsyncStorage.setItem("tokens", JSON.stringify(state));

    }, [state])
    

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
}