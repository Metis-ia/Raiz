import { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    IconButton, 
    CircularProgress, 
    Stack, 
    Avatar, 
    TextField, 
    Chip, 
    Tooltip, 
    Grid 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

// Importa a biblioteca de reconhecimento de fala
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    error?: boolean;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

const initialSuggestions = [
    "Qual foi o total de despesas do último mês?",
    "Compare o fluxo de caixa de Maio e Junho.",
];

export default function ChatIAPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    // Usa o hook da biblioteca para reconhecimento de fala
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        // Atualiza o input com a transcrição da fala
        setInput(transcript);
    }, [transcript]);

    const toggleSpeechRecognition = () => {
        if (!browserSupportsSpeechRecognition) {
            alert("Seu navegador não suporta reconhecimento de voz.");
            return;
        }

        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ language: 'pt-BR', continuous: false });
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            alert(`Arquivo "${file.name}" selecionado.\n\n(Funcionalidade de upload a ser implementada no back-end.)`);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            alert(`Imagem "${file.name}" selecionada.\n\n(Funcionalidade de upload a ser implementada no back-end.)`);
        }
    };

    const handleSendMessage = async (prompt: string) => {
        if (prompt.trim() === "" || isLoading) return;
        if (!API_KEY) {
            alert("Erro: VITE_GEMINI_API_KEY não encontrada no .env.");
            return;
        }
        const userMessage: Message = { id: Date.now().toString(), role: 'user', text: prompt };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsLoading(true);
        const historyForAPI = [...messages, userMessage].map(({role, text}) => ({ role, parts: [{ text }] }));
        const requestPayload = {
            contents: historyForAPI,
            safetySettings: [
                { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
                { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
                { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
                { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
            ]
        };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestPayload),
            });
            const data = await response.json();
            if (!response.ok || data.error) {
                throw new Error(data.error?.message || "Ocorreu um erro na requisição.");
            }
            if (!data.candidates || data.candidates.length === 0) {
                throw new Error("A API retornou uma resposta vazia.");
            }
            const aiText = data.candidates[0].content.parts[0].text;
            const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', text: aiText };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error: any) {
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', text: error.message, error: true };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (listening) {
            SpeechRecognition.stopListening();
        }
        handleSendMessage(input);
        setInput('');
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', maxWidth: '900px', mx: 'auto' }}>
            
            {messages.length > 0 && (
                <Typography variant="h6" sx={{ p: 2, alignSelf: 'flex-start', fontWeight: 'bold' }}>
                    Metis
                </Typography>
            )}
            
            <Paper 
                elevation={0} 
                sx={{ 
                    flexGrow: messages.length > 0 ? 1 : 0, 
                    overflowY: 'auto', 
                    bgcolor: 'transparent',
                    transition: 'flex-grow 0.5s ease-out'
                }}
            >
                <Stack spacing={3} sx={{ p: 2 }}>
                    {messages.map((msg) => (
                        <MessageCard key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                </Stack>
            </Paper>

            <Box 
                sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: messages.length === 0 ? 'center' : 'flex-end',
                    transition: 'justify-content 0.5s ease-out',
                    pb: messages.length > 0 ? 4 : 0
                }}
            >
                {messages.length === 0 && (
                  <>
                    <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                        Assistente Financeiro Metis
                    </Typography>
                    {!isLoading && (
                      <SuggestionChips onSuggestionClick={(prompt) => { handleSendMessage(prompt); }} />
                    )}
                  </>
                )}
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><CircularProgress size={30} /></Box>
                )}

                <Box 
                    component="form" 
                    onSubmit={handleSubmit} 
                    sx={{ p: 2, width: '100%', maxWidth: '900px', mx: 'auto' }}
                >
                    <Paper elevation={2} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: '28px' }}>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                        <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        
                        <Tooltip title="Anexar Arquivo"><IconButton color="primary" onClick={() => fileInputRef.current?.click()}><AttachFileIcon /></IconButton></Tooltip>
                        <Tooltip title="Anexar Imagem"><IconButton color="primary" onClick={() => imageInputRef.current?.click()}><ImageIcon /></IconButton></Tooltip>
                        
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder="Pergunte algo para a Metis..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            autoComplete='off'
                            multiline
                            maxRows={5}
                            sx={{ ml: 1, '& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' } }}
                            onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { handleSubmit(e); } }}
                        />
                        
                        <Tooltip title={listening ? "Parar de Ouvir" : "Falar"}>
                          <IconButton 
                              color={listening ? "error" : "primary"}
                              onClick={toggleSpeechRecognition} 
                              disabled={isLoading || !browserSupportsSpeechRecognition}>
                              {listening ? <StopIcon /> : <MicIcon />}
                          </IconButton>
                        </Tooltip>
                        
                        <IconButton color="primary" type="submit" disabled={isLoading || !input.trim()}><SendIcon /></IconButton>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

const MessageCard = ({ message }: { message: Message }) => {
    const isModel = message.role === 'model';
    const handleCopy = () => navigator.clipboard.writeText(message.text);

    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', alignSelf: isModel ? 'flex-start' : 'flex-end', maxWidth: '90%' }}>
            {isModel && <Avatar sx={{ bgcolor: message.error ? 'error.main' : 'secondary.main' }}>{message.error ? <ErrorOutlineIcon/> : <AutoAwesomeIcon fontSize="small"/>}</Avatar>}
            <Box>
                <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ 
                        p: 1.5, 
                        borderRadius: '12px', 
                        bgcolor: isModel ? (message.error ? 'error.lighter' : 'action.hover') : 'primary.main', 
                        color: isModel ? (message.error ? 'error.dark' : 'text.primary') : 'primary.contrastText',
                        borderColor: 'transparent',
                        wordBreak: 'break-word'
                    }}
                >
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{message.text}</Typography>
                </Paper>
                {isModel && message.text && !message.error && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'flex-start' }}>
                        <Tooltip title="Copiar"><IconButton size="small" onClick={handleCopy}><ContentCopyIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                        <Tooltip title="Gostei"><IconButton size="small"><ThumbUpOutlinedIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                        <Tooltip title="Não Gostei"><IconButton size="small"><ThumbDownOutlinedIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                    </Stack>
                )}
            </Box>
            {!isModel && <Avatar><PersonOutlineIcon fontSize="small"/></Avatar>}
        </Stack>
    );
};

const SuggestionChips = ({ onSuggestionClick }: { onSuggestionClick: (prompt: string) => void }) => (
    <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, textAlign: 'center' }}>
            Comece perguntando algo como:
        </Typography>
        <Grid container spacing={1} justifyContent="center">
            {initialSuggestions.map((text, i) => (
                <Grid item key={i}>
                    <Chip 
                        label={text} 
                        variant="outlined" 
                        onClick={() => onSuggestionClick(text)} 
                    />
                </Grid>
            ))}
        </Grid>
    </Box>
);