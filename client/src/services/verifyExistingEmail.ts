import api from "./api";

export const verifyExistingEmail = async (email: string) => {
    try {
        const response = await api.get(`/users/${email}`);
        if (response.data) {
            return { success: false, message: "Este email já está em uso." };
        }
        return { success: true, message: "Sucesso." };
    } catch (error) {
        return { success: true, message: "" }; // Não é possível verificar se o email já existe
    }
};