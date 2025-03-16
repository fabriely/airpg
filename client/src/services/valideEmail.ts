import { z } from 'zod';

// Esquema de validação para o email
export const emailSchema = z
    .string()
    .email({ message: "Insira um email válido." })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Insira um email válido."
    });

// Função para validar o email
export const validateEmail = (email: string) => {
    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
        return { success: false, message: emailValidation.error.errors[0].message };
    }
    return { success: true, message: "Sucesso." };
};