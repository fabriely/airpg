import os
from openai import OpenAI
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Configuração da chave da API OpenAI
client = OpenAI(api_key=os.getenv("OPEN_API_KEY"))

# Sistema de Prompt Melhorado
system_prompt = (
    "Você é um assistente especializado em gerar imagens com base nos três livros principais do Dungeons & Dragons 5ª Edição: "
    "- Player's Handbook (PHB), Dungeon Master's Guide (DMG) e Monster Manual (MM). "
    "Suas respostas devem ser exclusivamente baseadas nestes livros."
    "Se solicitado sobre outros tópicos, responda com: "
    "\"Eu só posso gerar imagens relacionadas aos livros básicos de D&D 5e: Player’s Handbook, Dungeon Master’s Guide, e Monster Manual.\""
)

def wiki_image(text: str) -> str:
    print(text)
    
    # Criar um prompt adequado para a OpenAI
    final_prompt = f"{system_prompt}\nUsuário: {text}"

    response = client.images.generate(
        model="dall-e-3",
        prompt=final_prompt,  # Aqui está a correção
        size="1024x1024",
        quality="standard",
        n=1,
    )

    print(response.data[0].url)
