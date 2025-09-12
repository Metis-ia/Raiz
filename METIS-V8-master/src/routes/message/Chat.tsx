import React, { useState, useEffect } from 'react';

// --- (Opcional, mas recomendado) Definindo a estrutura de uma mensagem com TypeScript ---
interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them'; // 'me' para mensagens enviadas, 'them' para recebidas
    timestamp: string;
}

// --- Dados de exemplo para simular um histórico de conversa ---
const initialMessages: Message[] = [
    { id: 1, text: 'Olá! Como você está?', sender: 'them', timestamp: '10:30 AM' },
    { id: 2, text: 'Estou bem, obrigado! E você?', sender: 'me', timestamp: '10:31 AM' },
    { id: 3, text: 'Estou ótimo! O que você acha de começarmos o projeto hoje?', sender: 'them', timestamp: '10:31 AM' },
];

const Chat = () => {
    // --- (1) ESTADO PARA GERENCIAR AS FUNCIONALIDADES ---
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    // --- (2) EFEITO PARA CARREGAR O HISTÓRICO INICIAL ---
    // Em um aplicativo real, aqui você faria uma chamada a uma API para buscar as mensagens
    useEffect(() => {
        setMessages(initialMessages);
    }, []);

    // --- (3) FUNÇÃO PARA ENVIAR UMA NOVA MENSAGEM ---
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário
        if (newMessage.trim() === '') return; // Não envia mensagens vazias

        const messageToSend: Message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, messageToSend]);
        setNewMessage(''); // Limpa o campo de input
    };
    
    // --- (4) FUNÇÕES DE PLACEHOLDER PARA OS BOTÕES DE AÇÃO ---
    const handleVideoCall = () => {
        alert("Funcionalidade de chamada de vídeo a ser implementada.");
    };

    const handleVoiceCall = () => {
        alert("Funcionalidade de chamada de voz a ser implementada.");
    };

    const handleEmojiClick = () => {
        alert("Funcionalidade de seletor de emoji a ser implementada.");
    };

    return (
        <div className="w-full flex flex-col bg-neutral-100 dark:bg-neutral-800">
            {/* Cabeçalho do Chat com botões de ação */}
            <header className="flex items-center p-4 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-shrink-0">
                <img src="https://placehold.co/40x40" alt="Avatar" className="rounded-full mr-4"/>
                <div className="flex-grow">
                    <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">Nome do Contato</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Online</p>
                </div>
                {/* Botões de chamada adicionados */}
                <div className="flex items-center space-x-2">
                    <button onClick={handleVideoCall} className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <i className="ri-vidicon-line text-xl"></i>
                    </button>
                    <button onClick={handleVoiceCall} className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <i className="ri-phone-line text-xl"></i>
                    </button>
                </div>
            </header>

            {/* Área de Mensagens - agora renderiza o histórico dinamicamente */}
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-md ${
                                message.sender === 'me' 
                                ? 'bg-primary-500 text-white' 
                                : 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100'
                            }`}>
                                <p>{message.text}</p>
                                <span className={`text-xs mt-1 block opacity-70 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Campo de Digitação com formulário e botão de emoji */}
            <footer className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center">
                    <button type="button" onClick={handleEmojiClick} className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        <i className="ri-emotion-happy-line text-xl"></i>
                    </button>
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite uma mensagem..." 
                        className="w-full p-3 mx-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button type="submit" className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                        <i className="ri-send-plane-2-fill"></i>
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chat;
