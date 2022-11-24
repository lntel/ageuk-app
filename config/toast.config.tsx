import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
    success: (props) => (
        <BaseToast 
        {...props}
        text1='Success'
        style={{
            borderLeftColor: '#07bc0c',
            height: '100%'
        }}
        contentContainerStyle={{
            paddingVertical: 20
        }}
        text2NumberOfLines={5}
        text1Style={{
            fontSize: 13,
            marginBottom: 3
        }}
        text2Style={{
            fontSize: 15
        }}
        />
    ),
    error: (props) => (
        <ErrorToast 
        {...props}
        text1='Something went wrong'
        style={{
            borderLeftColor: '#e74c3c',
            height: '100%'
        }}
        contentContainerStyle={{
            paddingVertical: 20
        }}
        text2NumberOfLines={3}
        text1Style={{
            fontSize: 13,
            marginBottom: 3
        }}
        text2Style={{
            fontSize: 15
        }}
        />
    ),
}